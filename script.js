// script.js

// ===== PART 1: EVENT HANDLING =====

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded. JavaScript is running!');
    
    // Get references to DOM elements
    const userForm = document.getElementById('userForm');
    const formOutput = document.getElementById('formOutput');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const counterValue = document.getElementById('counterValue');
    const resourceButtons = document.querySelectorAll('.resource-btn');
    
    // ===== PART 2: FORM VALIDATION =====
    
    // Add submit event listener to the form
    userForm.addEventListener('submit', function(event) {
        // Prevent the form from submitting the traditional way
        event.preventDefault();
        
        // Validate the form and get result
        const isValid = validateForm();
        
        // If form is valid, show success message
        if (isValid) {
            showFormData();
        }
    });
    
    // Custom form validation function
    function validateForm() {
        let isValid = true;
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const age = document.getElementById('age').value;
        
        // Clear previous error messages
        clearErrors();
        
        // Validate name (must not be empty)
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        }
        
        // Validate email (must contain @ and .)
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password (at least 6 characters)
        if (password === '') {
            showError('passwordError', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        // Validate age (must be between 1 and 120)
        if (age === '') {
            showError('ageError', 'Age is required');
            isValid = false;
        } else if (age < 1 || age > 120) {
            showError('ageError', 'Please enter a valid age (1-120)');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Helper function to show error messages
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    // Helper function to clear all error messages
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    // Function to display form data after successful validation
    function showFormData() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        
        formOutput.innerHTML = `
            <h3>Form Submitted Successfully!</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Age:</strong> ${age}</p>
        `;
    }
    
    // ===== PART 3: INTERACTIVE FEATURES =====
    
    // Feature 1: Theme Switcher
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            changeTheme(theme);
        });
    });
    
    // Function to change the theme
    function changeTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('theme-dark', 'theme-light', 'theme-blue');
        
        // Add the selected theme class
        if (theme !== 'light') {
            document.body.classList.add(`theme-${theme}`);
        }
        
        // Show a message about the theme change
        formOutput.innerHTML = `<p>Theme changed to ${theme} mode!</p>`;
    }
    
    // Feature 2: Counter with increment and decrement buttons
    let count = 0;
    
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
    });
    
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
    });
    
    function updateCounter() {
        counterValue.textContent = count;
        
        // Change color based on value
        if (count > 0) {
            counterValue.style.color = '#27ae60'; // Green for positive
        } else if (count < 0) {
            counterValue.style.color = '#e74c3c'; // Red for negative
        } else {
            counterValue.style.color = '#2c3e50'; // Dark for zero
        }
    }
    
    // Additional interactive feature: Resource buttons
    resourceButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const resources = [
                "Variables store data values. Use 'let' for values that can change and 'const' for values that stay the same.",
                "Functions are blocks of code designed to perform specific tasks. They help you avoid repeating code.",
                "The DOM (Document Object Model) represents your web page. JavaScript can manipulate the DOM to change content and styles."
            ];
            
            formOutput.innerHTML = `<h3>Did You Know?</h3><p>${resources[index]}</p>`;
        });
    });
    
    // ===== PART 4: ADDITIONAL EVENT EXAMPLES =====
    
    // Add focus and blur events to form inputs for better UX
    const formInputs = document.querySelectorAll('input');
    
    formInputs.forEach(input => {
        // When input gets focus, add a class to parent
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // When input loses focus, remove the class
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});