// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
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

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stops page from reloading
    const email = loginForm.querySelectorAll('input')[1].value;
    const password = loginForm.querySelectorAll('input')[2].value;
    handleLogin(email, password);
});

const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

// LOGIN LOGIC
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('.email-field').value;
        const password = loginForm.querySelector('.password-field').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'shop.html'; // Successful login redirect
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}

// SIGN-UP LOGIC
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = signupForm.querySelector('.email-field').value;
        const password = signupForm.querySelector('.password-field').value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created! Now please log in.");
            window.location.href = 'log-in.html';
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}