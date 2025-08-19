document.addEventListener('DOMContentLoaded', function() {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('discord_user');
    let currentUser;
    const loginPrompt = document.getElementById('login-prompt');
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        updateUserUI(currentUser);
    } else {
        // Show login prompt
        if (loginPrompt) {
            loginPrompt.style.display = 'flex';
        }
        return;
    }
    
    // Initialize the friends page
    initFriendsPage();
    
    function initFriendsPage() {
        // Set up event listeners
        setupTabSwitching();
        setupAddFriendButton();
        setupFriendActions();
        setupServerSwitching();
    }
    
    function setupTabSwitching() {
        // Sidebar tabs
        const sidebarTabs = document.querySelectorAll('.friends-tab');
        sidebarTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                if (this.classList.contains('add-friend')) {
                    showAddFriendSection();
                    return;
                }
                
                // Update sidebar tabs
                sidebarTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update header tabs
                const tabName = this.textContent.trim();
                const headerTabs = document.querySelectorAll('.friends-header-tab');
                headerTabs.forEach(t => {
                    if (t.textContent.trim() === tabName) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
                
                // Hide add friend section
                document.querySelector('.add-friend-section').style.display = 'none';
                document.querySelector('.friends-list-container').style.display = 'block';
                
                // Update friends list (in a real app, this would fetch different lists)
                updateFriendsList(tabName);
            });
        });
        
        // Header tabs
        const headerTabs = document.querySelectorAll('.friends-header-tab');
        headerTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update header tabs
                headerTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update sidebar tabs
                const tabName = this.textContent.trim();
                const sidebarTabs = document.querySelectorAll('.friends-tab');
                sidebarTabs.forEach(t => {
                    if (t.textContent.trim() === tabName) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
                
                // Hide add friend section
                document.querySelector('.add-friend-section').style.display = 'none';
                document.querySelector('.friends-list-container').style.display = 'block';
                
                // Update friends list
                updateFriendsList(tabName);
            });
        });
    }
    
    function updateFriendsList(tabName) {
        const friendsSection = document.querySelector('.friends-section');
        const friendsList = document.querySelector('.friends-list');
        
        // In a real app, this would fetch different lists based on the tab
        switch(tabName.toLowerCase()) {
            case 'all':
                friendsSection.querySelector('h3').textContent = 'ALL FRIENDS — 7';
                // Would update the list with all friends
                break;
                
            case 'online':
                friendsSection.querySelector('h3').textContent = 'ONLINE — 4';
                // List is already showing online friends
                break;
                
            case 'pending':
                friendsSection.querySelector('h3').textContent = 'PENDING — 2';
                // Would update the list with pending friend requests
                break;
                
            case 'blocked':
                friendsSection.querySelector('h3').textContent = 'BLOCKED — 1';
                // Would update the list with blocked users
                break;
        }
    }
    
    function setupAddFriendButton() {
        // Header add friend button
        const addFriendButton = document.querySelector('.add-friend-button');
        if (addFriendButton) {
            addFriendButton.addEventListener('click', showAddFriendSection);
        }
        
        // Add friend form submission
        const addFriendForm = document.querySelector('.add-friend-form');
        const addFriendInput = document.querySelector('.add-friend-input');
        const addFriendSubmit = document.querySelector('.add-friend-submit');
        
        if (addFriendForm) {
            addFriendForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const friendTag = addFriendInput.value.trim();
                
                if (friendTag) {
                    // In a real app, this would send a friend request
                    alert(`Friend request sent to ${friendTag}!`);
                    addFriendInput.value = '';
                }
            });
        }
        
        if (addFriendInput && addFriendSubmit) {
            addFriendInput.addEventListener('input', function() {
                // Enable submit button only if input has value
                addFriendSubmit.disabled = !this.value.trim();
            });
            
            addFriendSubmit.addEventListener('click', function(e) {
                e.preventDefault();
                const friendTag = addFriendInput.value.trim();
                
                if (friendTag) {
                    // In a real app, this would send a friend request
                    alert(`Friend request sent to ${friendTag}!`);
                    addFriendInput.value = '';
                    addFriendSubmit.disabled = true;
                }
            });
        }
    }
    
    function showAddFriendSection() {
        // Update tabs
        document.querySelectorAll('.friends-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.friends-tab.add-friend').classList.add('active');
        
        // Show add friend section, hide friends list
        document.querySelector('.friends-list-container').style.display = 'none';
        document.querySelector('.add-friend-section').style.display = 'block';
    }
    
    function setupFriendActions() {
        // Message buttons
        const messageButtons = document.querySelectorAll('.friend-action-button.message');
        messageButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const friendName = this.closest('.friend-item').querySelector('.friend-name').textContent;
                alert(`Opening chat with ${friendName}`);
                // In a real app, this would open a DM with the friend
            });
        });
        
        // More options buttons
        const moreButtons = document.querySelectorAll('.friend-action-button.more');
        moreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const friendName = this.closest('.friend-item').querySelector('.friend-name').textContent;
                alert(`More options for ${friendName}`);
                // In a real app, this would show a dropdown menu
            });
        });
        
        // Friend items
        const friendItems = document.querySelectorAll('.friend-item');
        friendItems.forEach(item => {
            item.addEventListener('click', function() {
                const friendName = this.querySelector('.friend-name').textContent;
                alert(`Opening chat with ${friendName}`);
                // In a real app, this would open a DM with the friend
            });
        });
        
        // DM items
        const dmItems = document.querySelectorAll('.dm-item');
        dmItems.forEach(item => {
            item.addEventListener('click', function() {
                const dmName = this.querySelector('.dm-name').textContent;
                alert(`Opening chat with ${dmName}`);
                // In a real app, this would open a DM with the user
            });
        });
    }
    
    function setupServerSwitching() {
        const serverIcons = document.querySelectorAll('.server-icon');
        serverIcons.forEach(server => {
            if (!server.classList.contains('active')) {
                server.addEventListener('click', function() {
                    // In a real app, this would navigate to the server
                    if (this.querySelector('span')) {
                        const serverName = this.querySelector('span').textContent;
                        window.location.href = 'index.html';
                    } else if (this.querySelector('.fa-plus')) {
                        alert('Add a server dialog would open here');
                    } else if (this.querySelector('.fa-compass')) {
                        alert('Server discovery would open here');
                    }
                });
            }
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

// Add logout functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add logout functionality
    const userInfo = document.querySelector('.user-info');
    
    if (userInfo) {
        // Create logout button
        const logoutButton = document.createElement('i');
        logoutButton.className = 'fa-solid fa-sign-out-alt';
        logoutButton.style.marginLeft = '8px';
        logoutButton.style.cursor = 'pointer';
        logoutButton.style.color = 'var(--text-muted)';
        
        // Add hover effect
        logoutButton.addEventListener('mouseenter', () => {
            logoutButton.style.color = 'var(--danger-color)';
        });
        
        logoutButton.addEventListener('mouseleave', () => {
            logoutButton.style.color = 'var(--text-muted)';
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