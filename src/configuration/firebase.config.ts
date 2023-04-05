// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhQWs52o8nt32GjjyLGEw30BWWxc23lMs",
  authDomain: "english-app-notes.firebaseapp.com",
  projectId: "english-app-notes",
  storageBucket: "english-app-notes.appspot.com",
  messagingSenderId: "761757337406",
  appId: "1:761757337406:web:ac80254f0aa1e9ca950e6f",
  measurementId: "G-RPG1HDS2J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app)

export { provider, auth}