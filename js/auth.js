import { CONFIG } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js";

// 1. Setup Firebase Configuration
const firebaseConfig = {
  apiKey: CONFIG.FIREBASE_CONFIG.apiKey,
  authDomain: CONFIG.FIREBASE_CONFIG.authDomain,
  projectId: CONFIG.FIREBASE_CONFIG.projectId,
  storageBucket: CONFIG.FIREBASE_CONFIG.storageBucket,
  messagingSenderId: CONFIG.FIREBASE_CONFIG.messagingSenderId,
  appId: CONFIG.FIREBASE_CONFIG.appId
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. Select Forms
const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

// 4. LOGIN LOGIC
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('.email-field').value;
        const password = loginForm.querySelector('.password-field').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'shop.html'; 
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        }
    });
}

// 5. SIGN-UP LOGIC
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = signupForm.querySelector('.email-field').value;
        const password = signupForm.querySelector('.password-field').value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully! Please log in.");
            window.location.href = 'log-in.html';
        } catch (error) {
            console.error("Signup error:", error);
            alert("Sign-up failed: " + error.message);
        }
    });
}