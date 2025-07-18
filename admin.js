document.addEventListener('DOMContentLoaded', () => {
    // --- Authentication Check ---
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
        return;
    }

    // --- DOM Elements ---
    const sections = document.querySelectorAll('.admin-section');
    const navLinks = document.querySelectorAll('.admin-nav a');
    const logoutBtn = document.getElementById('logout-btn');

    // --- State ---
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // --- Functions ---
    const renderDashboard = () => {
        document.getElementById('total-orders').textContent = orders.length;
        document.getElementById('pending-orders').textContent = orders.filter(o => o.status === 'Pending').length;
        document.getElementById('inprogress-orders').textContent = orders.filter(o => o.status === 'In Progress').length;
        document.getElementById('delivered-orders').textContent = orders.filter(o => o.status === 'Delivered').length;
    };

    const renderOrders = () => {
        const container = document.getElementById('admin-orders-list');
        container.innerHTML = '';
        if (orders.length === 0) {
            container.innerHTML = '<p>No orders to display.</p>';
            return;
        }

        orders.slice().reverse().forEach(order => {
            const card = document.createElement('div');
            card.className = 'order-card';
            card.innerHTML = `
                <div class="order-header">
                    <h3>Order #${order.orderId.split('_')[1]}</h3>
                    <div class="status-control">
                        <label for="status-${order.orderId}">Status: </label>
                        <select class="status-select" data-order-id="${order.orderId}">
                            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="In Progress" ${order.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                    </div>
                </div>
                <div class="order-details">
                     <div class="detail-item">
                        <strong>Customer Details</strong>
                        <p>
                            Name: ${order.customer.name}<br>
                            Email: ${order.customer.email}<br>
                            Phone: ${order.customer.phone}
                        </p>
                    </div>
                    <div class="detail-item">
                        <strong>Plan Details</strong>
                        <p>
                            Plan: ${order.plan.name} (${order.plan.period})<br>
                            Design Add-on: ${order.plan.hasDesignAddon ? 'Yes' : 'No'}<br>
                            Payment Setup: ${order.plan.hasPaymentSetup ? 'Yes' : 'No'}<br>
                            <strong>Total Paid: ₹${order.plan.total}</strong>
                        </p>
                    </div>
                    <div class="detail-item">
                        <strong>Project Requirements</strong>
                        <p>
                            <strong>Website Type:</strong><br>${order.project.websiteType}<br><br>
                            <strong>Design Style:</strong><br>${order.project.designStyle}<br><br>
                            <strong>Features Needed:</strong><br>${order.project.featuresNeeded}
                        </p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    };

    const handleStatusChange = (e) => {
        const orderId = e.target.dataset.orderId;
        const newStatus = e.target.value;
        
        // Find order and update status
        const orderIndex = orders.findIndex(o => o.orderId === orderId);
        if (orderIndex > -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Re-render dashboard to reflect changes
            renderDashboard();
        }
    };

    const showSection = (targetId) => {
        sections.forEach(section => {
            section.style.display = section.id === targetId ? 'block' : 'none';
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === targetId);
        });
    };

    // --- Event Listeners ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(e.target.dataset.target);
        });
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'admin-login.html';
    });
    
    document.getElementById('admin-orders-list').addEventListener('change', (e) => {
        if (e.target.classList.contains('status-select')) {
            handleStatusChange(e);
        }
    });

    // --- Initial Render ---
    renderDashboard();
    renderOrders();
});
