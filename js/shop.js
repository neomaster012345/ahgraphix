// Data for products (specific to shop page)
const productsData = [
    {
        category: "AI Tools",
        slug: "ai-tools",
        items: [
            { name: "ChatGPT Pro", price: "4500 Pkr", details: "200 $", logo: "fas fa-robot", access: "Semi Private" },
            { name: "ChatGPT Plus", price: "700 Pkr", logo: "fas fa-robot", access: "Shared" },
            { name: "ChatGPT Plus Semi Private", price: "1300 Pkr", logo: "fas fa-robot", access: "Semi Private" },
            { name: "ChatGPT Plus Special", price: "2500 Pkr", logo: "fas fa-robot", access: "Special" },
            { name: "ChatGPT Plus Private", price: "4500 Pkr", logo: "fas fa-robot", access: "Private" },
            { name: "ChatGPT Team Plans", price: "1500 Pkr", logo: "fas fa-users", access: "Shared" },
            { name: "Perplexity Pro", price: "800 Pkr", logo: "fas fa-brain", access: "Semi Private" },
            { name: "Claude AI", price: "6000 Pkr", logo: "fas fa-comments", access: "Private" },
            { name: "Perplexity AI", price: "600 Pkr", logo: "fas fa-brain", access: "Shared" },
            { name: "Gemini", price: "20,000 Pkr", details: "15 Months Price", logo: "fas fa-gem", access: "Private" }
        ]
    },
    {
        category: "AI Video Generation Tools",
        slug: "ai-video",
        items: [
            { name: "Sora AI Plus", price: "2000 Pkr", logo: "fas fa-video", access: "Semi Private" },
            { name: "Sora AI Pro", price: "4500 Pkr", logo: "fas fa-video", access: "Semi Private" },
            { name: "Veo 3", price: "1200 Pkr", logo: "fas fa-film", access: "Shared" },
            { name: "Runway ML (Unlimited Plan)", price: "3500 Pkr", details: "Semi Private", logo: "fas fa-magic", access: "Semi Private" },
            { name: "Hailou AI (Ultra Plan)", price: "3500 Pkr", details: "Semi Private", logo: "fas fa-cloud-upload-alt", access: "Semi Private" },
            { name: "Hailou AI (Max Plan)", price: "4000 Pkr", details: "Semi Private", logo: "fas fa-cloud-upload-alt", access: "Semi Private" },
            { name: "Midjourney (Standard Plan)", price: "2500 Pkr", details: "Semi Private", logo: "fas fa-palette", access: "Semi Private" },
            { name: "Story Block Unlimited Semi", price: "1800 Pkr", logo: "fas fa-book-open", access: "Semi Private" }
        ]
    },
    {
        category: "AI Voice Generation Tools",
        slug: "ai-voice",
        items: [
            { name: "ElevenLabs (Creator Plan)", price: "5500 Pkr", details: "3 Months", logo: "fas fa-microphone-alt", access: "Creator Plan" }
        ]
    },
    {
        category: "Writing / Plagiarism / Humanizer Tools",
        slug: "writing-tools",
        items: [
            { name: "Grammarly Premium", price: "450 Pkr", logo: "fas fa-pen-nib", access: "Premium" },
            { name: "Quillbot Premium", price: "550 Pkr", logo: "fas fa-feather-alt", access: "Premium" },
            { name: "Turnitin (Student)", price: "650 Pkr", logo: "fas fa-graduation-cap", access: "Student" },
            { name: "Turnitin (Instructor)", price: "850 Pkr", logo: "fas fa-chalkboard-teacher", access: "Instructor" },
            { name: "Hemingway", price: "450 Pkr", logo: "fas fa-book", access: "Standard" },
            { name: "Stealth Writer Semi", price: "1800 Pkr", logo: "fas fa-mask", access: "Semi Private" }
        ]
    },
    {
        category: "Entertainment Streaming",
        slug: "entertainment",
        items: [
            { name: "Netflix", price: "400 Pkr", logo: "fas fa-tv", access: "Shared" },
            { name: "Netflix", price: "2000 Pkr", logo: "fas fa-tv", access: "Private" },
            { name: "Amazon Prime Video", price: "100 Pkr", logo: "fab fa-amazon", access: "Standard" },
            { name: "YouTube Premium", price: "150 Pkr", logo: "fab fa-youtube", access: "Premium" }
        ]
    },
    {
        category: "IPTV Streaming",
        slug: "iptv",
        items: [
            { name: "Opplex TV (1 Month)", price: "250 Pkr", logo: "fas fa-satellite-dish", access: "1 Month" },
            { name: "Opplex TV (3 Month)", price: "650 Pkr", logo: "fas fa-satellite-dish", access: "3 Months" },
            { name: "Opplex TV (6 Month)", price: "1300 Pkr", logo: "fas fa-satellite-dish", access: "6 Months" },
            { name: "Opplex TV (9 Month)", price: "1900 Pkr", logo: "fas fa-satellite-dish", access: "9 Months" },
            { name: "Opplex TV (1 Year)", price: "2500 Pkr", logo: "fas fa-satellite-dish", access: "1 Year" }
        ]
    },
    {
        category: "Admin Panels & Dashboards",
        slug: "admin-panels",
        items: [
            { name: "Canva Edu Admin Panel", logo: "fas fa-cogs", access: "Admin Panel" },
            { name: "Opplex IPTV Panel", logo: "fas fa-cogs", access: "Admin Panel" },
            { name: "IPTV Admin Panel", logo: "fas fa-cogs", access: "Admin Panel" }
        ]
    },
    {
        category: "Editing & Design Tools",
        slug: "editing-tools",
        items: [
            { name: "CapCut Pro", price: "1100 Pkr", logo: "fas fa-cut", access: "Private" },
            { name: "Canva Pro (1 Year)", price: "250 Pkr", logo: "fas fa-paint-brush", access: "1 Year" },
            { name: "Canva Pro (2 Year)", price: "350 Pkr", logo: "fas fa-paint-brush", access: "2 Year" },
            { name: "Canva Pro (3 Year)", price: "450 Pkr", logo: "fas fa-paint-brush", access: "3 Year" },
            { name: "Canva Pro (Lifetime)", price: "650 Pkr", logo: "fas fa-paint-brush", access: "Lifetime" },
            { name: "Adobe Creative Cloud", price: "2000 Pkr", logo: "fas fa-cloud", access: "Standard" }
        ]
    },
    {
        category: "Productivity & Office Tools",
        slug: "productivity",
        items: [
            { name: "MS Office 365", price: "3000 Pkr", details: "Yearly", logo: "fas fa-briefcase", access: "Yearly" },
            { name: "Zoom Pro Monthly", price: "2000 Pkr", logo: "fas fa-video-camera", access: "Monthly" },
            { name: "Envato Elements Shared", price: "700 Pkr", logo: "fas fa-cubes", access: "Shared" },
            { name: "Envato Elements Direct", price: "1800 Pkr", logo: "fas fa-cubes", access: "Direct" }
        ]
    },
    {
        category: "SEO / Marketing / Analytics Tools",
        slug: "seo-tools",
        items: [
            { name: "Ahref", price: "5000 Pkr", details: "Monthly", logo: "fas fa-chart-line", access: "Monthly" },
            { name: "SEMrush", price: "450 Pkr", logo: "fas fa-search", access: "Standard" },
            { name: "Ubersuggest", logo: "fas fa-search-plus", access: "Standard" },
            { name: "Moz Pro", price: "450 Pkr", logo: "fas fa-magnifying-glass", access: "Standard" },
            { name: "VidIQ Pro", logo: "fab fa-youtube", access: "Pro" }
        ]
    },
    {
        category: "WordPress Tools and Plugins",
        slug: "wordpress",
        items: [
            { name: "Elementor Pro", logo: "fab fa-wordpress", access: "Yearly" },
            { name: "Generatepress Premium", logo: "fab fa-wordpress", access: "Yearly" },
            { name: "Astra Pro Lifetime Unlimited", logo: "fab fa-wordpress", access: "Lifetime" },
            { name: "Divi Theme And Builder Unlimited", logo: "fab fa-wordpress", access: "Unlimited" },
            { name: "Kadence Pro", logo: "fab fa-wordpress", access: "Pro" },
            { name: "Schema Pro", logo: "fab fa-wordpress", access: "Pro" },
            { name: "Blocksy", logo: "fab fa-wordpress", access: "Standard" },
            { name: "Woostify", logo: "fab fa-wordpress", access: "Standard" },
            { name: "Merimag Theme", logo: "fab fa-wordpress", access: "Standard" },
            { name: "Wpcompress Unlimited", logo: "fab fa-wordpress", access: "Unlimited" }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productGridContainer = document.getElementById('product-grid');
    const categoryTextNav = document.getElementById('category-text-nav');

    // --- Generate Category Navigation Buttons (Text Tabs only) ---
    const allCategory = { category: "All Products", slug: "all" };
    const allCategories = [allCategory, ...productsData];

    allCategories.forEach(cat => {
        const textButton = document.createElement('button');
        textButton.classList.add('tab-button', 'px-4', 'py-2', 'text-white', 'hover:text-gold', 'transition-colors');
        textButton.dataset.category = cat.slug;
        textButton.textContent = cat.category;
        textButton.onclick = () => window.filterProducts(cat.slug);
        categoryTextNav.appendChild(textButton);
    });

    // --- Render all product cards initially ---
    productsData.forEach(categoryData => {
        categoryData.items.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'product-item');
            productCard.dataset.category = categoryData.slug;

            // Product Access Label (e.g., "Semi Private")
            if (product.access) {
                const accessLabel = document.createElement('div');
                accessLabel.classList.add('product-access-label');
                accessLabel.textContent = product.access;
                productCard.appendChild(accessLabel);
            }

            // Product Logo/Icon
            const productLogoDiv = document.createElement('div');
            productLogoDiv.classList.add('product-logo');
            if (product.logo && product.logo.startsWith('http')) {
                const img = document.createElement('img');
                img.src = product.logo;
                img.alt = product.name + " logo";
                productLogoDiv.appendChild(img);
            } else if (product.logo) {
                const icon = document.createElement('i');
                icon.classList.add(...product.logo.split(' '));
                productLogoDiv.appendChild(icon);
            } else {
                const icon = document.createElement('i');
                icon.classList.add('fas', 'fa-gear');
                productLogoDiv.appendChild(icon);
            }
            productCard.appendChild(productLogoDiv);

            // Product Name (only tool name)
            const productName = document.createElement('h3');
            productName.classList.add('product-name');
            productName.textContent = product.name.split('(')[0].trim(); // Remove details in parentheses
            productCard.appendChild(productName);

            // Product Details (e.g., "200 $")
            if (product.details) {
                const productDetails = document.createElement('p');
                productDetails.classList.add('product-details');
                productDetails.textContent = product.details;
                productCard.appendChild(productDetails);
            } else {
                const productDetailsPlaceholder = document.createElement('div');
                productDetailsPlaceholder.classList.add('product-details');
                productDetailsPlaceholder.style.minHeight = '25px'; /* Adjusted min-height */
                productCard.appendChild(productDetailsPlaceholder);
            }

            // Price Wrapper (if price exists)
            if (product.price) {
                const priceWrapper = document.createElement('div');
                priceWrapper.classList.add('price-wrapper');
                const priceText = document.createElement('p');
                priceText.classList.add('price');
                priceText.textContent = product.price;
                priceWrapper.appendChild(priceText);
                productCard.appendChild(priceWrapper);
            } else {
                const noPricePlaceholder = document.createElement('div');
                noPricePlaceholder.style.minHeight = '50px'; /* Adjusted min-height for empty price section */
                productCard.appendChild(noPricePlaceholder);
            }

            // Buy Now Button
            const buyButton = document.createElement('a');
            buyButton.classList.add('buy-button');
            buyButton.textContent = 'Buy Now';
            buyButton.setAttribute('target', '_blank');
            buyButton.setAttribute('rel', 'noopener noreferrer');
            const whatsappBase = "https://wa.me/923268600994?text=";
            const messageText = encodeURIComponent(`I'm interested in "${product.name}". Please provide more details.`);
            buyButton.href = whatsappBase + messageText;
            productCard.appendChild(buyButton);

            productGridContainer.appendChild(productCard);
        });
    });

    // --- Filter Products Function ---
    window.filterProducts = function(category) {
        // Update active state for text tabs
        document.querySelectorAll('#category-text-nav .tab-button').forEach(button => {
            if (button.dataset.category === category) {
                button.classList.add('tab-active');
            } else {
                button.classList.remove('tab-active');
            }
        });

        // Filter product cards with smooth transition
        const products = document.querySelectorAll('.product-item');
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.classList.remove('hidden');
                // Set display to flex immediately to ensure it's part of layout for height calculation
                product.style.display = 'flex'; 
                // Use a short timeout to ensure the `hidden` class is removed
                // before the `max-height` transition starts.
                setTimeout(() => {
                    product.style.maxHeight = product.scrollHeight + 'px';
                    product.style.opacity = '1';
                    product.style.transform = 'scale(1)';
                }, 10); 
            } else {
                // Set current height before hiding to enable transition
                product.style.maxHeight = product.scrollHeight + 'px'; 
                product.style.opacity = '0';
                product.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    product.classList.add('hidden');
                    product.style.maxHeight = '0'; // Collapse
                    product.style.display = 'none'; // Hide completely after transition
                }, 500); // Match transition duration
            }
        });
    };

    // Initial filter to show "All Products" on load
    window.filterProducts('all');
});