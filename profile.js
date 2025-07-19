document.addEventListener('DOMContentLoaded', () => {
    const profileContent = document.getElementById('profile-content');
    const authGate = document.getElementById('auth-gate');
    const ordersListContainer = document.getElementById('profile-orders-list');
    const currentUserSession = getCurrentUser();

    if (!currentUserSession) {
        profileContent.style.display = 'none';
        authGate.innerHTML = `
            <div class="auth-gate-content">
                <h2>Please Login to View Your Profile</h2>
                <p>You need to be logged in to see your profile and order history.</p>
                <a href="/login/?returnUrl=/profile/" class="btn btn-primary">Login or Sign Up</a>
            </div>
        `;
        return;
    }

    profileContent.style.display = 'block';
    authGate.style.display = 'none';

    // Fetch the most up-to-date user info from localStorage
    const allUsers = getUsers();
    const currentUser = allUsers.find(u => u.email === currentUserSession.email);

    if (!currentUser) {
         // This case might happen if an admin deletes the user
        logoutUser();
        window.location.href = '/login/';
        return;
    }

    // Populate profile details
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-phone').textContent = currentUser.phone;

    // Populate orders (similar to orders.js)
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = allOrders.filter(order => order.customer.email === currentUser.email);

    if (userOrders.length === 0) {
        ordersListContainer.innerHTML = '<p>You have not placed any orders yet.</p>';
        return;
    }

    userOrders.reverse().forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        const statusClass = order.status.toLowerCase().replace(' ', '-');

        orderCard.innerHTML = `
            <div class="order-header">
                <h3>Order #${order.orderId.split('_')[1]}</h3>
                <span class="status-badge status-${statusClass}">${order.status}</span>
            </div>
            <div class="order-details">
                <div class="detail-item">
                    <strong>Date Placed</strong>
                    <p>${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div class="detail-item">
                    <strong>Plan Details</strong>
                    <p>
                        Plan: ${order.plan.name} (${order.plan.duration} Months)<br>
                        <strong>Total Paid: ₹${order.plan.total}</strong>
                    </p>
                </div>
                <div class="detail-item">
                    <strong>Payment ID</strong>
                    <p>${order.paymentId || 'N/A'}</p>
                </div>
            </div>
        `;
        ordersListContainer.appendChild(orderCard);
    });
});
