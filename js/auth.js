import { CONFIG } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js";

const app = initializeApp(CONFIG.FIREBASE_CONFIG);
const auth = getAuth(app);

// Select Forms
const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

// SIGN-UP LOGIC
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // This is the line that stops the refresh!
        
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

// LOGIN LOGIC
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stops the refresh!
        
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