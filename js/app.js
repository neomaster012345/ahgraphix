/**
 * JavaScript for AH Graphix Store - Main Application (Unified)
 * This single file handles all shared functionality to prevent loading conflicts.
 * - Mobile Menu
 * - Snowfall Animation
 * - User Activity Simulation
 * - Firebase Authentication (Login, Signup, Social, Forgot Password, State Management)
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
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// This event listener ensures the entire HTML document is loaded and parsed
// before any of the code inside it runs.
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
    const mobileNavAuthSection = document.getElementById('mobile-nav-auth-section');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const resetPasswordForm = document.getElementById('reset-password-form');
    const resetMessage = document.getElementById('reset-message');
    const activeUsersSpan = document.getElementById('active-users');

    // --- Mobile Menu Logic ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Random User Count Logic ---
    if (activeUsersSpan) {
        function updateUserCount() {
            const count = Math.floor(Math.random() * 50) + 80;
            activeUsersSpan.textContent = `👤 ${count} users exploring now...`;
            setTimeout(updateUserCount, 8000); 
        }
        updateUserCount();
    }

    // --- Authentication State Observer (Updates the Nav Bar on all pages) ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const welcomeHTML = `
                <span class="text-white hidden md:block">Welcome, ${user.displayName || user.email.split('@')[0]}</span>
                <button id="logout-btn" class="glow-button gold-gradient text-black px-4 py-2 rounded-full font-medium">Logout</button>
            `;
            const mobileWelcomeHTML = `
                <span class="text-white py-2">Welcome, ${user.displayName || user.email.split('@')[0]}</span>
                <button id="mobile-logout-btn" class="text-white hover:text-gold py-2">Logout</button>
            `;
            if(navAuthSection) navAuthSection.innerHTML = welcomeHTML;
            if(mobileNavAuthSection) mobileNavAuthSection.innerHTML = mobileWelcomeHTML;

            const logoutBtn = document.getElementById('logout-btn');
            const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

            if(logoutBtn) logoutBtn.addEventListener('click', () => signOut(auth).then(() => window.location.href = 'index.html'));
            if(mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', () => signOut(auth).then(() => window.location.href = 'index.html'));

        } else {
            // User is signed out
            const loginHTML = `<a href="login.html" class="glow-button text-black px-4 py-2 rounded-full font-medium">Login</a>`;
            const mobileLoginHTML = `<a href="login.html" class="text-white hover:text-gold py-2">Login</a>`;
            if(navAuthSection) navAuthSection.innerHTML = loginHTML;
            if(mobileNavAuthSection) mobileNavAuthSection.innerHTML = mobileLoginHTML;
        }
    });

    // --- Login Form Logic ---
    if (loginForm) {
        const loginError = document.getElementById('login-error');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            signInWithEmailAndPassword(auth, email, password)
                .then(() => window.location.href = 'index.html')
                .catch(error => loginError.textContent = error.message);
        });
    }
    
    // --- Signup Form Logic ---
     if (document.getElementById('signup-form')) {
        const signupForm = document.getElementById('signup-form');
        const signupError = document.getElementById('signup-error');
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => updateProfile(userCredential.user, { displayName: name }))
                .then(() => window.location.href = 'index.html')
                .catch(error => signupError.textContent = error.message);
        });
    }

    // --- Social Login Logic (works on both login and signup pages) ---
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

    // --- Forgot Password Modal Logic ---
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (forgotPasswordModal) forgotPasswordModal.classList.replace('hidden', 'flex');
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (forgotPasswordModal) forgotPasswordModal.classList.replace('flex', 'hidden');
            if (resetMessage) resetMessage.textContent = '';
        });
    }
    if (resetPasswordForm) {
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
});

// --- Snowfall Logic ---
window.addEventListener('load', function() {
    const canvas = document.getElementById('snowCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let snowflakes = [];
        const numberOfSnowflakes = 150;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initSnowflakes = () => {
            snowflakes = [];
            for (let i = 0; i < numberOfSnowflakes; i++) {
                snowflakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 4 + 1,
                    d: Math.random() * numberOfSnowflakes
                });
            }
        };

        let angle = 0;
        const updateSnowflakes = () => {
            angle += 0.01;
            for (let i = 0; i < numberOfSnowflakes; i++) {
                const f = snowflakes[i];
                f.y += Math.cos(angle + f.d) + f.r / 2;
                f.x += Math.sin(angle) * 2;
                if (f.x > canvas.width + 5 || f.x < -5 || f.y > canvas.height) {
                    snowflakes[i] = { x: Math.random() * canvas.width, y: -5, r: f.r, d: f.d };
                }
            }
        };

        const drawSnowflakes = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            for (let i = 0; i < numberOfSnowflakes; i++) {
                const f = snowflakes[i];
                ctx.moveTo(f.x, f.y);
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
        };

        const animateSnowfall = () => {
            updateSnowflakes();
            drawSnowflakes();
            requestAnimationFrame(animateSnowfall);
        };

        setCanvasSize();
        initSnowflakes();
        animateSnowfall();
        window.addEventListener('resize', () => {
            setCanvasSize();
            initSnowflakes();
        });
    }
});
