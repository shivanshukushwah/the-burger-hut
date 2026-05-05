// Admin Logic for The Burger Hut

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Authentication ---
    const LOGIN_CODE = 'owner'; // Default access code
    const loginSection = document.getElementById('login-section');
    const adminDashboard = document.getElementById('admin-dashboard');
    const loginBtn = document.getElementById('login-btn');
    const adminPassInput = document.getElementById('admin-pass');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');

    // Check session if already logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }

    loginBtn.addEventListener('click', () => {
        if (adminPassInput.value === LOGIN_CODE) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            showDashboard();
        } else {
            loginError.style.display = 'block';
            adminPassInput.value = '';
        }
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.reload();
    });

    function showDashboard() {
        loginSection.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadOrders();
        loadMenuManagement();
    }

    // --- Tab Navigation ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.admin-tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.getAttribute('data-tab');
            
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetTab}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // --- Orders Management ---
    function loadOrders() {
        const orders = JSON.parse(localStorage.getItem('burgerHutOrders') || '[]');
        const ordersList = document.getElementById('orders-list');
        ordersList.innerHTML = '';
        
        let totalRevenue = 0;
        let pendingCount = 0;

        orders.forEach(order => {
            const tr = document.createElement('tr');
            
            // Calculate revenue
            const priceVal = parseFloat(order.price.replace('$', ''));
            if (order.status !== 'cancelled') {
                totalRevenue += priceVal;
            }
            if (order.status === 'pending') {
                pendingCount++;
            }

            tr.innerHTML = `
                <td>#${order.id.toString().slice(-4)}</td>
                <td>${order.item}</td>
                <td>${order.price}</td>
                <td>${order.time}</td>
                <td><span class="status status-${order.status}">${order.status}</span></td>
                <td>
                    ${order.status === 'pending' ? `<button class="action-btn btn-edit" onclick="updateOrderStatus(${order.id}, 'completed')">Complete</button>` : ''}
                    <button class="action-btn btn-delete" onclick="deleteOrder(${order.id})">Delete</button>
                </td>
            `;
            ordersList.appendChild(tr);
        });

        // Update stats
        document.getElementById('total-revenue').innerText = `$${totalRevenue.toFixed(2)}`;
        document.getElementById('order-count').innerText = orders.length;
        document.getElementById('pending-count').innerText = pendingCount;
    }

    window.updateOrderStatus = (id, newStatus) => {
        let orders = JSON.parse(localStorage.getItem('burgerHutOrders') || '[]');
        orders = orders.map(order => {
            if (order.id === id) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        localStorage.setItem('burgerHutOrders', JSON.stringify(orders));
        loadOrders();
    };

    window.deleteOrder = (id) => {
        if(confirm('Are you sure you want to delete this order?')) {
            let orders = JSON.parse(localStorage.getItem('burgerHutOrders') || '[]');
            orders = orders.filter(order => order.id !== id);
            localStorage.setItem('burgerHutOrders', JSON.stringify(orders));
            loadOrders();
        }
    };

    // --- Menu Management ---
    const defaultMenu = [
        { id: 1, name: 'Royal Classic', description: 'Double Wagyu patty, aged cheddar, secret house sauce.', price: '$14.99', status: 'available' },
        { id: 2, name: 'Blazing Soul', description: 'Spicy buttermilk fried chicken, jalapeño slaw.', price: '$12.99', status: 'available' },
        { id: 3, name: 'Green Earth', description: 'Avocado mash, grilled halloumi, roasted bell peppers.', price: '$13.50', status: 'available' }
    ];

    function loadMenuManagement() {
        let menuItems = JSON.parse(localStorage.getItem('burgerHutMenu') || JSON.stringify(defaultMenu));
        const menuList = document.getElementById('menu-management-list');
        menuList.innerHTML = '';

        menuItems.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600;">${item.name}</td>
                <td style="font-size: 0.85rem; opacity: 0.7;">${item.description}</td>
                <td>${item.price}</td>
                <td><span class="status status-${item.status === 'available' ? 'completed' : 'cancelled'}">${item.status}</span></td>
                <td>
                    <button class="action-btn btn-edit" onclick="editMenuPrice(${item.id})">Edit</button>
                    <button class="action-btn btn-delete" onclick="toggleMenuStatus(${item.id})">${item.status === 'available' ? 'Deactivate' : 'Activate'}</button>
                </td>
            `;
            menuList.appendChild(tr);
        });
    }

    window.editMenuPrice = (id) => {
        let menuItems = JSON.parse(localStorage.getItem('burgerHutMenu') || JSON.stringify(defaultMenu));
        const item = menuItems.find(i => i.id === id);
        const newPrice = prompt(`Enter new price for ${item.name}:`, item.price);
        
        if (newPrice) {
            menuItems = menuItems.map(i => {
                if (i.id === id) {
                    return { ...i, price: newPrice };
                }
                return i;
            });
            localStorage.setItem('burgerHutMenu', JSON.stringify(menuItems));
            loadMenuManagement();
        }
    };

    window.toggleMenuStatus = (id) => {
        let menuItems = JSON.parse(localStorage.getItem('burgerHutMenu') || JSON.stringify(defaultMenu));
        menuItems = menuItems.map(i => {
            if (i.id === id) {
                return { ...i, status: i.status === 'available' ? 'out of stock' : 'available' };
            }
            return i;
        });
        localStorage.setItem('burgerHutMenu', JSON.stringify(menuItems));
        loadMenuManagement();
    };

    // Auto refresh orders every 10 seconds
    setInterval(() => {
        if (sessionStorage.getItem('adminLoggedIn') === 'true' && document.getElementById('orders-tab').classList.contains('active')) {
            loadOrders();
        }
    }, 10000);
});
