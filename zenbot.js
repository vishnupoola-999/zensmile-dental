document.addEventListener('DOMContentLoaded', () => {
    // Inject Robot HTML to every page if not present
    if (!document.getElementById('zenbot-window')) {
        const botHTML = `
        <div id="zenbot-window" class="zenbot-window">
            <div class="zenbot-header">
                <i class="fas fa-robot" style="font-size: 1.5rem;"></i>
                <div>
                    <h3>ZenBot</h3>
                    <p style="font-size: 0.8rem; opacity: 0.8;">Dental Assistant</p>
                </div>
                <i class="fas fa-times" id="close-bot" style="margin-left: auto; cursor: pointer;"></i>
            </div>
            <div id="zenbot-messages" class="zenbot-messages">
                <div class="msg msg-bot">Hi, I’m ZenBot from ZenSmile Dental Clinic. How can I help you today?</div>
            </div>
            <div class="zenbot-input">
                <input type="text" id="bot-input-field" placeholder="Type your message...">
                <button id="send-bot-msg"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <div id="zenbot-trigger" class="zenbot-bubble">
            <i class="fas fa-comments"></i>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', botHTML);
    }

    const botWindow = document.getElementById('zenbot-window');
    const botTrigger = document.getElementById('zenbot-trigger');
    const closeBot = document.getElementById('close-bot');
    const sendBtn = document.getElementById('send-bot-msg');
    const inputField = document.getElementById('bot-input-field');
    const messageContainer = document.getElementById('zenbot-messages');

    botTrigger.addEventListener('click', () => {
        botWindow.style.display = botWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    closeBot.addEventListener('click', () => {
        botWindow.style.display = 'none';
    });

    function addMessage(text, side) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg msg-${side}`;
        msgDiv.textContent = text;
        messageContainer.appendChild(msgDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    function handleBotResponse(text) {
        const input = text.toLowerCase();
        let response = "I'm sorry, I didn't quite catch that. Would you like to book an appointment or learn about our services?";

        if (input.includes('hi') || input.includes('hello')) {
            response = "Hello! Looking to brighten your smile? I can help you choose a treatment or book an appointment.";
        } else if (input.includes('appointment') || input.includes('book')) {
            response = "Great! Please provide your name and phone number, and our team in Colaba will contact you shortly to confirm.";
        } else if (input.includes('price') || input.includes('cost')) {
            response = "Prices vary by treatment. Routine check-ups start at a basic range, while implants and orthodontics are customized. Would you like a consultation?";
        } else if (input.includes('location') || input.includes('where')) {
            response = "We are located at Shop No. 9, Beside Jain Temple, Apollo Bandar, Colaba, Mumbai 400005.";
        } else if (input.includes('hours') || input.includes('time')) {
            response = "We are open from 10:00 AM to 10:00 PM every day.";
        }

        setTimeout(() => addMessage(response, 'bot'), 600);
    }

    sendBtn.addEventListener('click', () => {
        const val = inputField.value.trim();
        if (val) {
            addMessage(val, 'user');
            inputField.value = '';
            handleBotResponse(val);
        }
    });

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });
});
