// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: CONFIG.FIREBASE_CONFIG.apiKey,
  authDomain: CONFIG.FIREBASE_CONFIG.authDomain,
  projectId: CONFIG.FIREBASE_CONFIG.projectId,
  storageBucket: CONFIG.FIREBASE_CONFIG.storageBucket,
  messagingSenderId: CONFIG.FIREBASE_CONFIG.messagingSenderId,
  appId: CONFIG.FIREBASE_CONFIG.appId,
  measurementId: "G-4R0D8V0FV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js";
import { CONFIG } from './config.js';

// Login Function
export async function handleLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in as:", userCredential.user.email);
        sessionStorage.setItem('isLoggedIn', 'true'); // For 'bob' logic
        window.location.href = 'index.html'; 
    } catch (error) {
        alert("Login failed: " + error.message);
    }
}

// Sign-Up Function
export async function handleSignUp(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        window.location.href = 'log-in.html';
    } catch (error) {
        alert("Sign-up failed: " + error.message);
    }
}

const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stops page from reloading
    const email = loginForm.querySelectorAll('input')[1].value;
    const password = loginForm.querySelectorAll('input')[2].value;
    handleLogin(email, password);
});