document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    
    // Populate days
    populateDays();
    
    // Populate years (100 years back from current year)
    populateYears();
    
    // Update days when month changes
    monthSelect.addEventListener('change', populateDays);
    yearSelect.addEventListener('change', populateDays);
    
    // Handle form submission
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    function populateDays() {
        // Clear current options
        daySelect.innerHTML = '<option value="" disabled selected>Day</option>';
        
        // Get days in month
        const month = parseInt(monthSelect.value) || 1;
        const year = parseInt(yearSelect.value) || new Date().getFullYear();
        const daysInMonth = new Date(year, month, 0).getDate();
        
        // Add day options
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }
    
    function populateYears() {
        // Clear current options
        yearSelect.innerHTML = '<option value="" disabled selected>Year</option>';
        
        // Get current year
        const currentYear = new Date().getFullYear();
        
        // Add year options (100 years back)
        for (let i = currentYear; i >= currentYear - 100; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }
    
    function handleRegister(event) {
        event.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const month = monthSelect.value;
        const day = daySelect.value;
        const year = yearSelect.value;
        
        // Simple validation
        if (!email || !username || !password || !month || !day || !year) {
            showError('Please fill out all fields');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Validate password strength
        if (password.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }
        
        // Validate age (must be at least 13 years old)
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (age < 13 || (age === 13 && monthDiff < 0) || (age === 13 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            showError('You must be at least 13 years old to use Discord');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just simulate a successful registration
        simulateRegistration(email, username, password, birthDate);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function simulateRegistration(email, username, password, birthDate) {
        // Show loading state
        const registerButton = document.querySelector('.login-button');
        registerButton.textContent = 'Creating your account...';
        registerButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // For demo purposes, any registration attempt will succeed
            // Generate a random tag (4 digits)
            const tag = Math.floor(1000 + Math.random() * 9000).toString();
            
            // Store user info in localStorage to simulate session
            const user = {
                id: 'user' + Date.now(),
                username: username,
                tag: tag,
                email: email,
                avatar: 'https://i.pravatar.cc/100?img=3',
                birthDate: birthDate.toISOString()
            };
            
            localStorage.setItem('discord_user', JSON.stringify(user));
            
            // Redirect to main app
            window.location.href = 'index.html';
        }, 1500);
    }
    
    function showError(message) {
        // Check if error element already exists
        let errorElement = document.querySelector('.register-error');
        
        if (!errorElement) {
            // Create error element if it doesn't exist
            errorElement = document.createElement('div');
            errorElement.className = 'register-error';
            
            // Insert after form header
            const loginHeader = document.querySelector('.login-header');
            loginHeader.parentNode.insertBefore(errorElement, loginHeader.nextSibling);
        }
        
        // Set error message and styling
        errorElement.textContent = message;
        errorElement.style.color = 'var(--danger)';
        errorElement.style.padding = '0 32px';
        errorElement.style.marginBottom = '20px';
        errorElement.style.fontSize = '14px';
    }
    
    // Check if user is already logged in
    function checkLoggedInStatus() {
        const user = localStorage.getItem('discord_user');
        
        if (user) {
            // User is already logged in, redirect to main app
            window.location.href = 'index.html';
        }
    }
    
    // Call on page load
    checkLoggedInStatus();
});

// Add some animations to the form inputs
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.form-group input, .form-group select');
    
    inputs.forEach(input => {
        // Add focus styles
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        // Remove focus styles if input is empty
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Add CSS for the focused state
    const style = document.createElement('style');
    style.textContent = `
        .form-group.focused label {
            color: var(--highlight);
        }
    `;
    document.head.appendChild(style);
});