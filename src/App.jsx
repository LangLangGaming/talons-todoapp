  import { useEffect, useState } from "react";
  import SignInButton from "./components/SignInButton";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "./firebase.config";
  import MainScreen from "./components/MainScreen";
  import { Icon } from "@iconify/react/dist/iconify.js";
  import "../src/index.css"
  import TitLogo from './assets/image.png'

  function App() {
    const [user, setUser] = useState("loading");

    useEffect(() => {
      onAuthStateChanged(auth, (u) => {
        if (u === null) {
          setUser(undefined);
          return;
        }

        setUser(u);
      });
    }, []);

    return (
      <main className="w-full h-dvh bg-slate-950 text-zinc-100 flex items-center justify-center">
        {user === "loading" ? (
          <Icon icon="svg-spinners:180-ring" className="text-zinc-500 size-8" />
        ) : user === undefined ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4 -mb-2">
              <img src={TitLogo} alt="Talons In Twilight Logo" className="w-16 "/>
            <h1 className="text-4xl font-normal font-title">
              <span className="text-blue-800">TALONS&nbsp;</span> 
              IN&nbsp;
              <span className="text-blue-800">TWILIGHT</span></h1>
              </div>
              <p className="text-zinc-100 -mb-2 -mt-2 text-lg w-2xl text-center">
                Welcome to the task tracker for the development of the Talons In Twilight mod! Please sign in to your Google account to access the task list.
              </p>
            <SignInButton />
          </div>
        ) : (
          <MainScreen user={user} />
        )}
      </main>
    );
  }

  export default App;
