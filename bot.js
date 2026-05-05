// HutBot AI Assistant Logic

document.addEventListener('DOMContentLoaded', () => {
    const chatTrigger = document.getElementById('chat-trigger');
    const chatWindow = document.getElementById('chat-window');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    // Toggle chat window
    chatTrigger.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    // Send message on click
    chatSend.addEventListener('click', () => {
        handleUserInput();
    });

    // Send message on Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        // Generate Bot Response
        setTimeout(() => {
            const response = generateResponse(text);
            addMessage(response, 'bot');
        }, 600);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Exported for global access (from quick reply buttons)
    window.sendQuickReply = (text) => {
        if (!chatWindow.classList.contains('active')) {
            chatWindow.classList.add('active');
        }
        addMessage(text, 'user');
        setTimeout(() => {
            const response = generateResponse(text);
            addMessage(response, 'bot');
        }, 600);
    };

    function generateResponse(input) {
        const text = input.toLowerCase();
        
        // --- Order Suggestions ---
        if (text.includes('suggest') || text.includes('recommend') || text.includes('aaj kya') || text.includes('khana')) {
            const options = [
                "If you're feeling extra hungry, I highly recommend our **Royal Classic**. It's got double Wagyu beef and aged cheddar! 🍔",
                "Feeling spicy? The **Blazing Soul** with buttermilk fried chicken and jalapeño slaw is a fan favorite! 🔥",
                "Trying to stay healthy but delicious? Go for the **Green Earth**. The grilled halloumi and avocado mash are perfection! 🥑"
            ];
            return options[Math.floor(Math.random() * options.length)];
        }

        // --- How to Order ---
        if (text.includes('how to order') || text.includes('order kese') || text.includes('order kaise')) {
            return "Ordering is super easy! <br><br>1. Browse our **Menu**.<br>2. Click the **'+' icon** on the burger you crave.<br>3. Your order is instantly sent to our kitchen team (via our Admin Panel)!<br><br>Want me to suggest something to start with?";
        }

        // --- Reviews ---
        if (text.includes('review') || text.includes('feedback') || text.includes('complaint')) {
            return "We value your feedback! You can leave a review right here. Just type: <br><br>**REVIEW: Your awesome message**<br><br>I'll make sure the owner sees it! ⭐";
        }

        if (text.startsWith('review:')) {
            const reviewText = input.substring(7).trim();
            saveReview(reviewText);
            return "Thank you so much! I've saved your review for our owner. We thrive on making you happy! ❤️";
        }

        // --- Greetings ---
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            return "Hello! I'm **HutBot**. How can I make your day more burger-licious?";
        }

        if (text.includes('price') || text.includes('cost')) {
            return "Our gourmet burgers range from **$12.99 to $14.99**. Each one is crafted with premium ingredients and a lot of love! Check the menu section for exact details.";
        }

        // Default
        return "That sounds interesting! But did you know I'm an expert in burgers? Ask me for a **suggestion**, **how to order**, or leave a **review**!";
    }

    function saveReview(text) {
        const reviews = JSON.parse(localStorage.getItem('burgerHutReviews') || '[]');
        reviews.push({
            id: Date.now(),
            text: text,
            time: new Date().toLocaleString()
        });
        localStorage.setItem('burgerHutReviews', JSON.stringify(reviews));
    }
});
