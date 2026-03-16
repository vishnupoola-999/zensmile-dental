document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress';
    document.body.appendChild(progressContainer);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressContainer.style.width = scrolled + "%";
    });

    // 2. Mobile Nav Horizontal Handling
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // Horizontal scroll is handled by CSS, but we can add active class logic
        navLinks.querySelectorAll('a').forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        });
    }

    // 3. ZenCursor "Shining" Answers
    const zenCursor = document.getElementById('zen-cursor');
    const zenBubble = document.getElementById('zen-bubble');
    const answers = [
        "Need a dentist? Book online!",
        "Specialists in South Mumbai at your service.",
        "We're open 10 AM to 10 PM daily.",
        "Have any dental pain? Call us now!",
        "Check out our smile gallery!"
    ];
    let answerIndex = 0;

    if (zenCursor && zenBubble) {
        zenCursor.addEventListener('click', () => {
            zenBubble.textContent = answers[answerIndex];
            zenBubble.classList.add('active');
            answerIndex = (answerIndex + 1) % answers.length;
            
            setTimeout(() => {
                zenBubble.classList.remove('active');
            }, 3000);
        });
    }

    // 3. Reveal on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. Preloader Handling
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.remove('loading');
                }, 600);
            }, 800);
        });
    }
});
