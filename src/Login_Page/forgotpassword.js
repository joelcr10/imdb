import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";



// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get the authentication instance
const auth = getAuth(app);

// Form submission event listener
document.getElementById("forgotPasswordForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get user's email from the input field
  const email = document.getElementById("email").value;

  // Call Firebase function to send password reset email
  if (validateForm()) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        alert("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        // Handle errors, e.g., if the email is not associated with any account
        alert(error.message);
      });
  }
});

// Admin SDK API to generate the password reset link.
let userEmail = 'user@example.com';
userEmail = email;

getAuth()
  .generatePasswordResetLink(userEmail, actionCodeSettings)
  .then((link) => {
    // Construct password reset email template, embed the link and send
    // using custom SMTP server.
    return sendCustomPasswordResetEmail(userEmail, displayName, link);
  })
  .catch((error) => {
    // Some error occurred.
  });

function validateForm() {
  var email = document.getElementById("email").value;

  // Basic validation
  if (email === "") {
    alert("Please enter your email address");
    return false;
  }

  // Additional validation logic can be added here

  // If all validations pass, you can submit the form to the server
  return true;
}
