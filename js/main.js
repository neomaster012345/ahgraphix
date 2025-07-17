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
    FacebookAuthProvider,
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
    const facebookProvider = new FacebookAuthProvider();

    // --- UI Element References ---
    const navAuthSection = document.getElementById('nav-auth-section');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const facebookLoginBtn = document.getElementById('facebook-login-btn');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');
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

    // --- Authentication State Observer (Updates the Nav Bar) ---
    onAuthStateChanged(auth, (user) => {
        if (navAuthSection) {
            if (user) {
                // User is signed in
                navAuthSection.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <span class="text-white hidden md:block">Welcome, ${user.displayName || user.email.split('@')[0]}</span>
                        <button id="logout-btn" class="glow-button gold-gradient text-black px-4 py-2 rounded-full font-medium">Logout</button>
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
            signInWithEmailAndPassword(auth, email, password)
                .then(() => window.location.href = 'index.html')
                .catch(error => loginError.textContent = error.message);
        });
    }

    // --- Signup Form Logic ---
    if (signupForm) {
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

    // --- Social Logins (Google & Facebook) ---
    const handleSocialLogin = (provider) => {
        signInWithPopup(auth, provider)
            .then(() => window.location.href = 'index.html')
            .catch(error => {
                const errorMessage = error.message;
                if (loginError) loginError.textContent = errorMessage;
                if (signupError) signupError.textContent = errorMessage;
                console.error("Social Login Error:", error);
            });
    };
    if (googleLoginBtn) googleLoginBtn.addEventListener('click', () => handleSocialLogin(googleProvider));
    if (facebookLoginBtn) facebookLoginBtn.addEventListener('click', () => handleSocialLogin(facebookProvider));

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

// --- Snowfall Logic (runs after the main DOM content is ready) ---
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
                    if (i % 3 > 0) {
                        snowflakes[i] = { x: Math.random() * canvas.width, y: -5, r: f.r, d: f.d };
                    } else {
                        if (Math.sin(angle) > 0) {
                            snowflakes[i] = { x: -5, y: Math.random() * canvas.height, r: f.r, d: f.d };
                        } else {
                            snowflakes[i] = { x: canvas.width + 5, y: Math.random() * canvas.height, r: f.r, d: f.d };
                        }
                    }
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
