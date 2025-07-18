document.addEventListener('DOMContentLoaded', () => {
    const ordersListContainer = document.getElementById('orders-list');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        ordersListContainer.innerHTML = '<p>No orders have been placed yet.</p>';
        return;
    }

    orders.reverse().forEach(order => {
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
        ordersListContainer.appendChild(orderCard);
    });
});
