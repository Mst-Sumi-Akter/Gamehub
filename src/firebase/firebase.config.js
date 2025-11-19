// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqSG5XXnvvh3O42ssh1IGI-XzwHdJkbZc",
  authDomain: "game-hub-c3c6e.firebaseapp.com",
  projectId: "game-hub-c3c6e",
  storageBucket: "game-hub-c3c6e.firebasestorage.app",
  messagingSenderId: "526333262327",
  appId: "1:526333262327:web:588be7b6cbeedcea3596f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);