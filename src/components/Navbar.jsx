import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { Icon } from "@iconify/react/dist/iconify.js";

function Navbar({ user }) {
  return (
    <nav className="w-full p-6 flex items-center justify-between">
      <h1 className="flex items-center gap-2 text-xl font-medium">
        <Icon icon="tabler:list-check" className="size-6" />
        <span className="text-sky-500">Talons In Twilight</span> Mod Development Task Tracker
      </h1>
      <div className="flex items-center gap-4">
        <img
          src={user.photoURL}
          className="size-8 rounded-full"
          referrerPolicy="no-referrer"
        />
        {user.displayName}
        <button
          onClick={() => {
            signOut(auth);
          }}
          className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100/10 transition"
        >
          <Icon icon="tabler:logout" className="size-5" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
