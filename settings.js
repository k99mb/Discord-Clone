document.addEventListener('DOMContentLoaded', function() {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('discord_user');
    let currentUser;
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        updateUserInfo(currentUser);
    } else {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }
    
    // Navigation between settings sections
    const navItems = document.querySelectorAll('.settings-nav-item');
    const sections = document.querySelectorAll('.settings-section');
    
    navItems.forEach(item => {
        if (!item.classList.contains('logout') && !item.classList.contains('back')) {
            item.addEventListener('click', function() {
                // Remove active class from all nav items and sections
                navItems.forEach(nav => nav.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked nav item and corresponding section
                this.classList.add('active');
                const sectionId = this.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
            });
        }
    });
    
    // Back button functionality
    const backButton = document.querySelector('.settings-nav-item.back');
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Logout functionality
    const logoutButton = document.querySelector('.settings-nav-item.logout');
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('discord_user');
        window.location.href = 'login.html';
    });
    
    // About me character counter
    const aboutMeTextarea = document.getElementById('about-me');
    const charCounter = document.querySelector('.char-counter');
    
    aboutMeTextarea.addEventListener('input', function() {
        const charCount = this.value.length;
        charCounter.textContent = `${charCount}/190`;
        
        // Limit to 190 characters
        if (charCount > 190) {
            this.value = this.value.substring(0, 190);
            charCounter.textContent = '190/190';
        }
    });
    
    // Theme selection
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            themeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // In a real app, this would save the theme preference
            const isDark = this.querySelector('.theme-preview').classList.contains('dark');
            // Apply theme changes (simplified for demo)
            alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} mode`);
        });
    });
    
    // Edit profile button
    const editProfileButton = document.querySelector('.edit-button button');
    editProfileButton.addEventListener('click', function() {
        // In a real app, this would open a modal to edit username
        const newUsername = prompt('Enter new username:', currentUser.username);
        if (newUsername && newUsername.trim() !== '') {
            currentUser.username = newUsername.trim();
            // Update localStorage
            localStorage.setItem('discord_user', JSON.stringify(currentUser));
            // Update UI
            updateUserInfo(currentUser);
        }
    });
    
    // Edit field buttons
    const editFieldButtons = document.querySelectorAll('.edit-field');
    
    editFieldButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fieldType = this.previousElementSibling.previousElementSibling.textContent.toLowerCase();
            
            switch(fieldType) {
                case 'email':
                    const newEmail = prompt('Enter new email:', currentUser.email || '');
                    if (newEmail && newEmail.trim() !== '' && isValidEmail(newEmail)) {
                        currentUser.email = newEmail.trim();
                        localStorage.setItem('discord_user', JSON.stringify(currentUser));
                        updateUserInfo(currentUser);
                    } else if (newEmail) {
                        alert('Please enter a valid email address');
                    }
                    break;
                    
                case 'phone number':
                    const newPhone = prompt('Enter phone number:');
                    if (newPhone && newPhone.trim() !== '') {
                        currentUser.phone = newPhone.trim();
                        localStorage.setItem('discord_user', JSON.stringify(currentUser));
                        updateUserInfo(currentUser);
                    }
                    break;
                    
                case 'password':
                    const currentPassword = prompt('Enter current password:');
                    // In a real app, this would verify the current password
                    if (currentPassword) {
                        const newPassword = prompt('Enter new password:');
                        if (newPassword && newPassword.length >= 8) {
                            alert('Password updated successfully!');
                            // In a real app, this would hash the password and update it
                        } else {
                            alert('Password must be at least 8 characters long');
                        }
                    }
                    break;
            }
        });
    });
    
    // Avatar change functionality
    const avatarChange = document.querySelector('.avatar-change');
    avatarChange.addEventListener('click', function() {
        // In a real app, this would open a file picker
        alert('In a real app, this would allow you to upload a new avatar image');
        // For demo purposes, we'll just change to a random avatar
        const randomAvatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
        document.getElementById('user-avatar').src = randomAvatar;
        currentUser.avatar = randomAvatar;
        localStorage.setItem('discord_user', JSON.stringify(currentUser));
    });
    
    // Banner change functionality
    const bannerPlaceholder = document.querySelector('.banner-placeholder');
    bannerPlaceholder.addEventListener('click', function() {
        // In a real app, this would open a file picker
        alert('In a real app, this would allow you to upload a banner image');
    });
});

// Helper function to update user info in the UI
function updateUserInfo(user) {
    document.getElementById('user-display-name').textContent = user.username || 'Username';
    document.getElementById('user-tag').textContent = user.tag ? `#${user.tag}` : '#0000';
    document.getElementById('user-email').textContent = user.email || 'Not set';
    document.getElementById('user-phone').textContent = user.phone || 'Not added';
    
    if (user.avatar) {
        document.getElementById('user-avatar').src = user.avatar;
    }
    
    if (user.about) {
        document.getElementById('about-me').value = user.about;
        document.querySelector('.char-counter').textContent = `${user.about.length}/190`;
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}