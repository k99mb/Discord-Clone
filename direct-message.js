document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('userData'));
    const loginPrompt = document.getElementById('login-prompt');
    
    if (!userData) {
        // Show login prompt if user is not logged in
        loginPrompt.style.display = 'flex';
        document.querySelector('.app-container').style.display = 'none';
    } else {
        // Update UI with user data
        updateUserUI(userData);
        setupDirectMessagePage();
    }
    
    // Setup direct message page functionality
    function setupDirectMessagePage() {
        const messageInput = document.getElementById('message-input');
        const chatMessages = document.getElementById('chat-messages');
        const dmItems = document.querySelectorAll('.dm-item');
        
        // Handle message sending
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && messageInput.value.trim() !== '') {
                sendMessage(messageInput.value.trim());
                messageInput.value = '';
            }
        });
        
        // Handle DM item selection
        dmItems.forEach(item => {
            item.addEventListener('click', function() {
                dmItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Update chat header with selected user
                const userName = item.querySelector('.dm-name').textContent;
                const userAvatar = item.querySelector('.dm-avatar img').src;
                const userStatus = item.querySelector('.status-indicator').classList.contains('online') ? 'online' : 
                                   item.querySelector('.status-indicator').classList.contains('idle') ? 'idle' : 'offline';
                
                updateChatHeader(userName, userAvatar, userStatus);
                updateProfileSidebar(userName, userAvatar, userStatus);
                updateMessageInput(userName);
                
                // Clear chat and load conversation
                clearChat();
                loadConversation(userName);
            });
        });
        
        // Initialize with the first DM selected
        if (dmItems.length > 0 && dmItems[0].classList.contains('active')) {
            const userName = dmItems[0].querySelector('.dm-name').textContent;
            const userAvatar = dmItems[0].querySelector('.dm-avatar img').src;
            const userStatus = dmItems[0].querySelector('.status-indicator').classList.contains('online') ? 'online' : 
                               dmItems[0].querySelector('.status-indicator').classList.contains('idle') ? 'idle' : 'offline';
            
            updateChatHeader(userName, userAvatar, userStatus);
            updateProfileSidebar(userName, userAvatar, userStatus);
            updateMessageInput(userName);
            loadConversation(userName);
        }
        
        // Setup tab switching
        const dmTabs = document.querySelectorAll('.dm-tab');
        dmTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                dmTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabName = tab.querySelector('span').textContent;
                if (tabName !== 'Friends') {
                    alert(`${tabName} tab is not implemented in this demo.`);
                    // Reset to Friends tab
                    dmTabs.forEach(t => {
                        if (t.querySelector('span').textContent === 'Friends') {
                            t.classList.add('active');
                        } else {
                            t.classList.remove('active');
                        }
                    });
                }
            });
        });
        
        // Setup emoji, gif, and sticker buttons
        const emojiButton = document.querySelector('.emoji-button');
        const gifButton = document.querySelector('.gif-button');
        const stickerButton = document.querySelector('.sticker-button');
        const uploadButton = document.querySelector('.upload-button');
        
        emojiButton.addEventListener('click', function() {
            alert('Emoji picker is not implemented in this demo.');
        });
        
        gifButton.addEventListener('click', function() {
            alert('GIF picker is not implemented in this demo.');
        });
        
        stickerButton.addEventListener('click', function() {
            alert('Sticker picker is not implemented in this demo.');
        });
        
        uploadButton.addEventListener('click', function() {
            alert('File upload is not implemented in this demo.');
        });
        
        // Setup profile action buttons
        const profileActionButtons = document.querySelectorAll('.profile-action-button');
        profileActionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = button.querySelector('span').textContent;
                alert(`${action} action is not implemented in this demo.`);
            });
        });
        
        // Setup profile note
        const profileNote = document.querySelector('.profile-note');
        profileNote.addEventListener('change', function() {
            alert('Note saving is not implemented in this demo.');
        });
    }
    
    // Send a message
    function sendMessage(text) {
        const chatMessages = document.getElementById('chat-messages');
        const userData = JSON.parse(localStorage.getItem('userData'));
        const timestamp = formatTimestamp(new Date());
        
        const messageHTML = `
            <div class="message">
                <div class="message-avatar">
                    <img src="${userData.avatar || 'https://i.pravatar.cc/100?img=3'}" alt="User Avatar">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">You</span>
                        <span class="message-timestamp">${timestamp}</span>
                    </div>
                    <div class="message-text">${text}</div>
                </div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate response after a delay
        setTimeout(() => {
            simulateResponse();
        }, Math.random() * 2000 + 1000);
    }
    
    // Simulate a response from the other user
    function simulateResponse() {
        const chatMessages = document.getElementById('chat-messages');
        const activeDM = document.querySelector('.dm-item.active');
        
        if (!activeDM) return;
        
        const userName = activeDM.querySelector('.dm-name').textContent;
        const userAvatar = activeDM.querySelector('.dm-avatar img').src;
        const timestamp = formatTimestamp(new Date());
        
        const responses = [
            "That's interesting!",
            "I see what you mean.",
            "Thanks for letting me know.",
            "What do you think about the project deadline?",
            "Did you see the latest update?",
            "I'll get back to you on that soon.",
            "Let's discuss this in our next meeting.",
            "I agree with your approach.",
            "Can you share more details?",
            "That sounds like a good plan."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const messageHTML = `
            <div class="message">
                <div class="message-avatar">
                    <img src="${userAvatar}" alt="User Avatar">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${userName}</span>
                        <span class="message-timestamp">${timestamp}</span>
                    </div>
                    <div class="message-text">${randomResponse}</div>
                </div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Format timestamp
    function formatTimestamp(date) {
        const today = new Date();
        const isToday = date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();
        
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        
        return `Today at ${formattedHours}:${minutes} ${ampm}`;
    }
    
    // Update chat header with selected user
    function updateChatHeader(userName, userAvatar, userStatus) {
        const chatHeaderLeft = document.querySelector('.chat-header-left');
        chatHeaderLeft.innerHTML = `
            <div class="dm-avatar-small">
                <img src="${userAvatar}" alt="User Avatar">
                <div class="status-indicator ${userStatus}"></div>
            </div>
            <span>${userName}</span>
        `;
    }
    
    // Update profile sidebar with selected user
    function updateProfileSidebar(userName, userAvatar, userStatus) {
        const profileAvatar = document.querySelector('.profile-avatar img');
        const profileUsername = document.querySelector('.profile-username');
        const profileStatusIndicator = document.querySelector('.profile-avatar .status-indicator');
        
        profileAvatar.src = userAvatar;
        profileUsername.textContent = userName;
        
        // Remove all status classes and add the current one
        profileStatusIndicator.classList.remove('online', 'idle', 'offline');
        profileStatusIndicator.classList.add(userStatus);
    }
    
    // Update message input placeholder
    function updateMessageInput(userName) {
        const messageInput = document.getElementById('message-input');
        messageInput.placeholder = `Message @${userName}`;
    }
    
    // Clear chat messages
    function clearChat() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML = `
            <div class="message-group">
                <div class="message-day-divider">
                    <span>Today</span>
                </div>
            </div>
        `;
    }
    
    // Load conversation with selected user
    function loadConversation(userName) {
        const chatMessages = document.getElementById('chat-messages');
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        // Sample conversations for each user
        const conversations = {
            'JohnDoe': [
                { sender: 'JohnDoe', text: "Hey there! How's it going?", time: '10:30 AM', avatar: 'https://i.pravatar.cc/100?img=5' },
                { sender: 'You', text: "Hi! I'm doing well, thanks for asking. How about you?", time: '10:32 AM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' },
                { sender: 'JohnDoe', text: "I'm good! Just working on that project we discussed last week.", time: '10:35 AM', avatar: 'https://i.pravatar.cc/100?img=5' },
                { sender: 'JohnDoe', text: "Have you had a chance to look at the design mockups I sent?", time: '10:36 AM', avatar: 'https://i.pravatar.cc/100?img=5' },
                { sender: 'You', text: "Yes, I did! They look great. I especially like the color scheme you chose.", time: '10:40 AM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' }
            ],
            'JaneSmith': [
                { sender: 'JaneSmith', text: "Hi there! Are you available for a quick chat?", time: '9:15 AM', avatar: 'https://i.pravatar.cc/100?img=7' },
                { sender: 'You', text: "Sure, what's up?", time: '9:20 AM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' },
                { sender: 'JaneSmith', text: "I wanted to discuss the upcoming team meeting agenda.", time: '9:22 AM', avatar: 'https://i.pravatar.cc/100?img=7' },
                { sender: 'You', text: "Sounds good. What topics should we cover?", time: '9:25 AM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' }
            ],
            'GameMaster': [
                { sender: 'GameMaster', text: "Hey! Are you joining the game tonight?", time: '2:45 PM', avatar: 'https://i.pravatar.cc/100?img=10' },
                { sender: 'You', text: "Definitely! What time are we starting?", time: '3:00 PM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' },
                { sender: 'GameMaster', text: "8 PM as usual. We're trying that new dungeon.", time: '3:05 PM', avatar: 'https://i.pravatar.cc/100?img=10' },
                { sender: 'You', text: "Perfect, I'll be there. Should I bring my healer or tank?", time: '3:10 PM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' },
                { sender: 'GameMaster', text: "Bring your healer, we're short on support this time.", time: '3:12 PM', avatar: 'https://i.pravatar.cc/100?img=10' }
            ],
            'CodeNinja': [
                { sender: 'CodeNinja', text: "Have you seen the new JavaScript framework that just launched?", time: '11:20 AM', avatar: 'https://i.pravatar.cc/100?img=12' },
                { sender: 'You', text: "Not yet. Is it worth checking out?", time: '11:30 AM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' },
                { sender: 'CodeNinja', text: "Definitely! It's solving a lot of the pain points we've been dealing with.", time: '11:35 AM', avatar: 'https://i.pravatar.cc/100?img=12' }
            ],
            'AlexTech': [
                { sender: 'You', text: "Hey Alex, do you have time to review my pull request today?", time: '1:15 PM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' },
                { sender: 'AlexTech', text: "Sure thing. I'll take a look after lunch.", time: '1:20 PM', avatar: 'https://i.pravatar.cc/100?img=15' },
                { sender: 'You', text: "Thanks! I'm particularly interested in your thoughts on the authentication flow.", time: '1:22 PM', avatar: userData.avatar || 'https://i.pravatar.cc/100?img=3' },
                { sender: 'AlexTech', text: "Will do. I've been working on something similar recently.", time: '1:25 PM', avatar: 'https://i.pravatar.cc/100?img=15' }
            ]
        };
        
        // Get conversation for selected user or use empty array if none exists
        const conversation = conversations[userName] || [];
        
        // Add messages to chat
        conversation.forEach(message => {
            const messageHTML = `
                <div class="message">
                    <div class="message-avatar">
                        <img src="${message.avatar}" alt="User Avatar">
                    </div>
                    <div class="message-content">
                        <div class="message-header">
                            <span class="message-author">${message.sender}</span>
                            <span class="message-timestamp">Today at ${message.time}</span>
                        </div>
                        <div class="message-text">${message.text}</div>
                    </div>
                </div>
            `;
            
            chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Update user interface with user data
    function updateUserUI(userData) {
        const usernameDivs = document.querySelectorAll('.username');
        const userTagDivs = document.querySelectorAll('.user-tag');
        const userAvatars = document.querySelectorAll('.user-info .user-avatar img');
        
        usernameDivs.forEach(div => {
            div.textContent = userData.username || 'User';
        });
        
        userTagDivs.forEach(div => {
            div.textContent = userData.tag || '#0000';
        });
        
        if (userData.avatar) {
            userAvatars.forEach(avatar => {
                avatar.src = userData.avatar;
            });
        }
    }
    
    // Setup server switching
    const serverIcons = document.querySelectorAll('.server-icon');
    serverIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            if (!icon.classList.contains('active') && !icon.querySelector('a')) {
                serverIcons.forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                
                // Redirect to appropriate page based on server
                const serverName = icon.querySelector('.tooltip').textContent;
                if (serverName === 'Home') {
                    window.location.href = 'index.html';
                } else if (serverName.includes('Gaming') || 
                           serverName.includes('JavaScript') || 
                           serverName.includes('TypeScript')) {
                    window.location.href = 'index.html';
                }
            }
        });
    });
    
    // Add server and explore functionality
    const addServerButton = document.querySelector('.add-server');
    const exploreButton = document.querySelector('.explore');
    
    if (addServerButton) {
        addServerButton.addEventListener('click', function() {
            alert('Add server functionality is not implemented in this demo.');
        });
    }
    
    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            alert('Explore servers functionality is not implemented in this demo.');
        });
    }
    
    // Logout functionality
    const logoutButton = document.querySelector('.user-actions i:nth-child(3)');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('userData');
            window.location.href = 'login.html';
        });
    }
});