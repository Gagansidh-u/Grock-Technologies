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

    const durationBtns = document.querySelectorAll('.duration-btn');
    const checkoutBtns = document.querySelectorAll('.checkout-btn');

    // Plan Duration Logic
    durationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const duration = this.dataset.duration;
            
            durationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const isMonthly = duration === 'monthly';
            
            document.querySelectorAll('.monthly-price, .monthly-period, .monthly-original').forEach(el => el.style.display = isMonthly ? 'inline' : 'none');
            document.querySelectorAll('.yearly-price, .yearly-period, .yearly-original').forEach(el => el.style.display = isMonthly ? 'none' : 'inline');
        });
    });

    // Initialize pricing display to monthly
    if (document.querySelector('.duration-btn[data-duration="monthly"]')) {
        document.querySelector('.duration-btn[data-duration="monthly"]').click();
    }

    // Checkout Button Logic
    checkoutBtns.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.dataset.planName;
            const isDesignAddon = card.querySelector('.design-addon')?.checked || false;
            const activeDurationBtn = document.querySelector('.duration-btn.active');
            let activeDuration = 'one-time';
            let price = card.dataset.monthlyPrice; // Default to one-time price for custom plan

            if (activeDurationBtn) {
                activeDuration = activeDurationBtn.dataset.duration;
                price = card.dataset[`${activeDuration}Price`];
            }
            
            const period = activeDuration;

            const params = new URLSearchParams({
                plan: planName,
                price: price,
                period: period,
                design: isDesignAddon
            });

            window.location.href = `checkout.html?${params.toString()}`;
        });
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

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

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .contact-item, .about-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (navMenu && !event.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
});
