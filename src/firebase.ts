// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY1WL6Sh-kx85CNSPRWDfwL-FxiE9Azq8",
  authDomain: "videobelajar-66987.firebaseapp.com",
  projectId: "videobelajar-66987",
  storageBucket: "videobelajar-66987.firebasestorage.app",
  messagingSenderId: "1022666801252",
  appId: "1:1022666801252:web:eca8a329044fa99aff9f71",
  measurementId: "G-BSBPDQT1WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };