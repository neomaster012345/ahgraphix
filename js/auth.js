/**
 * JavaScript for AH Graphix Store - Authentication
 * Handles all Firebase authentication logic.
 */

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// This event listener ensures the HTML document is ready before the script runs.
document.addEventListener('DOMContentLoaded', () => {

    // --- Firebase Configuration ---
    const firebaseConfig = {
        apiKey: "AIzaSyD-ajuwQ3_O6M2Re6apA3iMFaVNjP5NjvM",
        authDomain: "ahgraphics-4c985.firebaseapp.com",
        projectId: "ahgraphics-4c985",
        storageBucket: "ahgraphics-4c985.appspot.com",
        messagingSenderId: "970036433684",
        appId: "1:970036433684:web:8b91f72345ec8248cd2801",
        measurementId: "G-LQQ2ST3C3K"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    // --- UI Element References ---
    const navAuthSection = document.getElementById('nav-auth-section');
    const loginForm = document.getElementById('login-form');
    // ... (add other form references as needed inside their specific logic blocks)

    // --- Authentication State Observer (Updates the Nav Bar) ---
    onAuthStateChanged(auth, (user) => {
        if (navAuthSection) {
            if (user) {
                // User is signed in
                navAuthSection.innerHTML = `
                    <div class="flex items-center space-x-2 sm:space-x-4">
                        <span class="text-white hidden sm:block text-sm">Welcome, ${user.displayName || user.email.split('@')[0]}</span>
                        <button id="logout-btn" class="glow-button text-black px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium text-sm">Logout</button>
                    </div>
                `;
                document.getElementById('logout-btn').addEventListener('click', () => {
                    signOut(auth).then(() => window.location.href = 'index.html');
                });
            } else {
                // User is signed out
                navAuthSection.innerHTML = `
                    <a href="login.html" class="glow-button text-black px-4 py-2 rounded-full font-medium">Login</a>
                `;
            }
        }
    });

    // --- Login Form Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const loginError = document.getElementById('login-error');
            signInWithEmailAndPassword(auth, email, password)
                .then(() => window.location.href = 'index.html')
                .catch(error => loginError.textContent = error.message);
        });
    }
    
    // Add other auth logic (signup, social, forgot password) here in the same way,
    // checking if the relevant form/button exists on the page first.
});
