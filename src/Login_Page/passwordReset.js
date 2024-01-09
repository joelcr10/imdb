import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { firebaseCredentials } from "../../config.js";

const firebaseConfig = firebaseCredentials;


const app = initializeApp(firebaseConfig); // initialization of firebase;

const auth = getAuth(app); //initializing firebase auth

const email = document.getElementById('email').value;
console.log(email);

const resetPassword = () =>{
    const email = document.getElementById('email').value;
    console.log(email);

    sendPasswordResetEmail(auth,email)
    .then(()=>{

    })
    .catch((error)=>{
        console.log(`Error : ${error}`);
    })
}

document.getElementById('submit-text').addEventListener('click', function() {
    console.log("got you");
    resetPassword();


})