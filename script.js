window.addEventListener('load', function() {
    if (!window.gsap) {
        console.error('GSAP failed to load from primary source. Attempting to load from alternate CDN...');
        // Attempt to load from alternate CDN
        loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js')
            .then(() => loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js'))
            .then(initializeAnimations)
            .catch(err => console.error('Failed to load GSAP:', err));
    } else {
        initializeAnimations();
    }
});

// Helper function to load scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Initialize all animations
function initializeAnimations() {
    if (!window.gsap) {
        console.error('GSAP is still not available after attempting all fallbacks');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initialize basic animations that don't depend on Smooth Scrollbar
    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel, i) => {
        gsap.set(panel, { zIndex: panels.length - i });
    });

    // Simple scroll-based animations without Smooth Scrollbar
    gsap.utils.toArray('.panel:not(.purple)').forEach((panel, i) => {
        gsap.to(panel, {
            scrollTrigger: {
                trigger: "section.black",
                start: `top -${window.innerHeight * (i + 0.5)}px`,
                end: `+=${window.innerHeight}`,
                scrub: true,
                markers: true
            },
            height: 0
        });
    });

    // Text animations
    const texts = gsap.utils.toArray('.panel-text');
    texts.forEach((text, i) => {
        gsap.set(text, { zIndex: texts.length - i });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "section.black",
                start: `top -${window.innerHeight * i}px`,
                end: `+=${window.innerHeight}`,
                scrub: true
            }
        })
        .to(text, { duration: 0.33, opacity: 1, y: "50%" })
        .to(text, { duration: 0.33, opacity: 0, y: "0%" }, 0.66);
    });

    // Main section pin
    ScrollTrigger.create({
        trigger: "section.black",
        start: "top top",
        end: `+=${(panels.length + 1) * window.innerHeight}px`,
        pin: true,
        scrub: true,
        markers: true
    });
}