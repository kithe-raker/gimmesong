// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// import { getAnalytics } from "firebase/compat/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTC2RE8ixJjLE1wc6X6Gjnvplm0l3Jsfo",
  authDomain: "gimmesong-d4f27.firebaseapp.com",
  projectId: "gimmesong-d4f27",
  storageBucket: "gimmesong-d4f27.appspot.com",
  messagingSenderId: "653769201907",
  appId: "1:653769201907:web:b78d143e5b4b6a9be13f86",
  measurementId: "G-VHWW02H931",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
