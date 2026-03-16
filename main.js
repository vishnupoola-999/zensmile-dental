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

    // 3. Nurse Assistant Conversational Logic
    const zenCursor = document.getElementById('zen-cursor');
    const zenBubble = document.getElementById('zen-bubble');
    
    const messages = [
        "Hi! I'm Nurse Sarah. Need help booking an appointment?",
        "We have slots available this evening. Would you like to reserve one?",
        "You can also call us directly at Apollo Bandar. Shall I show you the number?",
        "Our specialists are MDS experts in Orthodontics and Implants!",
        "Feel free to ask me anything about our services!"
    ];
    let msgIndex = 0;
    let isTyping = false;

    if (zenCursor && zenBubble) {
        zenCursor.addEventListener('click', () => {
            if (isTyping) return;

            isTyping = true;
            zenBubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
            zenBubble.classList.add('active');

            setTimeout(() => {
                zenBubble.textContent = messages[msgIndex];
                msgIndex = (msgIndex + 1) % messages.length;
                isTyping = false;
                
                // Keep the bubble visible longer for reading
                setTimeout(() => {
                    if (!isTyping) zenBubble.classList.remove('active');
                }, 5000);
            }, 1000);
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
