// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header-container').appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

    // Handle window resize to manage mobile menu
    window.addEventListener('resize', function() {
        const nav = document.querySelector('nav ul');
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });

    // Initialize with mobile menu hidden on small screens
    if (window.innerWidth <= 768) {
        document.querySelector('nav ul').style.display = 'none';
    }

    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }

    // Newsletter subscription form
    const newsletterForm = document.querySelector('.footer-col form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Add animation to service cards when they come into view
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.position = 'fixed';
            header.style.width = '100%';
            header.style.top = '0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            header.style.zIndex = '1000';
            document.body.style.paddingTop = header.offsetHeight + 'px';
        } else {
            header.style.position = 'relative';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            document.body.style.paddingTop = '0';
        }
    });

    // Current year in footer copyright
    const yearElement = document.querySelector('.copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});