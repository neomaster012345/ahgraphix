/**
 * JavaScript for AH Graphix Store - Shop Page (v3 - Refactored for Reliability)
 * Handles:
 * 1. Dynamic Product Loading from the provided data structure
 * 2. Category Filtering
 * 3. Search Functionality
 * 4. Price Sorting
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Product Data ---
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
                { name: "Gemini", price: "20000 Pkr", details: "15 Months Price", logo: "fas fa-gem", access: "Private" }
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

    // --- DOM Element References ---
    const productGrid = document.getElementById('product-grid');
    const categoryNav = document.getElementById('category-text-nav');
    const searchBar = document.getElementById('search-bar');
    const priceFilter = document.getElementById('price-filter');

    // --- State Management ---
    let state = {
        products: [],
        category: 'all',
        searchTerm: '',
        sortOrder: 'default'
    };

    // --- Helper function to parse price string to a number ---
    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        const number = parseInt(priceString.replace(/[^0-9]/g, ''), 10);
        return isNaN(number) ? 0 : number;
    };

    // --- Function to create a single product card element ---
    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'product-card product-item';

        const detailsHTML = product.details ? `<p class="product-details">${product.details}</p>` : `<div class="product-details" style="min-height: 25px;"></div>`;
        const priceHTML = product.price ? `<div class="price-wrapper"><p class="price">${product.price}</p></div>` : `<div style="min-height: 50px;"></div>`;
        
        card.innerHTML = `
            <div class="product-access-label">${product.access || 'Standard'}</div>
            <div class="product-logo"><i class="${product.logo || 'fas fa-box-open'}"></i></div>
            <h3 class="product-name">${product.name}</h3>
            ${detailsHTML}
            ${priceHTML}
            <a href="https://wa.me/923268600994?text=I'm%20interested%20in%20%22${encodeURIComponent(product.name)}%22.%20Please%20provide%20more%20details." class="buy-button" target="_blank" rel="noopener noreferrer">Buy Now</a>
        `;
        return card;
    };

    // --- Master Render Function ---
    const render = () => {
        // 1. Start with the full product list
        let viewProducts = [...state.products];

        // 2. Filter by category
        if (state.category !== 'all') {
            viewProducts = viewProducts.filter(p => p.categorySlug === state.category);
        }

        // 3. Filter by search term
        if (state.searchTerm) {
            viewProducts = viewProducts.filter(p => p.name.toLowerCase().includes(state.searchTerm));
        }

        // 4. Sort the filtered list
        if (state.sortOrder === 'low-to-high') {
            viewProducts.sort((a, b) => a.priceNum - b.priceNum);
        } else if (state.sortOrder === 'high-to-low') {
            viewProducts.sort((a, b) => b.priceNum - a.priceNum);
        }

        // 5. Clear the grid and render the final product list
        productGrid.innerHTML = '';
        if (viewProducts.length === 0) {
            productGrid.innerHTML = `<p class="text-center text-gray-400 col-span-full text-xl py-8">No products found matching your criteria.</p>`;
        } else {
            viewProducts.forEach(product => {
                const card = createProductCard(product);
                productGrid.appendChild(card);
            });
        }
    };

    // --- Setup Category Navigation ---
    const setupCategories = () => {
        const categories = [{ category: "All Products", slug: "all" }, ...productsData];
        categoryNav.innerHTML = '';
        categories.forEach(cat => {
            const tab = document.createElement('button');
            tab.className = 'tab-button px-4 py-2 text-lg text-gray-400 hover:text-gold transition-colors';
            tab.textContent = cat.category;
            
            if (cat.slug === 'all') {
                tab.classList.add('tab-active');
            }
            
            tab.addEventListener('click', () => {
                document.querySelectorAll('#category-text-nav .tab-button').forEach(btn => btn.classList.remove('tab-active'));
                tab.classList.add('tab-active');
                state.category = cat.slug; // Update state
                render(); // Re-render
            });
            categoryNav.appendChild(tab);
        });
    };

    // --- Event Listeners ---
    searchBar.addEventListener('input', (e) => {
        state.searchTerm = e.target.value.toLowerCase().trim(); // Update state
        render(); // Re-render
    });

    priceFilter.addEventListener('change', (e) => {
        state.sortOrder = e.target.value; // Update state
        render(); // Re-render
    });

    // --- Initial Page Load ---
    const initialize = () => {
        // Flatten the product data into a single array for easier manipulation
        state.products = productsData.flatMap(category => 
            category.items.map(item => ({
                ...item,
                categorySlug: category.slug,
                priceNum: parsePrice(item.price)
            }))
        );
        setupCategories();
        render(); // Initial render of all products
    };

    initialize();
});
