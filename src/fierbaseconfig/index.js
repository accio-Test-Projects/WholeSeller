// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgCe88Yj4UIGa_Opz47X8PGPsk0hHtXvU",
  authDomain: "wholeseller-98b93.firebaseapp.com",
  projectId: "wholeseller-98b93",
  storageBucket: "wholeseller-98b93.appspot.com",
  messagingSenderId: "57329002766",
  appId: "1:57329002766:web:4466ccfaf5b46a4078cf5f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);