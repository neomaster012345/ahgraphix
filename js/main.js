/**
 * Main JavaScript file for AH Graphix Store
 * Handles:
 * 1. Mobile Menu Toggle
 * 2. Snowfall Animation
 * 3. User Activity Simulation
 */

// Tailwind CSS Configuration
// Note: This is typically in a separate config file, but for CDN usage, it's placed here.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                gold: '#FFD700',
                darkGold: '#D4AF37',
                black: '#000000',
                darkGray: '#121212',
                lightGray: '#333333',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        }
    }
};

// This function runs when the entire page is fully loaded, including styles and images.
window.addEventListener('load', function() {
    // --- Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Random User Count Logic ---
    const activeUsersSpan = document.getElementById('active-users');
    if (activeUsersSpan) {
        function updateUserCount() {
            const count = Math.floor(Math.random() * 50) + 80; // Random number between 80-130
            activeUsersSpan.textContent = `👤 ${count} users exploring now...`;
            // Set a timeout to call this function again after 8 seconds
            setTimeout(updateUserCount, 8000); 
        }
        updateUserCount(); // Initial call
    }

    // --- Snowfall Animation Logic ---
    const canvas = document.getElementById('snowCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let snowflakes = [];
        const numberOfSnowflakes = 150; // Adjust for more/less snow

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function initSnowflakes() {
            snowflakes = [];
            for (let i = 0; i < numberOfSnowflakes; i++) {
                snowflakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 4 + 1, // Radius between 1 and 5
                    d: Math.random() * numberOfSnowflakes // Density/drift factor
                });
            }
        }

        function drawSnowflakes() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            for (let i = 0; i < numberOfSnowflakes; i++) {
                const f = snowflakes[i];
                ctx.moveTo(f.x, f.y);
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
        }

        let angle = 0;
        function updateSnowflakes() {
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
        }

        function animateSnowfall() {
            updateSnowflakes();
            drawSnowflakes();
            requestAnimationFrame(animateSnowfall);
        }

        setCanvasSize();
        initSnowflakes();
        animateSnowfall();

        window.addEventListener('resize', () => {
            setCanvasSize();
            initSnowflakes();
        });
    }
});
