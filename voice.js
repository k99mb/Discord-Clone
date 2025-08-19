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
        setupVoiceChannel();
    }
    
    // Setup voice channel functionality
    function setupVoiceChannel() {
        // Voice control buttons
        const muteToggle = document.getElementById('mute-toggle');
        const deafenToggle = document.getElementById('deafen-toggle');
        const disconnectBtn = document.getElementById('disconnect');
        const screenShareBtn = document.getElementById('screen-share');
        const videoToggleBtn = document.getElementById('video-toggle');
        const settingsBtn = document.getElementById('settings');
        
        // User's speaking indicator
        const userSpeakingIndicator = document.querySelector('.voice-participant:first-child .speaking-indicator');
        const userMicControl = document.querySelector('.voice-participant:first-child .mic-control');
        const userHeadphoneControl = document.querySelector('.voice-participant:first-child .headphone-control');
        
        // Member sidebar indicators
        const memberSpeakingIndicator = document.querySelector('.member:first-child .member-speaking');
        
        // Mute/Unmute functionality
        let isMuted = false;
        muteToggle.addEventListener('click', function() {
            isMuted = !isMuted;
            if (isMuted) {
                muteToggle.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                muteToggle.style.color = 'var(--danger-color)';
                userMicControl.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                userMicControl.classList.remove('active');
                memberSpeakingIndicator.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                memberSpeakingIndicator.classList.add('member-muted');
                memberSpeakingIndicator.classList.remove('member-speaking');
            } else {
                muteToggle.innerHTML = '<i class="fas fa-microphone"></i>';
                muteToggle.style.color = '';
                userMicControl.innerHTML = '<i class="fas fa-microphone"></i>';
                userMicControl.classList.add('active');
                memberSpeakingIndicator.innerHTML = '<i class="fas fa-microphone"></i>';
                memberSpeakingIndicator.classList.remove('member-muted');
                memberSpeakingIndicator.classList.add('member-speaking');
            }
        });
        
        // Deafen/Undeafen functionality
        let isDeafened = false;
        deafenToggle.addEventListener('click', function() {
            isDeafened = !isDeafened;
            if (isDeafened) {
                deafenToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                deafenToggle.style.color = 'var(--danger-color)';
                userHeadphoneControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
                userHeadphoneControl.classList.remove('active');
                
                // If deafened, also mute
                if (!isMuted) {
                    muteToggle.click();
                }
            } else {
                deafenToggle.innerHTML = '<i class="fas fa-headphones"></i>';
                deafenToggle.style.color = '';
                userHeadphoneControl.innerHTML = '<i class="fas fa-headphones"></i>';
                userHeadphoneControl.classList.add('active');
            }
        });
        
        // Disconnect functionality
        disconnectBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        
        // Screen share functionality
        screenShareBtn.addEventListener('click', function() {
            alert('Screen sharing is not available in this demo.');
        });
        
        // Video toggle functionality
        videoToggleBtn.addEventListener('click', function() {
            alert('Video chat is not available in this demo.');
        });
        
        // Settings functionality
        settingsBtn.addEventListener('click', function() {
            window.location.href = 'settings.html';
        });
        
        // Simulate speaking activity
        simulateSpeakingActivity();
    }
    
    // Simulate speaking activity for participants
    function simulateSpeakingActivity() {
        const speakingIndicators = document.querySelectorAll('.speaking-indicator');
        const memberSpeakingIcons = document.querySelectorAll('.member-speaking');
        
        // Don't simulate for user (first indicator) or muted users
        for (let i = 1; i < speakingIndicators.length; i++) {
            if (!speakingIndicators[i].parentElement.nextElementSibling.querySelector('.muted-icon')) {
                setRandomSpeakingActivity(speakingIndicators[i], memberSpeakingIcons[i]);
            }
        }
    }
    
    function setRandomSpeakingActivity(indicator, memberIcon) {
        // Skip if this is a muted user
        if (indicator.parentElement.nextElementSibling.querySelector('.muted-icon')) {
            return;
        }
        
        const speakingDuration = Math.random() * 5000 + 1000; // 1-6 seconds
        const pauseDuration = Math.random() * 3000 + 2000; // 2-5 seconds
        
        // Start speaking
        const startSpeaking = function() {
            indicator.classList.add('active');
            if (memberIcon) memberIcon.classList.add('active');
            
            // Stop speaking after duration
            setTimeout(function() {
                indicator.classList.remove('active');
                if (memberIcon) memberIcon.classList.remove('active');
                
                // Start speaking again after pause
                setTimeout(startSpeaking, pauseDuration);
            }, speakingDuration);
        };
        
        // Initial delay before first speaking
        setTimeout(startSpeaking, Math.random() * 2000);
    }
    
    // Update user interface with user data
    function updateUserUI(userData) {
        const usernameDivs = document.querySelectorAll('.username, .participant-name:first-of-type, .member-name:first-of-type');
        const userTagDivs = document.querySelectorAll('.user-tag');
        const userAvatars = document.querySelectorAll('.user-avatar img, .participant-avatar:first-of-type img, .member-avatar:first-of-type img');
        
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
                
                // In a real app, this would load the server's channels and content
                const serverName = icon.querySelector('.tooltip').textContent;
                document.querySelector('.server-header h3').textContent = serverName;
            }
        });
    });
    
    // Setup channel switching
    const channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
        channel.addEventListener('click', function() {
            if (!channel.classList.contains('active')) {
                channels.forEach(c => c.classList.remove('active'));
                channel.classList.add('active');
                
                const channelName = channel.querySelector('span').textContent;
                const channelType = channel.querySelector('i').classList.contains('fa-hashtag') ? 'text' : 'voice';
                
                if (channelType === 'text') {
                    window.location.href = 'index.html';
                } else {
                    // Update voice channel header
                    document.querySelector('.voice-header-left span').textContent = channelName;
                }
            }
        });
    });
    
    // Logout functionality
    const logoutButton = document.querySelector('.user-actions i:nth-child(3)');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('userData');
            window.location.href = 'login.html';
        });
    }
});