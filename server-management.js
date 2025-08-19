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
        setupServerManagement();
    }
    
    // Setup server management functionality
    function setupServerManagement() {
        // Tab switching
        const tabs = document.querySelectorAll('.server-tab');
        const tabContents = document.querySelectorAll('.server-tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${tabId}-content`) {
                        content.classList.add('active');
                    }
                });
            });
        });
        
        // Server actions
        setupServerActions();
        
        // Join server functionality
        setupJoinServer();
        
        // Create server functionality
        setupCreateServer();
    }
    
    // Setup server actions (settings, open, leave)
    function setupServerActions() {
        const serverActionButtons = document.querySelectorAll('.server-action-btn');
        
        serverActionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.querySelector('span').textContent;
                const serverName = this.closest('.server-card').querySelector('.server-info h3').textContent;
                
                switch(action) {
                    case 'Settings':
                        alert(`Server settings for ${serverName} is not implemented in this demo.`);
                        break;
                    case 'Open':
                        window.location.href = 'index.html';
                        break;
                    case 'Leave':
                        if (confirm(`Are you sure you want to leave ${serverName}?`)) {
                            // Simulate leaving server
                            this.closest('.server-card').style.opacity = '0.5';
                            setTimeout(() => {
                                this.closest('.server-card').remove();
                            }, 500);
                        }
                        break;
                }
            });
        });
    }
    
    // Setup join server functionality
    function setupJoinServer() {
        // Join with invite link
        const joinButton = document.querySelector('.join-btn');
        const inviteInput = document.querySelector('.invite-input');
        
        joinButton.addEventListener('click', function() {
            const inviteLink = inviteInput.value.trim();
            
            if (inviteLink === '') {
                alert('Please enter an invite link.');
                return;
            }
            
            // Simulate joining server
            alert('Joining server... This feature is not fully implemented in this demo.');
            inviteInput.value = '';
        });
        
        // Join public servers
        const joinSmallButtons = document.querySelectorAll('.join-small-btn');
        
        joinSmallButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serverName = this.closest('.public-server-card').querySelector('h4').textContent;
                
                // Simulate joining server
                alert(`Joining ${serverName}... This feature is not fully implemented in this demo.`);
                
                // Change button text to "Joined"
                this.textContent = 'Joined';
                this.disabled = true;
                this.style.backgroundColor = 'var(--success-color)';
            });
        });
    }
    
    // Setup create server functionality
    function setupCreateServer() {
        const serverIconPreview = document.querySelector('.server-icon-preview');
        const serverIconInput = document.getElementById('server-icon-input');
        const serverNameInput = document.getElementById('server-name');
        const createButton = document.querySelector('.create-btn');
        const cancelButton = document.querySelector('.cancel-btn');
        const serverTemplates = document.querySelectorAll('.server-template');
        
        // Server icon upload
        serverIconPreview.addEventListener('click', function() {
            serverIconInput.click();
        });
        
        serverIconInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    serverIconPreview.innerHTML = `<img src="${e.target.result}" alt="Server Icon" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
                }
                
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        // Server templates
        serverTemplates.forEach(template => {
            template.addEventListener('click', function() {
                serverTemplates.forEach(t => t.style.border = 'none');
                this.style.border = '2px solid var(--accent-color)';
                
                const templateType = this.querySelector('h5').textContent;
                
                // Update server name based on template
                if (templateType === 'Gaming') {
                    serverNameInput.value = 'Gaming Server';
                } else if (templateType === 'Development') {
                    serverNameInput.value = 'Dev Community';
                } else if (templateType === 'Education') {
                    serverNameInput.value = 'Study Group';
                }
            });
        });
        
        // Create server
        createButton.addEventListener('click', function() {
            const serverName = serverNameInput.value.trim();
            
            if (serverName === '') {
                alert('Please enter a server name.');
                return;
            }
            
            // Simulate server creation
            alert(`Creating server "${serverName}"... This feature is not fully implemented in this demo.`);
            
            // Reset form
            serverNameInput.value = 'My Server';
            serverIconPreview.innerHTML = `<i class="fas fa-camera"></i><span>Upload</span>`;
            serverTemplates.forEach(t => t.style.border = 'none');
            
            // Switch to My Servers tab
            document.querySelector('.server-tab[data-tab="my-servers"]').click();
        });
        
        // Cancel button
        cancelButton.addEventListener('click', function() {
            // Reset form
            serverNameInput.value = 'My Server';
            serverIconPreview.innerHTML = `<i class="fas fa-camera"></i><span>Upload</span>`;
            serverTemplates.forEach(t => t.style.border = 'none');
            
            // Switch to My Servers tab
            document.querySelector('.server-tab[data-tab="my-servers"]').click();
        });
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
                const serverName = icon.querySelector('.tooltip')?.textContent || icon.querySelector('span')?.textContent;
                if (serverName === 'Home') {
                    window.location.href = 'index.html';
                } else if (serverName && (serverName.includes('Gaming') || 
                           serverName.includes('JavaScript') || 
                           serverName.includes('TypeScript'))) {
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
            // Redirect to create server tab
            window.location.href = 'server-management.html';
            setTimeout(() => {
                document.querySelector('.server-tab[data-tab="create-server"]').click();
            }, 100);
        });
    }
    
    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            // Redirect to join server tab
            window.location.href = 'server-management.html';
            setTimeout(() => {
                document.querySelector('.server-tab[data-tab="join-server"]').click();
            }, 100);
        });
    }
});