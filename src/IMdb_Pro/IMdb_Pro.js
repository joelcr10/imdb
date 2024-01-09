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
const showCredentials=async()=>{
  const popup= document.getElementById('popup');
const username=localStorage.getItem('userName');
// popup.innerHTML=`
// <form id="getpayment">
//                       <span class="close-btn" onclick="closePopup()">&times;</span>
//                   <h3>ENTER IMDB CREDENTIALS</h3>
//                   <label for="username" class="username-input">HEY ${username}</label><br>
//                   <p>Upgrade your IMDB Account at $1/month</p>
//                   <br><br><br>
//                       <div id="payment-btn">
//                           <script src="https://checkout.razorpay.com/v1/payment-button.js" 
//                           data-payment_button_id="pl_NLiu9E6KQUN1KN"
                          
//                           async> 
                          
//                           </script>
//                       </div>
//                   </form>
// `;

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
