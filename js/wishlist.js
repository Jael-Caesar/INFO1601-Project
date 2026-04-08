
import { CONFIG } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { getFirestore, doc, setDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js";

const app = initializeApp(CONFIG.FIREBASE_CONFIG);
const db = getFirestore(app);

export async function saveToWishlist(plantId, plantName) {
    const user = "bob"; // Forced 'bob' login per instructions
    const userRef = doc(db, "wishlists", user);

    try {
        await setDoc(userRef, {
            savedPlants: arrayUnion({ id: plantId, name: plantName })
        }, { merge: true });
        alert("Added to your Aqua Fern Wishlist!");
    } catch (e) {
        console.error("Wishlist Error: ", e);
    }
}