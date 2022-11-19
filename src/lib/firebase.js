// Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Import the functions you need from the SDKs you need

// import { getAnalytics } from "firebase/compat/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTC2RE8ixJjLE1wc6X6Gjnvplm0l3Jsfo",
  authDomain: "gimmesong-d4f27.firebaseapp.com",
  databaseURL:
    "https://gimmesong-d4f27-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gimmesong-d4f27",
  storageBucket: "gimmesong-d4f27.appspot.com",
  messagingSenderId: "653769201907",
  appId: "1:653769201907:web:b78d143e5b4b6a9be13f86",
  measurementId: "G-VHWW02H931",
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Database and get a reference to the service
export const db = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOut = async () => {
  await auth.signOut();
  window.location.reload();
};

export default app;
