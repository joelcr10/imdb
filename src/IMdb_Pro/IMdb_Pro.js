function openPayment() {
    // Display the popup and overlay
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }

  function closePopup() {
    // Hide the popup and overlay
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }

document.getElementById("getpayment").addEventListener("click",closefunction);
 function closefunction(){
  closePopup();
 }