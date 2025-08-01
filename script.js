// Mobile Navigation Toggle 
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && !link.parentElement.classList.contains('dropdown')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for anchor links on the same page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Logic for Pricing Page
document.addEventListener('DOMContentLoaded', function() {
    const pricingPage = document.querySelector('.pricing.page-section');
    if (!pricingPage) return;

    const designFee = 2999;

    const calculatePrice = (card) => {
        const baseMonthlyPrice = parseFloat(card.dataset.monthlyPrice);
        const durationSelect = card.querySelector('.duration-select');
        const selectedOption = durationSelect.options[durationSelect.selectedIndex];
        
        const duration = parseInt(selectedOption.value);
        const discountPercent = parseFloat(selectedOption.dataset.discount);

        const discountedMonthlyPrice = baseMonthlyPrice * (1 - discountPercent / 100);
        const totalHostingCost = discountedMonthlyPrice * duration;
        const originalTotalHostingCost = baseMonthlyPrice * duration;
        const savings = originalTotalHostingCost - totalHostingCost;
        const finalTotal = totalHostingCost + designFee;

        const totalAmountEl = card.querySelector('.total-amount');
        const savingsTextEl = card.querySelector('.savings-text');

        totalAmountEl.textContent = `₹${finalTotal.toFixed(2)}`;
        if (savings > 0) {
            savingsTextEl.innerHTML = `Includes ₹${designFee} design fee.<br>You save ₹${savings.toFixed(2)} on hosting!`;
            savingsTextEl.style.color = '#10b981';
        } else {
            savingsTextEl.innerHTML = `Includes ₹${designFee} design fee.`;
            savingsTextEl.style.color = '#64748b';
        }
    };

    document.querySelectorAll('.pricing-card:not(.custom)').forEach(card => {
        const durationSelect = card.querySelector('.duration-select');
        durationSelect.addEventListener('change', () => calculatePrice(card));
        calculatePrice(card); // Initial calculation
    });

    // Checkout Button Logic
    document.querySelectorAll('.checkout-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.dataset.planName;
            
            let params;

            if (card.classList.contains('custom')) {
                 params = new URLSearchParams({
                    plan: planName,
                    duration: 1,
                    price: 0,
                    designPrice: 3999,
                    savings: 0,
                    total: 3999
                });
            } else {
                const baseMonthlyPrice = parseFloat(card.dataset.monthlyPrice);
                const durationSelect = card.querySelector('.duration-select');
                const selectedOption = durationSelect.options[durationSelect.selectedIndex];
                
                const duration = parseInt(selectedOption.value);
                const discountPercent = parseFloat(selectedOption.dataset.discount);

                const discountedMonthlyPrice = baseMonthlyPrice * (1 - discountPercent / 100);
                const totalHostingCost = discountedMonthlyPrice * duration;
                const originalTotalHostingCost = baseMonthlyPrice * duration;
                const savings = originalTotalHostingCost - totalHostingCost;
                const finalTotal = totalHostingCost + designFee;
                
                params = new URLSearchParams({
                    plan: planName,
                    duration: duration,
                    price: totalHostingCost.toFixed(0),
                    designPrice: designFee,
                    savings: savings.toFixed(0),
                    total: finalTotal.toFixed(0)
                });
            }

            window.location.href = `/checkout/?${params.toString()}`;
        });
    });
});


// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    // Import Firebase service for contact form
    import('./firebase-service.js').then(({ saveEmail }) => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const message = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    date: new Date().toISOString(),
                    read: false
                };

                try {
                    // Save to Firebase
                    await saveEmail(message);
                    
                    // Also save to localStorage for backward compatibility
                    let emails = JSON.parse(localStorage.getItem('grock_emails')) || [];
                    emails.unshift({ ...message, id: `msg_${Date.now()}` });
                    localStorage.setItem('grock_emails', JSON.stringify(emails));

                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } catch (error) {
                    console.error('Error sending message:', error);
                    alert('There was an error sending your message. Please try again.');
                }
            });
        }
    }).catch(error => {
        console.error('Error loading Firebase service:', error);
        // Fallback to localStorage only
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const message = {
                    id: `msg_${Date.now()}`,
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    date: new Date().toISOString(),
                    read: false
                };

                let emails = JSON.parse(localStorage.getItem('grock_emails')) || [];
                emails.unshift(message); // Add to the beginning of the array
                localStorage.setItem('grock_emails', JSON.stringify(emails));

                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        }
    });
});
