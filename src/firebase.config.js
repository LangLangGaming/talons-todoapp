// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFfwsh96NP-QTMhlDuDxCXML3Tdzdp3co",
  authDomain: "to-do-list-369b1.firebaseapp.com",
  projectId: "to-do-list-369b1",
  storageBucket: "to-do-list-369b1.firebasestorage.app",
  messagingSenderId: "675865775647",
  appId: "1:675865775647:web:3bf0e1cb0b239af134cf2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { app, database, auth };