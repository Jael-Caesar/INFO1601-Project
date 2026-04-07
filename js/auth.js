// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey,
  authDomain: "aqua-fern.firebaseapp.com",
  projectId: "aqua-fern",
  storageBucket: "aqua-fern.firebasestorage.app",
  messagingSenderId: "140761553767",
  appId: "1:140761553767:web:e5750a70df7501b4ecadc2",
  measurementId: "G-4R0D8V0FV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);