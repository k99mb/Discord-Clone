document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    const channels = document.querySelectorAll('.channel');
    const serverIcons = document.querySelectorAll('.server-icon');

    // Get user data from localStorage
    let currentUser;
    const storedUser = localStorage.getItem('discord_user');
    const loginPrompt = document.getElementById('login-prompt');
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        // Update UI with user info
        updateUserUI(currentUser);
    } else {
        // Show login prompt
        if (loginPrompt) {
            loginPrompt.style.display = 'flex';
        }
        return;
    }

    // Initialize the application
    initApp();

    function initApp() {
        // Set up event listeners
        messageInput.addEventListener('keypress', handleMessageSend);
        setupChannelSwitching();
        setupServerSwitching();

        // Simulate receiving messages
        simulateIncomingMessages();
    }

    function handleMessageSend(event) {
        if (event.key === 'Enter' && messageInput.value.trim() !== '') {
            const messageText = messageInput.value.trim();
            
            // Add the message to the chat
            addMessage({
                author: currentUser.name,
                text: messageText,
                avatar: currentUser.avatar,
                timestamp: new Date()
            });
            
            // Clear the input field
            messageInput.value = '';
            
            // Simulate a response after a short delay
            if (Math.random() > 0.5) {
                simulateResponse();
            }
        }
    }

    function addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        
        const formattedTime = formatTimestamp(message.timestamp);
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <img src="${message.avatar}" alt="User Avatar">
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${message.author}</span>
                    <span class="message-timestamp">${formattedTime}</span>
                </div>
                <div class="message-text">${message.text}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function formatTimestamp(date) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const isToday = date.getDate() === today.getDate() && 
                        date.getMonth() === today.getMonth() && 
                        date.getFullYear() === today.getFullYear();
        
        const isYesterday = date.getDate() === yesterday.getDate() && 
                           date.getMonth() === yesterday.getMonth() && 
                           date.getFullYear() === yesterday.getFullYear();
        
        let timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (isToday) {
            return `Today at ${timeString}`;
        } else if (isYesterday) {
            return `Yesterday at ${timeString}`;
        } else {
            return `${date.toLocaleDateString()} ${timeString}`;
        }
    }

    function simulateResponse() {
        const responses = [
            "That's interesting!",
            "I agree with you.",
            "What do you think about the new update?",
            "Has anyone tried the new game that was released yesterday?",
            "I'm looking forward to the weekend!",
            "Can someone help me with this coding problem?",
            "Did you see that announcement?"
        ];
        
        const randomUsers = [
            { name: 'JohnDoe', avatar: 'https://i.pravatar.cc/100?img=5' },
            { name: 'JaneSmith', avatar: 'https://i.pravatar.cc/100?img=7' },
            { name: 'GameMaster', avatar: 'https://i.pravatar.cc/100?img=10' },
            { name: 'CodeNinja', avatar: 'https://i.pravatar.cc/100?img=12' }
        ];
        
        const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Add a slight delay to make it feel more natural
        setTimeout(() => {
            addMessage({
                author: randomUser.name,
                text: randomResponse,
                avatar: randomUser.avatar,
                timestamp: new Date()
            });
        }, 1000 + Math.random() * 2000);
    }

    function simulateIncomingMessages() {
        const messages = [
            "Has anyone started working on the new project?",
            "I found this cool resource for learning JavaScript!",
            "The server was down for maintenance earlier, but it's back up now.",
            "Don't forget about the community event this weekend!"
        ];
        
        const randomUsers = [
            { name: 'JohnDoe', avatar: 'https://i.pravatar.cc/100?img=5' },
            { name: 'JaneSmith', avatar: 'https://i.pravatar.cc/100?img=7' },
            { name: 'GameMaster', avatar: 'https://i.pravatar.cc/100?img=10' },
            { name: 'CodeNinja', avatar: 'https://i.pravatar.cc/100?img=12' }
        ];
        
        // Simulate a new message every 30-60 seconds
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance of getting a message
                const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                
                addMessage({
                    author: randomUser.name,
                    text: randomMessage,
                    avatar: randomUser.avatar,
                    timestamp: new Date()
                });
            }
        }, 30000 + Math.random() * 30000);
    }

    function setupChannelSwitching() {
        channels.forEach(channel => {
            channel.addEventListener('click', () => {
                // Remove active class from all channels
                channels.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked channel
                channel.classList.add('active');
                
                // Update chat header
                const channelName = channel.querySelector('span').textContent;
                const chatHeaderLeft = document.querySelector('.chat-header-left span');
                chatHeaderLeft.textContent = channelName;
                
                // Update message input placeholder
                messageInput.placeholder = `Message #${channelName}`;
                
                // Clear chat messages and add channel-specific welcome message
                chatMessages.innerHTML = '';
                
                addMessage({
                    author: 'System',
                    text: `Welcome to #${channelName}! This is the start of the #${channelName} channel.`,
                    avatar: 'https://i.pravatar.cc/100?img=0',
                    timestamp: new Date()
                });
            });
        });
    }

    function setupServerSwitching() {
        serverIcons.forEach(server => {
            server.addEventListener('click', () => {
                // Remove active class from all servers
                serverIcons.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked server
                server.classList.add('active');
                
                // Update server header
                let serverName = 'Discord';
                
                if (server.querySelector('span')) {
                    serverName = server.querySelector('span').textContent;
                }
                
                const serverHeader = document.querySelector('.server-header h3');
                
                if (serverName === 'GC') {
                    serverHeader.textContent = 'Gaming Community';
                } else if (serverName === 'JS') {
                    serverHeader.textContent = 'JavaScript Developers';
                } else if (serverName === 'TS') {
                    serverHeader.textContent = 'TypeScript Enthusiasts';
                } else {
                    serverHeader.textContent = serverName;
                }
            });
        });
    }
});

