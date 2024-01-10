// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, addDoc, collection} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth,createUserWithEmailAndPassword,  signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { firebaseCredentials } from "../../config.js";

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

      console.log("entering create username with email and pwd");
      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("inside create");
        await setDoc(doc(db, "users", userCredential.user.uid ), {
          username: username,
          profile: "https://robohash.org/"+email+"?set=set5",
          pendingRequest: [],
          friendRequest: [],
          friendList: [],
          email: email,
          imdb_pro:0
        });

        console.log("created db");

        const ratingCollection = collection(db, 'users', userCredential.user.uid, 'userRatings');
        console.log(ratingCollection);
        const ratingDoc = doc(ratingCollection,"rating");
        await setDoc(ratingDoc,{});

        const journalCollection = collection(db, 'users', userCredential.user.uid, "userJournal");
        const journalDoc = doc(journalCollection,"journalEntries");
        await setDoc(journalDoc,{});

        console.log("setting userRatings");
        window.location.href = "../Login_Page/login.html"; 
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


 


 