/**
 * JavaScript for AH Graphix Store - Main Application (Unified & Final)
 * This single file handles all shared functionality to prevent loading conflicts.
 * - Mobile Menu
 * - Snowfall Animation
 * - User Activity Simulation
 * - Firebase Authentication (Login, Signup, Social, Forgot Password, State Management)
 */

// This event listener ensures the entire HTML document is loaded and parsed
// before any of the code inside it runs. This is the most reliable way to prevent errors.
document.addEventListener('DOMContentLoaded', () => {


    // --- PRELOADER LOGIC ---
// This runs as soon as the window's content (images, stylesheets) is fully loaded.
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.querySelector('body');
    if (preloader) {
        // Fade out the preloader
        preloader.classList.add('hidden');
        // Fade in the page content
        body.classList.add('content-visible');
        
        // Optional: Remove the preloader from the DOM after the transition
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 1000); // Should match the transition duration
    }
});
    // --- Firebase Configuration ---
    // This should be the only place you need to configure Firebase.
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
    // Note: We are using the v8 compat libraries for maximum browser compatibility.
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    // --- UI Element References ---
    const navAuthSection = document.getElementById('nav-auth-section');
    const mobileNavAuthSection = document.getElementById('mobile-nav-auth-section');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const facebookLoginBtn = document.getElementById('facebook-login-btn');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
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
    auth.onAuthStateChanged((user) => {
        const desktopAuthContainer = document.getElementById('nav-auth-section');
        const mobileAuthContainer = document.getElementById('mobile-nav-auth-section');

        if (user) {
            // User is signed in
            const welcomeName = user.displayName || user.email.split('@')[0];
            const desktopHTML = `
                <span class="text-white hidden md:block text-sm mr-2">Welcome, ${welcomeName}</span>
                <button id="logout-btn" class="glow-button text-black px-4 py-2 rounded-full font-medium">Logout</button>
            `;
            const mobileHTML = `<button id="mobile-logout-btn" class="text-white hover:text-gold py-2 w-full text-left">Logout</button>`;

            if (desktopAuthContainer) desktopAuthContainer.innerHTML = desktopHTML;
            if (mobileAuthContainer) mobileAuthContainer.innerHTML = mobileHTML;

            const logoutBtn = document.getElementById('logout-btn');
            const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

            if(logoutBtn) logoutBtn.addEventListener('click', () => auth.signOut());
            if(mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', () => auth.signOut());

        } else {
            // User is signed out
            const loginHTML = `<a href="login.html" class="glow-button text-black px-4 py-2 rounded-full font-medium">Login</a>`;
            const mobileLoginHTML = `<a href="login.html" class="text-white hover:text-gold py-2">Login</a>`;

            if (desktopAuthContainer) desktopAuthContainer.innerHTML = loginHTML;
            if (mobileAuthContainer) mobileAuthContainer.innerHTML = mobileLoginHTML;
        }
    });

    // --- Login Form Logic ---
    if (loginForm) {
        const loginError = document.getElementById('login-error');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            auth.signInWithEmailAndPassword(email, password)
                .then(() => { window.location.href = 'index.html'; })
                .catch(error => { loginError.textContent = error.message; });
        });
    }
    
    // --- Signup Form Logic ---
    if (signupForm) {
        const signupError = document.getElementById('signup-error');
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => userCredential.user.updateProfile({ displayName: name }))
                .then(() => { window.location.href = 'index.html'; })
                .catch(error => { signupError.textContent = error.message; });
        });
    }

    // --- Social Login Logic ---
    const handleSocialLogin = (provider) => {
        auth.signInWithPopup(provider)
            .then(() => { window.location.href = 'index.html'; })
            .catch(error => {
                const errorElement = document.getElementById('login-error') || document.getElementById('signup-error');
                if(errorElement) errorElement.textContent = error.message;
            });
    };
    if (googleLoginBtn) googleLoginBtn.addEventListener('click', () => handleSocialLogin(googleProvider));
    if (facebookLoginBtn) facebookLoginBtn.addEventListener('click', () => handleSocialLogin(facebookProvider));

    // --- Forgot Password Modal Logic ---
    if (forgotPasswordLink) {
        const closeModalBtn = document.getElementById('close-modal-btn');
        const resetPasswordForm = document.getElementById('reset-password-form');
        const resetMessage = document.getElementById('reset-message');

        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (forgotPasswordModal) forgotPasswordModal.classList.replace('hidden', 'flex');
        });
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
                auth.sendPasswordResetEmail(email)
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
