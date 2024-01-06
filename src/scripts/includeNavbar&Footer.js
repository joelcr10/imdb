import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth,createUserWithEmailAndPassword,  signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { firebaseCredentials } from "../../config.js";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebaseCredentials;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const includeNavbar = async () =>{
    console.log("inside navbar");
    await fetch("../pages/navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => {
      console.error('Error fetching navbar:', error);
    });
    
}


const userOrGuest = async () =>{

    if(localStorage.getItem("userId")==null){
      
      document.getElementById("guest-user").style.display = "block"; //if the localStorage is null then display sign in 
      document.getElementById("nav-profile").style.display = "none";   // hide the profile section if the user hasn't logged in
      }
    else{
      document.getElementById("nav-profile").style.display = "flex";

      document.getElementById("guest-user").style.display = "none";  

      const docRef = doc(db, "users", localStorage.getItem("userId"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        console.log("Document data:", docSnap.data());
        const userDoc = docSnap.data();
        console.log(userDoc.username);
        document.getElementById("nav-username").innerText = userDoc.username;
        document.getElementById("profile-icon").setAttribute("src",userDoc.profile);

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
}


const includeFooter = async () =>{
    console.log("inside footer");
    await fetch("../pages/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch( error =>{
        console.error("error fetching footer: ",error);
    })
}


export const signOut = () =>{
  console.log("inside sign out");
  localStorage.setItem("userId",null);
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  

  location.reload();
}


window.onload =async function() {
    console.log("onload");
    await includeNavbar();
    await includeFooter();
    await userOrGuest();
    document.getElementById("signout-btn").onclick = function(){
      signOut();
    }
  };