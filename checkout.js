document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const planName = params.get('plan') || 'N/A';
    const basePrice = parseInt(params.get('price') || '0');
    const period = params.get('period') || '';
    const hasDesignAddon = params.get('design') === 'true';

    const designAddonPrice = 2999;
    const paymentSetupAddonPrice = 299;

    let totalPrice = basePrice;

    // Populate summary
    document.getElementById('summary-plan-name').textContent = `${planName} (${period})`;
    document.getElementById('summary-base-price').textContent = `₹${basePrice}`;
    
    const designAddonSummary = document.getElementById('design-addon-summary');
    if (hasDesignAddon) {
        totalPrice += designAddonPrice;
        document.getElementById('summary-design-price').textContent = `₹${designAddonPrice}`;
        designAddonSummary.style.display = 'flex';
    }

    const paymentSetupCheckbox = document.getElementById('payment-setup-addon');
    const totalAmountEl = document.getElementById('summary-total-price');

    const updateTotal = () => {
        let currentTotal = basePrice + (hasDesignAddon ? designAddonPrice : 0);
        if (paymentSetupCheckbox.checked) {
            currentTotal += paymentSetupAddonPrice;
        }
        totalAmountEl.textContent = `₹${currentTotal}`;
        return currentTotal;
    };

    paymentSetupCheckbox.addEventListener('change', updateTotal);
    totalAmountEl.textContent = `₹${updateTotal()}`;

    // Handle payment
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
        const paymentSetup = paymentSetupCheckbox.checked;
        
        const finalAmount = updateTotal();

        // Save order to localStorage
        const orderDetails = {
            orderId: `order_${Date.now()}`,
            date: new Date().toLocaleString(),
            status: 'Pending', // Default status
            customer: { name, email, phone },
            plan: {
                name: planName,
                period: period,
                basePrice: basePrice,
                hasDesignAddon: hasDesignAddon,
                hasPaymentSetup: paymentSetup,
                total: finalAmount
            },
            project: { websiteType, designStyle, featuresNeeded }
        };

        // Razorpay Integration
        const options = {
            "key": "rzp_live_udvZnCQS9Gpg03", // Your live key. The secret key is NOT used in frontend code.
            "amount": finalAmount * 100, // Amount in the smallest currency unit (paise)
            "currency": "INR",
            "name": "Grock Technologies",
            "description": `Payment for ${planName}`,
            "handler": function (response){
                // On successful payment, save the order and redirect
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(orderDetails);
                localStorage.setItem('orders', JSON.stringify(orders));
                window.location.href = 'payment-successful.html';
            },
            "prefill": {
                "name": name,
                "email": email,
                "contact": phone
            },
            "theme": {
                "color": "#6366f1"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    });
});
