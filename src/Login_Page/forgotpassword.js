document.addEventListener('DOMContentLoaded', function () {
    var forgotPasswordForm = document.getElementById('forgotPasswordForm');
    forgotPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        var email = document.getElementById('email').value;

        // Basic validation
        if (email === '') {
            alert('Please enter your email address');
            return;
        }

        // Additional validation logic can be added here

        // If all validations pass, you can submit the form to the server
        alert('Password reset link sent to ' + email); 
    }

    
});