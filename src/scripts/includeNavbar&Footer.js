import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth,createUserWithEmailAndPassword,  signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrKosfpufYIc3yaL-pgrlcwhWqpfN2Rlg",
  authDomain: "imdb-63ec7.firebaseapp.com",
  projectId: "imdb-63ec7",
  storageBucket: "imdb-63ec7.appspot.com",
  messagingSenderId: "1089587640183",
  appId: "1:1089587640183:web:12166709de392731e91372",
  measurementId: "G-TR217WFC7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// const auth = app.auth();

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
  console.log("testing localstorage",localStorage.getItem("userId"));

    if(localStorage.getItem("userId")=="null"){
      console.log("is it getting inside");
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