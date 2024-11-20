import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-44936.firebaseapp.com",
  projectId: "mern-blog-44936",
  storageBucket: "mern-blog-44936.firebasestorage.app",
  messagingSenderId: "797325746393",
  appId: "1:797325746393:web:93e502168193a5ef621ec8",
  measurementId: "G-ZEC7GP4MH2",
};

export const app = initializeApp(firebaseConfig);