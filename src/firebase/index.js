// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGU522sKAPApN1bGaXc-zbe1jOukKbNnc",
  authDomain: "ics4u-2582e.firebaseapp.com",
  projectId: "ics4u-2582e",
  storageBucket: "ics4u-2582e.appspot.com",
  messagingSenderId: "665945625088",
  appId: "1:665945625088:web:308abf72f253d6fed87ee5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export { auth, firestore, storage }