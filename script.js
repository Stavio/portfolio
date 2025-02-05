// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// GSAP Animation for h2 elements
function initializeGSAPAnimations() {
    // Select all h2 elements
    const headings = document.querySelectorAll('h2');


    // Create animation for each heading
    headings.forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".portfolio").forEach(image => {
        gsap.from(image, {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: image,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },

        });
    });
}

// Initialize animations after page load
window.addEventListener('load', initializeGSAPAnimations);

// Mobile menu toggle with animation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll event for navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});