// Function to update UI with user info
function updateUserUI(user) {
    // Update username and tag
    const usernameElement = document.querySelector('.username');
    const userTagElement = document.querySelector('.user-tag');
    
    if (usernameElement) {
        usernameElement.textContent = user.username || 'User';
    }
    
    if (userTagElement) {
        userTagElement.textContent = '#' + (user.tag || '0000');
    }
    
    // Update avatar
    const avatarImages = document.querySelectorAll('.user-avatar img');
    avatarImages.forEach(img => {
        if (img.alt === 'User Avatar') {
            img.src = user.avatar || 'https://i.pravatar.cc/100?img=3';
        }
    });
}

// Add modal functionality for user settings
document.addEventListener('DOMContentLoaded', () => {
    const settingsIcon = document.querySelector('.user-actions .fa-gear');
    
    if (settingsIcon) {
        // The settings icon now has an anchor tag parent that links to settings.html
        // No need to add a click handler here
    }
    
    // Add functionality for the add server button
    const addServerButton = document.querySelector('.add-server');
    
    if (addServerButton) {
        addServerButton.addEventListener('click', () => {
            alert('Add a server dialog would open here in a real Discord clone!');
        });
    }
    
    // Add functionality for the explore button
    const exploreButton = document.querySelector('.explore');
    
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            alert('Server discovery would open here in a real Discord clone!');
        });
    }
    
    // Add logout functionality
    const userInfo = document.querySelector('.user-info');
    
    if (userInfo) {
        // Create logout button
        const logoutButton = document.createElement('i');
        logoutButton.className = 'fa-solid fa-sign-out-alt';
        logoutButton.style.marginLeft = '8px';
        logoutButton.style.cursor = 'pointer';
        logoutButton.style.color = 'var(--muted-text)';
        
        // Add hover effect
        logoutButton.addEventListener('mouseenter', () => {
            logoutButton.style.color = 'var(--danger)';
        });
        
        logoutButton.addEventListener('mouseleave', () => {
            logoutButton.style.color = 'var(--muted-text)';
        });
        
        // Add click handler for logout
        logoutButton.addEventListener('click', () => {
            // Clear user data from localStorage
            localStorage.removeItem('discord_user');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
        
        // Add to user actions
        document.querySelector('.user-actions').appendChild(logoutButton);
    }
});