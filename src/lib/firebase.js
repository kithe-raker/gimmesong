import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  development: {
    apiKey: "AIzaSyAjoNz5C28TeweDZISsFLBMCrLlX71Wf-I",
    authDomain: "gimmesong-develop.firebaseapp.com",
    databaseURL: "https://gimmesong-develop-default-rtdb.firebaseio.com",
    projectId: "gimmesong-develop",
    storageBucket: "gimmesong-develop.appspot.com",
    messagingSenderId: "910020450120",
    appId: "1:910020450120:web:e483c59b5468d71abbc57d",
  },
  production: {
    apiKey: "AIzaSyCTC2RE8ixJjLE1wc6X6Gjnvplm0l3Jsfo",
    authDomain: "gimmesong-d4f27.firebaseapp.com",
    databaseURL:
      "https://gimmesong-d4f27-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gimmesong-d4f27",
    storageBucket: "gimmesong-d4f27.appspot.com",
    messagingSenderId: "653769201907",
    appId: "1:653769201907:web:b78d143e5b4b6a9be13f86",
    measurementId: "G-VHWW02H931",
  },
};

const app = initializeApp(
  process.env.NODE_ENV === "production" &&
    process.env.REACT_APP_ENV === "production"
    ? firebaseConfig.production
    : firebaseConfig.development
);

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
