// Import only the initializeApp function from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc,addDoc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Your web app's Firebase configuration
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
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(firebaseApp);
console.log(db);


const userId = localStorage.getItem("userId");
console.log("testing");
const ratingCollection = await doc(db,"users",userId,'userRatings','rating');
const ratingRef = await getDoc(ratingCollection);
const data = ratingRef.data();

console.log(data);

let passId;

export const addRating = async(movieId,value) =>{
    console.log("Inside addRating");
    console.log(value);
    console.log(movieId);
    passId = movieId;
        const dataToStore = {
            [movieId]:value
        };


      // Use addDoc to store the data in the document
         await updateDoc(ratingCollection, dataToStore);
         let fetchedId = await getDoc(ratingCollection);
         let test = fetchedId.data();
         
         console.log(test[passId]);
         return test[passId];
        
}


export default addRating;



