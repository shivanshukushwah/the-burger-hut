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

    // --- Add to Cart Mock functionality ---
    const addBtns = document.querySelectorAll('.add-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemName = btn.closest('.menu-card').querySelector('h3').innerText;
            showNotification(`Added ${itemName} to cart!`);
        });
    });

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
            animation: 'slideIn 0.3s ease-out'
        });

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
});

// Adding styles for the mobile menu state that we toggled in JS
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
