import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDY1WL6Sh-kx85CNSPRWDfwL-FxiE9Azq8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "videobelajar-66987.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "videobelajar-66987",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "videobelajar-66987.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1022666801252",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1022666801252:web:eca8a329044fa99aff9f71",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BSBPDQT1WY"
};

const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);

export { db, analytics };