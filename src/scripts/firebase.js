// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
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
// firebase.initializeApp(firebaseConfig);
console.log(firebaseConfig)


// const auth = app.auth();

const db = getFirestore(app);

// const db = firebase.firestore();



async function getCities(db) {
  console.log("inside db");
  const citiesCol = collection(db, 'test');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  console.log(cityList);

  // const docRef = ;

  // const tryTest = await db.collection('test');
  
}

getCities(db);


const auth = getAuth();




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
        });
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
        window.location.href = "../index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error);
        // ..
      })
  }


 


 