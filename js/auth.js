import { CONFIG } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js";

// 1. Initialize
const app = initializeApp(CONFIG.FIREBASE_CONFIG);
const auth = getAuth(app);

// 2. Exportable Functions (Lecturer's Style)
export async function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logoutUser() {
    return signOut(auth);
}

export { auth };