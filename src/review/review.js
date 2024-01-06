import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, query, where, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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

console.log(firebaseConfig)


// const auth = app.auth();

const db = getFirestore(app);
console.log(db);



const watchList = [];




// Assuming you have the user's ID after authentication
const userId = localStorage.getItem('userId'); // Replace this with the actual user ID
console.log(userId);

const reviewCollection = collection(db, 'reviews');

const querySnapshot = await getDocs(query(collection(db, 'reviews')));

const reviewDetails = {
    id: userId,
    movieId: ws,
    msg: "it is good"
};

await addDoc(reviewCollection, reviewDetails);

console.log(reviewCollection);

console.log(reviewCollection.data.data());

export const addReview = async () => {
    
}