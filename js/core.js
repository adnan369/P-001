document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUSTOM CURSOR TRACKING (Glow + Trail)
    const dot = document.querySelector('#cursor-dot');
    const outline = document.querySelector('#cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Instant dot movement
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Smooth outline lag (GSAP style)
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // 2. HOVER SCALE EFFECT (Cursor expands on links)
    const interactables = document.querySelectorAll('a, button, .glass-card, input');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(2)';
            outline.style.backgroundColor = 'rgba(0, 242, 254, 0.1)';
            outline.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.backgroundColor = 'transparent';
            outline.style.borderColor = 'rgba(0, 242, 254, 0.5)';
        });
    });

    // 3. SCROLL REVEAL ANIMATION (Cards fade-in on scroll)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. PARALLAX EFFECT ON MOUSE MOVE (Hero Section)
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const heroText = document.querySelector('h1');
        if(heroText) {
            heroText.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // 5. COUNTER STATS ANIMATION
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const updateCount = () => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText;
            const speed = 200; 
            const inc = target / speed;

            if (count < target) {
                stat.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                stat.innerText = target;
            }
        };
        
        // Trigger counter when in view
        const statObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) updateCount();
        });
        statObserver.observe(stat);
    });

});
