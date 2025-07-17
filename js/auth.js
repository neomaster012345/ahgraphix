/**
 * JavaScript for AH Graphix Store - Authentication
 * Handles Email/Password, Google, and Anonymous sign-in,
 * and the redesigned signup page flow.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInAnonymously,
    signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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

    // --- UI Element References ---
    const navAuthSection = document.getElementById('nav-auth-section');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    
    // --- NEW: References for the redesigned signup page ---
    const signupOptions = document.getElementById('signup-options');
    const emailSignupBtn = document.getElementById('email-signup-btn');
    const anonymousLoginBtn = document.getElementById('anonymous-login-btn');

    // --- Authentication State Observer ---
    onAuthStateChanged(auth, (user) => {
        if (navAuthSection) {
            if (user && !user.isAnonymous) {
                // User is signed in (and not anonymous)
                navAuthSection.innerHTML = `
                    <div class="flex items-center space-x-2 sm:space-x-4">
                        <span class="text-white hidden sm:block text-sm">Welcome, ${user.displayName || user.email.split('@')[0]}</span>
                        <button id="logout-btn" class="glow-button text-black px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium text-sm">Logout</button>
                    </div>
                `;
                document.getElementById('logout-btn').addEventListener('click', () => signOut(auth).then(() => window.location.href = 'index.html'));
            } else {
                // User is signed out or anonymous
                navAuthSection.innerHTML = `<a href="login.html" class="glow-button text-black px-4 py-2 rounded-full font-medium">Login</a>`;
                // If no user is logged in at all, sign them in anonymously for guest features
                if (!user) {
                    signInAnonymously(auth).catch(error => console.error("Anonymous sign-in failed:", error));
                }
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
    
    // --- Signup Page Logic ---
    if (signupOptions && signupForm && emailSignupBtn) {
        // Event listener to show the email form
        emailSignupBtn.addEventListener('click', () => {
            signupOptions.classList.add('hidden');
            signupForm.classList.remove('hidden');
        });

        // Event listener for the form submission itself
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const signupError = document.getElementById('signup-error');
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => updateProfile(userCredential.user, { displayName: name }))
                .then(() => window.location.href = 'index.html')
                .catch(error => signupError.textContent = error.message);
        });
    }

    // --- Google Login Logic (works on both login and signup pages) ---
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            signInWithPopup(auth, googleProvider)
                .then(() => window.location.href = 'index.html')
                .catch(error => {
                    const errorElement = document.getElementById('login-error') || document.getElementById('signup-error');
                    if(errorElement) errorElement.textContent = error.message;
                });
        });
    }
    
    // --- Anonymous/Guest Login Logic ---
    if (anonymousLoginBtn) {
        anonymousLoginBtn.addEventListener('click', () => {
            signInAnonymously(auth)
                .then(() => {
                    console.log('Signed in as guest.');
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Anonymous sign-in error:", error);
                    const signupError = document.getElementById('signup-error');
                    if(signupError) signupError.textContent = error.message;
                });
        });
    }

    // --- Forgot Password Modal Logic ---
    if (forgotPasswordModal) {
        const forgotPasswordLink = document.getElementById('forgot-password-link');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const resetPasswordForm = document.getElementById('reset-password-form');
        const resetMessage = document.getElementById('reset-message');

        if(forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                forgotPasswordModal.classList.replace('hidden', 'flex');
            });
        }
        if(closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                forgotPasswordModal.classList.replace('flex', 'hidden');
                if(resetMessage) resetMessage.textContent = '';
            });
        }
        if(resetPasswordForm) {
            resetPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('reset-email').value;
                resetMessage.textContent = '';
                resetMessage.classList.remove('text-red-500', 'text-green-500');
                sendPasswordResetEmail(auth, email)
                    .then(() => {
                        resetMessage.textContent = 'Success! Check your inbox for a password reset link.';
                        resetMessage.classList.add('text-green-500');
                    })
                    .catch(error => {
                        resetMessage.textContent = error.message;
                        resetMessage.classList.add('text-red-500');
                    });
            });
        }
    }
});
