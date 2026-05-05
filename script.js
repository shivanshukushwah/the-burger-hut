// Interaction Logic for Burger Hut

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- Navbar Background Change on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'rgba(13, 13, 13, 0.8)';
        }
    });

    // --- Parallax Effect for Burger ---
    const heroBurger = document.querySelector('.floating-burger');
    window.addEventListener('mousemove', (e) => {
        if (!heroBurger) return;
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;
        heroBurger.style.transform = `translate(${x}px, ${y}px) rotate(${x/2}deg)`;
    });

    // --- Smooth Scrolling for all links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });

    // --- Menu Data & Dynamic Rendering ---
    const menuData = [
        // Pizzas
        { name: "Paneer Makhani Pizza", category: "pizza", price: "₹249", sizes: { Regular: "₹249", Medium: "₹529", Large: "₹769" }, desc: "Makhani sauce loaded with juicy paneer and crispy onion.", img: "assets/pizza-deluxe.png" },
        { name: "Farmhouse Pizza", category: "pizza", price: "₹239", sizes: { Regular: "₹239", Medium: "₹439", Large: "₹659" }, desc: "Tomato, capsicum, onion & grilled mushroom.", img: "assets/pizza-deluxe.png" },
        { name: "Margherita", category: "pizza", price: "₹129", sizes: { Regular: "₹129", Medium: "₹239", Large: "₹429" }, desc: "Classic delight with 100% real mozzarella cheese.", img: "assets/pizza-deluxe.png" },
        { name: "Swadeshi Tandoori Paneer", category: "pizza", price: "₹279", sizes: { Regular: "₹279", Medium: "₹525", Large: "₹775" }, desc: "So-Indian tandoori paneer with mint mayo.", img: "assets/pizza-deluxe.png" },
        
        // Pasta
        { name: "Penne White Sauce", category: "pasta", price: "₹189", desc: "Creamy white sauce pasta with exotic herbs.", img: "assets/pasta-white.png" },
        { name: "Pink Flamingo Pasta", category: "pasta", price: "₹189", desc: "A perfect blend of red and white sauce.", img: "assets/pasta-white.png" },

        // Sides (Appetizers)
        { name: "Supreme Garlic Bread", category: "sides", price: "₹149", desc: "Cheesy garlic bread topped with onions, jalapenos, and olives.", img: "assets/garlic-bread-supreme.png" },
        { name: "Mexican Veg Taco", category: "sides", price: "₹89", desc: "Zesty single taco with fresh veggies and salsa.", img: "assets/veggie-burger.png" },
        { name: "Baked Cheesy Nachos", category: "sides", price: "₹169", desc: "Crunchy nachos loaded with melted cheese and jalapenos.", img: "assets/pizza-deluxe.png" },
        { name: "Cheese Coins", category: "sides", price: "₹139", desc: "5 pieces of crispy, cheesy golden coins.", img: "assets/garlic-bread-supreme.png" },

        // Mains
        { name: "Paneer Makhani Sandwich", category: "mains", price: "₹159", desc: "Grilled sandwich with rich paneer makhani filling.", img: "assets/story-visual.png" },
        { name: "Spicy Paneer Wrap", category: "mains", price: "₹129", desc: "Zesty paneer wrapped in a soft tortilla.", img: "assets/story-visual.png" },

        // Desserts & Waffles
        { name: "Nutella Madness Waffle", category: "desserts", price: "₹199", desc: "Fresh Belgian waffle loaded with Nutella and hazelnuts.", img: "assets/waffle-tower.png" },
        { name: "Choco Fudge Waffle", category: "desserts", price: "₹159", desc: "Waffle topped with rich chocolate fudge sauce.", img: "assets/waffle-tower.png" },
        { name: "Choco Lava Cake", category: "desserts", price: "₹99", desc: "Warm cake with a melting chocolate heart.", img: "assets/choco-lava-cake.png" },
        { name: "Brownie with Ice Cream", category: "desserts", price: "₹75", desc: "Classic walnut brownie served with vanilla scoop.", img: "assets/choco-lava-cake.png" },
        { name: "Death by Chocolate", category: "desserts", price: "₹350", desc: "The ultimate chocolate indulgence for true lovers.", img: "assets/choco-lava-cake.png" },

        // Beverages
        { name: "Blue Ocean Injector", category: "beverages", price: "₹149", desc: "Vibrant blue refreshing mocktail.", img: "assets/injector-drink.png" },
        { name: "Hazelnut Frappe", category: "beverages", price: "₹139", desc: "Creamy cold coffee with premium hazelnut flavor.", img: "assets/coffee-frappe.png" },
        { name: "Kit Kat Shake", category: "beverages", price: "₹219", desc: "Thick milkshake blended with Kit Kat bars.", img: "assets/milkshake-deluxe.png" },
        { name: "Nutella Madness Shake", category: "beverages", price: "₹219", desc: "Indulgent Nutella milkshake with whipped cream.", img: "assets/milkshake-deluxe.png" },
        { name: "Virgin Mojito", category: "beverages", price: "₹129", desc: "Classic mint and lime refresher.", img: "assets/injector-drink.png" },
        { name: "Strawberry Milkshake", category: "beverages", price: "₹139", desc: "Creamy seasonal strawberry blast.", img: "assets/milkshake-deluxe.png" },
        { name: "Hazelnut Hot Coffee", category: "beverages", price: "₹99", desc: "Warm and cozy hazelnut infused coffee.", img: "assets/coffee-frappe.png" }
    ];

    const menuGrid = document.querySelector('.menu-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const viewFullMenuBtn = document.getElementById('view-full-menu');
    let isMenuExpanded = false;
    let currentCategory = 'all';

    function renderMenu(category = 'all') {
        if (!menuGrid) return;
        
        currentCategory = category;
        menuGrid.innerHTML = '';
        
        // Filter Data
        let filteredData = category === 'all' 
            ? menuData 
            : menuData.filter(item => item.category === category);

        // Preview Logic: Show only first 6 if 'all' and not expanded
        if (category === 'all' && !isMenuExpanded) {
            filteredData = filteredData.slice(0, 6);
            if (viewFullMenuBtn) viewFullMenuBtn.parentElement.style.display = 'block';
        } else {
            if (viewFullMenuBtn) viewFullMenuBtn.parentElement.style.display = 'none';
        }

        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'glass-card menu-card';
            
            // Staggered Entrance Animation Delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Trigger animation after adding to DOM
            setTimeout(() => {
                card.classList.add('reveal-active');
            }, 50);
            
            let priceSection = `<div class="price-row"><span class="price">${item.price}</span><button class="add-btn" onclick="addToCart('${item.name}', '${item.price}')">+</button></div>`;
            
            if (item.sizes) {
                priceSection = `
                    <div class="price-options">
                        ${Object.entries(item.sizes).map(([size, price]) => `
                            <div class="price-row">
                                <span class="price-label">${size}</span>
                                <span class="price">${price}</span>
                                <button class="add-btn" onclick="addToCart('${item.name} (${size})', '${price}')">+</button>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="card-img">
                    <img src="${item.img}" alt="${item.name}" class="floating-img">
                </div>
                <div class="card-info">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    ${priceSection}
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }

    // Initial Render
    renderMenu();

    // View Full Menu Event
    if (viewFullMenuBtn) {
        viewFullMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isMenuExpanded = true;
            renderMenu('all');
        });
    }

    // 3D Mouse Parallax for Menu Grid
    document.addEventListener('mousemove', (e) => {
        if (!menuGrid) return;
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        menuGrid.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            isMenuExpanded = true; // Auto-expand when a specific category is chosen
            renderMenu(btn.dataset.category);
        });
    });

    // --- Add to Cart Logic ---
    window.addToCart = (name, price) => {
        saveOrder(name, price);
        showNotification(`Added ${name} to cart!`);
    };

    function saveOrder(name, price) {
        let orders = JSON.parse(localStorage.getItem('burgerHutOrders') || '[]');
        const newOrder = {
            id: Date.now(),
            item: name,
            price: price,
            status: 'pending',
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        };
        orders.push(newOrder);
        localStorage.setItem('burgerHutOrders', JSON.stringify(orders));
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerText = message;
        document.body.appendChild(notification);

        // Simple notification style
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'var(--primary)',
            color: 'black',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontWeight: 'bold',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease-out',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        });

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // --- Admin Shortcut ---
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 3) {
                window.location.href = 'admin.html';
            }
            setTimeout(() => { clickCount = 0; }, 2000);
        });
    }
});

// Adding styles for mobile menu
const style = document.createElement('style');
style.innerHTML = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #111;
            padding: 2rem;
            gap: 1.5rem;
            border-bottom: 2px solid var(--primary);
        }
        
        .menu-toggle {
            display: flex;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
        }
        
        .menu-toggle span {
            width: 30px;
            height: 3px;
            background: white;
            transition: 0.3s;
        }
        
        .menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
        .menu-toggle.active span:nth-child(2) { opacity: 0; }
        .menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -7px); }
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
