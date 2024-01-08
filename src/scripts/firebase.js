// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
<<<<<<< HEAD
import { getFirestore, collection, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth,createUserWithEmailAndPassword,  signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { firebaseCredentials } from "../../config.js";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
=======
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth,createUserWithEmailAndPassword,  signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { firebaseCredentials } from "../../config.js";
>>>>>>> 75ca0f04181009bd1d079d590520a19953a8ffaf

const firebaseConfig = firebaseCredentials;


const app = initializeApp(firebaseConfig); // initialization of firebase;


const db = getFirestore(app); //getting the reference of firestore database


const auth = getAuth(); //initializing firebase auth




  export const signUp = async () =>{
    console.log("sign up is working");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    try{

      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        
        await setDoc(doc(db, "users", userCredential.user.uid ), {
          username: username,
          profile: "https://robohash.org/"+email+"?set=set5",
          pendingRequest: [],
          friendRequest: [],
          friendList: [],
          email: email
        });
        window.location.href = "../Login_Page/login.html";
        // window.location.href = "D:/IMDB-Clone/src/Login_Page/login.html";
        
        alert("Signup successfull");
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error);
        // ..
      })

    }catch(err){
      console.log(err);
    }
  }


  export const signIn = () =>{
    console.log("inside lgin");
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(email,password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>{
        
        // storing the user credential to local storage
        //accessing user info by fetching userId and getting the data from firestore

        localStorage.setItem("userId",userCredential.user.uid);
        localStorage.setItem("userEmail",userCredential.user.email);
        window.location.href = "../LandingPage/index.html"; 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error);
        // ..
      })
  }


 


 