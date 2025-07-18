document.addEventListener('DOMContentLoaded', () => {
    const ordersContent = document.getElementById('orders-content');
    const authGate = document.getElementById('auth-gate');
    const ordersListContainer = document.getElementById('orders-list');
    const currentUser = getCurrentUser();

    if (!currentUser) {
        ordersContent.style.display = 'none';
        authGate.innerHTML = `
            <div class="auth-gate-content">
                <h2>Please Login to View Your Orders</h2>
                <p>You need to be logged in to see your order history.</p>
                <a href="/login/?returnUrl=/orders/" class="btn btn-primary">Login or Sign Up</a>
            </div>
        `;
        return;
    }

    ordersContent.style.display = 'block';
    authGate.style.display = 'none';

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
                        Plan: ${order.plan.name} (${order.plan.duration} Months)<br>
                        Hosting Cost: ₹${order.plan.hostingCost}<br>
                        Design Cost: ₹${order.plan.designCost}<br>
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
        ordersListContainer.appendChild(orderCard);
    });
});
