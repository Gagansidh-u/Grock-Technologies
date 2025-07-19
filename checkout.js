document.addEventListener('DOMContentLoaded', () => {
    const checkoutContent = document.getElementById('checkout-content');
    const authGate = document.getElementById('auth-gate');
    const currentUser = getCurrentUser();

    if (!currentUser) {
        authGate.innerHTML = `
            <div class="auth-gate-content">
                <h2>Please Login to Continue</h2>
                <p>You need to be logged in to complete your purchase.</p>
                <a href="/login/?returnUrl=${encodeURIComponent(window.location.href)}" class="btn btn-primary">Login or Sign Up</a>
            </div>
        `;
        return;
    }

    checkoutContent.style.display = 'block';

    // Pre-fill user details
    document.getElementById('name').value = currentUser.name;
    document.getElementById('email').value = currentUser.email;
    document.getElementById('phone').value = currentUser.phone;
    
    const params = new URLSearchParams(window.location.search);
    const planName = params.get('plan') || 'N/A';
    const duration = parseInt(params.get('duration') || '0');
    const basePrice = parseInt(params.get('price') || '0');
    const designPrice = parseInt(params.get('designPrice') || '0');
    const savings = parseInt(params.get('savings') || '0');
    const total = parseInt(params.get('total') || '0');

    // Populate summary
    document.getElementById('summary-plan-name').textContent = planName;
    document.getElementById('summary-plan-duration').textContent = `${duration} Months`;
    document.getElementById('summary-base-price').textContent = `₹${basePrice}`;
    document.getElementById('summary-design-price').textContent = `₹${designPrice}`;
    document.getElementById('summary-total-price').textContent = `₹${total}`;

    if (savings > 0) {
        document.getElementById('savings-summary').style.display = 'flex';
        document.getElementById('summary-savings').textContent = `₹${savings.toFixed(2)}`;
    }

    const payBtn = document.getElementById('pay-now-btn');
    payBtn.addEventListener('click', () => {
        const form = document.getElementById('customer-details-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const websiteType = document.getElementById('website-type').value;
        const designStyle = document.getElementById('design-style').value;
        const featuresNeeded = document.getElementById('features-needed').value;
        
        const finalAmount = total;

        const orderDetails = {
            orderId: `order_${Date.now()}`,
            date: new Date().toLocaleString(),
            status: 'Pending',
            paymentId: null, // To be filled on success
            customer: { name, email, phone },
            plan: {
                name: planName,
                duration: duration,
                hostingCost: basePrice,
                designCost: designPrice,
                total: finalAmount
            },
            project: { websiteType, designStyle, featuresNeeded }
        };

        const options = {
            "key": "rzp_live_udvZnCQS9GpgO3",
            "amount": finalAmount * 100,
            "currency": "INR",
            "name": "Grock Technologies",
            "description": `Payment for ${planName}`,
            "handler": function (response){
                orderDetails.paymentId = response.razorpay_payment_id;
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(orderDetails);
                localStorage.setItem('orders', JSON.stringify(orders));
                window.location.href = '/payment-successful/';
            },
            "prefill": {
                "name": name,
                "email": email,
                "contact": phone
            },
            "notes": {
                "internal_order_id": orderDetails.orderId,
                "customer_name": name,
                "plan": planName
            },
            "theme": {
                "color": "#6366f1"
            },
            "modal": {
                "ondismiss": function() {
                    console.log('Checkout form closed by user.');
                    alert('Payment was not completed. Your order has not been placed.');
                }
            }
        };

        try {
            const rzp1 = new Razorpay(options);
            
            rzp1.on('payment.failed', function (response) {
                console.error('Payment Failed:', response);
                alert(`Payment failed. Error: ${response.error.description}. Please try again or contact support.`);
            });

            rzp1.open();
        } catch (error) {
            console.error("Error initializing Razorpay:", error);
            alert("Could not initialize payment gateway. Please check your connection or contact support.");
        }
    });
});
