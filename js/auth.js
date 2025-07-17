/**
 * JavaScript for AH Graphix Store - Authentication (v4 - Compatibility Fix)
 * This version uses the Firebase v8 compat libraries to ensure maximum compatibility
 * and prevent script loading issues.
 */
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

    // Initialize Firebase using the global 'firebase' object
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    // --- UI Element References ---
    const navAuthSection = document.getElementById('nav-auth-section');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const anonymousLoginBtn = document.getElementById('anonymous-login-btn');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');

    // --- Authentication State Observer ---
    auth.onAuthStateChanged((user) => {
        if (navAuthSection) {
            if (user && !user.isAnonymous) {
                navAuthSection.innerHTML = `
                    <div class="flex items-center space-x-2 sm:space-x-4">
                        <span class="text-white hidden sm:block text-sm">Welcome, ${user.displayName || user.email.split('@')[0]}</span>
                        <button id="logout-btn" class="glow-button text-black px-3 py-2 sm:px-4 sm:py-2 rounded-full font-medium text-sm">Logout</button>
                    </div>
                `;
                document.getElementById('logout-btn').addEventListener('click', () => auth.signOut().then(() => window.location.href = 'index.html'));
            } else {
                navAuthSection.innerHTML = `<a href="login.html" class="glow-button text-black px-4 py-2 rounded-full font-medium">Login</a>`;
                if (!user) {
                    auth.signInAnonymously().catch(error => console.error("Anonymous sign-in failed:", error));
                }
            }
        }
    });

    // --- Login Page Logic ---
    if (loginForm) {
        const loginError = document.getElementById('login-error');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            auth.signInWithEmailAndPassword(email, password)
                .then(() => window.location.href = 'index.html')
                .catch(error => loginError.textContent = error.message);
        });

        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                auth.signInWithPopup(googleProvider)
                    .then(() => window.location.href = 'index.html')
                    .catch(error => loginError.textContent = error.message);
            });
        }
    }

    // --- Signup Page Logic ---
    if (document.getElementById('signup-options')) {
        const signupOptions = document.getElementById('signup-options');
        const emailSignupBtn = document.getElementById('email-signup-btn');
        const signupError = document.getElementById('signup-error');

        emailSignupBtn.addEventListener('click', () => {
            signupOptions.classList.add('hidden');
            signupForm.classList.remove('hidden');
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => userCredential.user.updateProfile({ displayName: name }))
                .then(() => window.location.href = 'index.html')
                .catch(error => signupError.textContent = error.message);
        });

        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                auth.signInWithPopup(googleProvider)
                    .then(() => window.location.href = 'index.html')
                    .catch(error => signupError.textContent = error.message);
            });
        }

        if (anonymousLoginBtn) {
            anonymousLoginBtn.addEventListener('click', () => {
                auth.signInAnonymously()
                    .then(() => window.location.href = 'index.html')
                    .catch(error => signupError.textContent = error.message);
            });
        }
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
