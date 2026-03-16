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

    // 3. Nurse Sarah 2-Way Chat Logic
    const zenCursor = document.getElementById('zen-cursor');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatHistory = document.getElementById('chat-history');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    const responses = {
        "appointment": "You can book an appointment by going to our Appointment page or calling us at +91 00000 00000.",
        "booking": "Would you like me to show you our available slots for today?",
        "service": "We offer Cosmetic Dentistry, Implants, and Braces. Which one are you interested in?",
        "price": "Our checkups start from ₹500. Specific treatment costs depend on the diagnosis.",
        "location": "Our clinic is located at Shop No. 9, Beside Jain Temple, Apollo Bandar, Colaba.",
        "hours": "We are open every day from 10:00 AM to 10:00 PM.",
        "default": "That's interesting! Would you like to speak with one of our specialists?"
    };

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg msg-${sender}`;
        msgDiv.textContent = text;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function botReply(text) {
        setTimeout(() => {
            addMessage(text, 'bot');
        }, 800);
    }

    if (zenCursor && chatWindow) {
        zenCursor.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        function sendMessage() {
            const text = chatInput.value.trim().toLowerCase();
            if (!text) return;

            addMessage(chatInput.value.trim(), 'user');
            chatInput.value = '';

            // Simple keyword matching
            let found = false;
            for (let key in responses) {
                if (text.includes(key)) {
                    botReply(responses[key]);
                    found = true;
                    break;
                }
            }
            if (!found) botReply(responses.default);
        }
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
