import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, query, where, deleteDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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
const db = getFirestore(app);

let reviewMsg;
let movieId = '';
// const reviewDisplay = document.querySelector('.review-display');
const reviewDisplay = document.getElementById('review-display');


document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');
    console.log(movieId);
    await displayReviews();
});

document.getElementById("review-submit").addEventListener('click', async function () {
    reviewMsg = document.getElementById("review-msg").value;
    await addReview(reviewMsg);
    console.log("Review submitted:", reviewMsg);
    await displayReviews();

});

const userId = localStorage.getItem('userId');
console.log(userId);

const reviewCollection = collection(db, 'reviews'); // Reference to the reviews collection

const querySnapshot = await getDocs(query(collection(db, 'reviews')));
console.log(querySnapshot);
querySnapshot.forEach(async (doc) => {
    const movieData = doc.data();
    console.log(movieData);


});



export const addReview = async (reviewMsg) => {
    console.log("inside the function");
    const reviewDate = new date();
    const reviewDetails = {
        id: userId,
        movieId: movieId,
        msg: reviewMsg,
        
    };

    try {
        await addDoc(reviewCollection, reviewDetails);
        console.log("Review added successfully");
    } catch (error) {
        console.error("Error adding review:", error);
    }
};





// const checkUsername = async () => {
//     const docSnap = await getDoc(doc(db, "users", userId));
//     const userDoc = docSnap.data();
//     console.log(userDoc.username);

//     const userName = userDoc.username;
//     return userName;
// }

const getUsername = async (userid) => {
    try {
        const docSnap = await getDoc(doc(db, "users", userid));
        const userDoc = docSnap.data();

        if (userDoc) {
            console.log(userDoc.username);
            return userDoc.username;
        } else {
            console.log("User document not found");
            return null; // or handle the case when the user document is not found
        }
    } catch (error) {
        console.error("Error fetching user document:", error);
        return null; // or handle the error case
    }
};
const getUserProfile = async (userid) => {
    try {
        const docSnap = await getDoc(doc(db, "users", userid));
        const userDoc = docSnap.data();

        if (userDoc) {
            console.log(userDoc.profile);
            return userDoc.profile;
        } else {
            console.log("User document not found");
            return null; // or handle the case when the user document is not found
        }
    } catch (error) {
        console.error("Error fetching user document:", error);
        return null; // or handle the error case
    }
};
// Example usage:
const username = await getUsername(userId);
console.log(username);
const profile = await getUserProfile(userId);
console.log(profile);



async function displayReviews() {
    // Clear existing reviews in the display
    reviewDisplay.innerHTML = '';

    // Fetch reviews from the database
    const userDetails = await getDocs(query(collection(db, 'users')));
    // const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(doc(db, "users", userId));
    const userDoc = docSnap.data();
    console.log(userDoc.username);


    const reviewList = await getDocs(query(collection(db, 'reviews')));
    console.log(userDetails);


    userDetails.forEach(user => {
        const userData = user.data();
        console.log(userData.uid);


    });

    reviewList.forEach(async (doc) => {
        let userName;
        let userProfile;
        const reviewData = doc.data();
        try {

            // const dataDoc =  doc(db, "users", userId);
           
        
            userName = await getUsername(reviewData.id);
            userProfile = await getUserProfile(reviewData.id);
            console.log(userName);

        }
        catch (e) {
            console.log("Error in userName fetching");
            console.log(e);
        }
        const reviewElement = createReviewElement(reviewData, userName,userProfile);
        reviewDisplay.appendChild(reviewElement);
    });
}

function createReviewElement(reviewData, userName,userProfile) {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review-item');

    // Create HTML structure for a review item
    reviewElement.innerHTML = `
        <div id="review-profile"> 
        <img id="review-profile-image" src="${userProfile}"> 
        <p id="review-username">${userName}</p>
        </div>
        <div id="review-msg">
        <p>${reviewData.msg}</p>
        </div>
      
    `;

    return reviewElement;
}