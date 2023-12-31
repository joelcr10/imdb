document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Perform form validation here
    // Example: Check if passwords match, etc.

    // If validation is successful, you can send the data to the server for processing
    // For simplicity, we'll just log the form data for now
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    console.log(formObject);
});