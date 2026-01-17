import { Icon } from "@iconify/react/dist/iconify.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.config";

function SignInButton() {
  async function handleSignIn() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  return (
    <button
      onClick={handleSignIn}
      className="px-6 py-4 bg-zinc-100 flex items-center gap-2 font-medium rounded-lg hover:bg-zinc-300 transition-colors text-zinc-900"
    >
      <Icon icon="uil:google" className="size-5" />
      Sign In with Google
    </button>
  );
}

export default SignInButton;
