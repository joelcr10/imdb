const includeNavbar = () =>{
    console.log("inside navbar");
    fetch("../pages/navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => {
      console.error('Error fetching navbar:', error);
    });
    
}


const includeFooter = () =>{
    console.log("inside footer");
    fetch("../pages/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch( error =>{
        console.error("error fetching footer: ",error);
    })
}



window.onload = function() {
    console.log("onload");
    includeNavbar();
    includeFooter();
  };