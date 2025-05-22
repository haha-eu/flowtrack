document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth scrolling for navigation links ---
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Adjust for fixed navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Optional: Close mobile menu if open
            }
        });
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section[id]');
    const headerNavLinks = document.querySelectorAll('header nav a');

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // 100 is offset

        headerNavLinks.forEach((link) => link.classList.remove('active'));
        if (headerNavLinks[index]) {
            headerNavLinks[index].classList.add('active');
        }
    }
    changeLinkState(); // Initial check
    window.addEventListener('scroll', changeLinkState);


    // --- Simple Fade-in Animation on Scroll ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // --- Update Copyright Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Sticky Navbar (already handled by position:fixed, but can add class on scroll for more effects) ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // Add styling for .navbar.scrolled if needed
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Feather Icons ---
    // This is usually called directly in HTML after script include,
    // but if you need to re-call it after dynamic content:
    // if (typeof feather !== 'undefined') {
    //     feather.replace();
    // }

    // --- Basic Form Submission Placeholder ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you'd gather form data and send it via AJAX/Fetch
            alert('Thank you for your message! We will get back to you soon.');
            this.reset(); // Clear the form
        });
    }

    // Add any other interactive elements here
    // e.g., testimonial sliders, pricing plan toggles, etc.

    console.log("FlowTrack Landing Page Script Initialized!");
});