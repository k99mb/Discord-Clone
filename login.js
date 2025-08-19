document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    // Permanent user credentials
    const PERMANENT_CREDENTIALS = {
        email: 'user@example.com',
        password: 'password123',
        username: 'DiscordUser',
        tag: '1234',
        id: 'user123',
        avatar: 'https://i.pravatar.cc/100?img=3'
    };
    
    // Auto-fill credentials if checkbox is checked
    const rememberMe = localStorage.getItem('remember_credentials');
    if (rememberMe === 'true') {
        document.getElementById('email').value = PERMANENT_CREDENTIALS.email;
        document.getElementById('password').value = PERMANENT_CREDENTIALS.password;
        if (document.getElementById('remember-me')) {
            document.getElementById('remember-me').checked = true;
        }
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    function handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me')?.checked || false;
        
        // Simple validation
        if (!email || !password) {
            showError('Please enter both email and password');
            return;
        }
        
        // Check if credentials match the permanent ones
        if (email === PERMANENT_CREDENTIALS.email && password === PERMANENT_CREDENTIALS.password) {
            // Save remember me preference
            localStorage.setItem('remember_credentials', rememberMe);
            
            // Login successful
            loginSuccess(email);
        } else {
            // Try the demo login as fallback
            showError('Invalid credentials. Use email: user@example.com and password: password123');
            
            // Reset login button
            const loginButton = document.querySelector('.login-button');
            loginButton.textContent = 'Log In';
            loginButton.disabled = false;
        }
    }
    
    function loginSuccess(email) {
        // Show loading state
        const loginButton = document.querySelector('.login-button');
        loginButton.textContent = 'Logging in...';
        loginButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Store user info in localStorage to simulate session
            const user = {
                id: PERMANENT_CREDENTIALS.id,
                username: PERMANENT_CREDENTIALS.username,
                tag: PERMANENT_CREDENTIALS.tag,
                email: email,
                avatar: PERMANENT_CREDENTIALS.avatar
            };
            
            localStorage.setItem('discord_user', JSON.stringify(user));
            
            // Redirect to main app
            window.location.href = 'index.html';
        }, 1500);
    }
    
    function showError(message) {
        // Check if error element already exists
        let errorElement = document.querySelector('.login-error');
        
        if (!errorElement) {
            // Create error element if it doesn't exist
            errorElement = document.createElement('div');
            errorElement.className = 'login-error';
            
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

// Add some animations to the login form
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        // Add focus styles
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        // Remove focus styles if input is empty
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value.trim() !== '') {
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