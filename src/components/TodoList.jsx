import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { database } from "../firebase.config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

function TodoList({ user }) {
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newPersonName, setNewPersonName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editPersonName, setEditPersonName] = useState("");
  const [snapshot] = useCollection(collection(database, "tasks"));

  function updateTaskStatus(id, done) {
    updateDoc(doc(database, "tasks", id), {
      done: !done,
    });
  }

  async function addTask() {
    if (!newTaskName.trim()) {
      alert("Please enter a task title");
      return;
    }

    await addDoc(collection(database, "tasks"), {
      name: newTaskName,
      person: newPersonName || "",
      done: false,
      owner: user.uid,
    });

    setNewTaskName("");
    setNewPersonName("");
    setShowForm(false);
  }

  function startEditTask(id, data) {
    setEditingTaskId(id);
    setEditTaskName(data.name || "");
    setEditPersonName(data.person || "");
  }

  async function saveEditTask(id) {
    if (!editTaskName.trim()) {
      alert("Please enter a task title");
      return;
    }

    await updateDoc(doc(database, "tasks", id), {
      name: editTaskName,
      person: editPersonName || "",
    });

    setEditingTaskId(null);
    setEditTaskName("");
    setEditPersonName("");
  }

  function cancelEdit() {
    setEditingTaskId(null);
    setEditTaskName("");
    setEditPersonName("");
  }

  function deleteTask(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task? This action is not revertible!"
    );

    if (!confirmDelete) {
      return;
    }

    deleteDoc(doc(database, "tasks", id));
  }

  const filtered =
    snapshot?.docs.filter((task) => {
      if (filter === "all") return true;
      const data = task.data();
      if (filter === "done") return data.done === true;
      if (filter === "pending") return data.done === false;
      return true;
    }) || [];

  return (
    <ul className="p-6 space-y-2">
      <li className="flex gap-2 text-sm font-medium">
        <Icon icon="material-symbols:filter-alt" width="34" height="34" className="text-sky-500" />
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md ${filter === "all" ? "bg-zinc-700 text-white" : "bg-zinc-800 text-zinc-300"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("done")}
          className={`px-3 py-2 rounded-md ${filter === "done" ? "bg-zinc-700 text-white" : "bg-zinc-800 text-zinc-300"}`}
        >
          Done
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-2 rounded-md ${filter === "pending" ? "bg-zinc-700 text-white" : "bg-zinc-800 text-zinc-300"}`}
        >
          Pending
        </button>
      </li>

      {snapshot === undefined ? (
        <p>Loading data...</p>
      ) : (
        filtered.map((task) => {
          const data = task.data();

          return (
            <li
              key={task.id}
              className="p-6 rounded-lg bg-zinc-800"
            >
              {editingTaskId === task.id ? (
                <div className="w-full flex items-start gap-4">
                  <div className="flex-1">
                    <input
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                      placeholder="Task title"
                      className="w-full mb-2 p-2 rounded bg-zinc-900 text-white"
                    />
                    <input
                      value={editPersonName}
                      onChange={(e) => setEditPersonName(e.target.value)}
                      placeholder="Name"
                      className="w-full p-2 rounded bg-zinc-900 text-white"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => saveEditTask(task.id)}
                      className="p-2 rounded-md bg-zinc-100 text-zinc-900 font-medium flex items-center gap-1 hover:bg-zinc-400 transition-colors"
                    >
                      <Icon icon="material-symbols:data-saver-on-rounded" width="20" height="20" />
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 rounded-md text-zinc-300 hover:text-white flex items-center gap-1 hover:bg-zinc-100/10 transition-colors"
                    >
                      <Icon icon="material-symbols:cancel-outline" width="20" height="20" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium ">{data.name}</p>
                    {data.person && (
                      <p className="text-sm text-zinc-400 mt-1 ">{data.person}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <input
                      checked={data.done}
                      onClick={() => updateTaskStatus(task.id, data.done)}
                      type="checkbox"
                      className="w-6 h-6 accent-zinc-500 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditTask(task.id, data)}
                        className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100/10 hover:text-zinc-100 transition-colors"
                      >
                        <Icon icon="tabler:pencil" className="size-5" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Icon icon="tabler:trash" className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })
      )}
      <button
        onClick={() => setShowForm((s) => !s)}
        className="w-full font-medium p-4 rounded-lg flex items-center bg-sky-600 hover:bg-sky-500 text-zinc-900 gap-3 justify-center"
      >
        <Icon icon="tabler:plus" className="size-5" />
        {showForm ? "Cancel" : "Add Task"}
      </button>

      {showForm && (
        <div className="mt-4 p-4 rounded-lg bg-zinc-800">
          <input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Task title"
            className="w-full mb-2 p-2 rounded bg-zinc-900 text-white"
          />
          <input
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            placeholder="Name"
            className="w-full mb-3 p-2 rounded bg-zinc-900 text-white"
          />
          <button
            onClick={addTask}
            className="w-full font-medium p-3 rounded-lg bg-sky-600 text-zinc-900"
          >
            Create Task
          </button>
        </div>
      )}
    </ul>
  );
}

export default TodoList;
