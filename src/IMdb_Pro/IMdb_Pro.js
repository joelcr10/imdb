const openPayment=async()=> {
  // Display the popup and overlay
  document.getElementById('popup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
  let userName=localStorage.getItem("userId");
  console.log(userName);
  if(userName){
    showCredentials();

  }
  else{
    gotosignupPage();
  }
}

function gotosignupPage() {
const popup_signin = document.getElementById('popup');
popup_signin.innerHTML = `
  <p>You need to sign up first to get Premium Membership.</p>
  <button onclick="redirectToSignup()">Sign In</button>
  <button onclick="closePopup()">Close</button>
`;

openPopup();
}
function redirectToSignup() {
// Redirect to the signup page
console.log("redirecting to sign in page");
window.location.href = '../Login_Page/login.html';
}
const closePopup=async()=> {
  // Hide the popup and overlay
  document.getElementById('popup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

document.getElementById("payment-btn").addEventListener("click",closefunction);
function closefunction(){
closePopup();
}
// function checkUserName() {
//   const inputElement = document.getElementById('username');
//   const errorMessageElement = document.getElementById('error-message');

//   // Retrieve the stored username from localStorage
//   const storedUsername = localStorage.getItem('user');

//   // Get the current input value
//   const currentInputValue = inputElement.value.trim();

//   // Compare the input value with the stored username
//   if (currentInputValue !== storedUsername) {
//     // Display the error message
//     errorMessageElement.style.display = 'block';
//   } else {
//     // Hide the error message if the input matches the stored username
//     errorMessageElement.style.display = 'none';
//   }
// }