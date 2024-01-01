document.addEventListener('DOMContentLoaded', function () {
    var signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        // Basic validation
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Check password length
        if (password.length < 8) {
            alert('Password should be at least 8 characters long');
            return;
        }

        // Additional validation logic can be added here

        // If all validations pass, you can submit the form to the server
        alert('Sign up successful!'); // Replace this with your form submission logic
    }
});