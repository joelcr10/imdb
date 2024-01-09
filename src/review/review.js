import { apiFetch } from '../scripts/apiFetch.js';
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
let username;
let profile;
// const reviewDisplay = document.querySelector('.review-display');
const reviewDisplay = document.getElementById('review-display');


document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');
    console.log(movieId);
    
    if (!localStorage.getItem('userId')) {
        document.getElementById('open-popup').style.display = 'none';
        
    }


    await displayReviews();
});



const userId = localStorage.getItem('userId');
console.log(userId);

const reviewCollection = collection(db, 'reviews'); // Reference to the reviews collection
const options = { day: 'numeric', month: 'long', year: 'numeric' };






export const addReview = async (reviewMsg) => {
    document.getElementsByClassName('review-display').value = '';
    console.log("inside the function");
    const reviewDate = new Date();


    const reviewDetails = {
        id: userId,
        movieId: movieId,
        msg: reviewMsg,
        date: reviewDate.toLocaleDateString('en-US', options)

    };

    try {
        togglepopup();
        await addDoc(reviewCollection, reviewDetails);
        console.log("Review added successfully");

    } catch (error) {
        console.error("Error adding review:", error);
    }
};



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
const usernamee = await getUsername(userId);
console.log(usernamee);
const profilee = await getUserProfile(userId);
console.log(profilee);




async function displayReviews() {
    // Clear existing reviews in the display
    reviewDisplay.innerHTML = '';
    document.getElementById('review-display').innerHTML = '';
    let reviewResultList;
    const reviewURL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
    try {

        // Fetch reviews from the API
        const reviewResult = await apiFetch(reviewURL);
        console.log(reviewResult.results);
        reviewResultList = reviewResult.results;

        // Fetch reviews from the database
        // const docSnap = await getDoc(doc(db, "users", userId));
        // const userDoc = docSnap.data();
        // console.log(userDoc.username);

    } catch (e) {
        console.log("Error in review fetching");
        console.log(e);
    }

    const reviewList = await getDocs(query(collection(db, 'reviews'), where('movieId', '==', movieId)));

    reviewResultList.forEach(async (doc) => {
        console.log(doc.author);
    });


    if (reviewList.size == 0) {
        console.log(!reviewList);
        console.log("no");
        let reviewDetailsFromApi;
        let image_url = "https://image.tmdb.org/t/p/w185";

        for (let i = 0; i <= 3; i++) {
            let doc = reviewResultList[i];
            reviewDetailsFromApi = {
                msg: doc.content,
                date: new Date(doc.updated_at).toLocaleDateString('en-US', options)

            }

            const reviewElement = createReviewElement(reviewDetailsFromApi, doc.author, image_url + doc.author_details.avatar_path);
            reviewDisplay.appendChild(reviewElement);

        }
        // reviewResultList.forEach(async (doc) => {
        //     console.log(image_url+doc.author_details.avatar_path);
        //     reviewDetailsFromApi = {
        //         msg: doc.content,
        //         date: doc.updated_at
        //     }

        //     let userProfile;

        //     const reviewElement = createReviewElement(reviewDetailsFromApi, doc.author, image_url+doc.author_details.avatar_path);
        //     reviewDisplay.appendChild(reviewElement);
        // });


    } else {
        console.log(!reviewList);
        console.log(reviewList.size)
        console.log("yes");

        try {
            const promises = [];
        
            reviewList.forEach((doc) => {
                const promise = (async () => {  //an immediately invoked function  
                    let userName;
                    let userProfile;
                    const reviewData = doc.data();
        
                    userName = await getUsername(reviewData.id);
                    userProfile = await getUserProfile(reviewData.id);
                    console.log(userName);
                    const reviewElement = createReviewElement(reviewData, userName, userProfile);
                    reviewDisplay.appendChild(reviewElement);
                })();
                console.log(promise);
        
                promises.push(promise);
            });
        
            await Promise.all(promises);
        
            // Code after the forEach loop
            let reviewDetailsFromApi;
            let image_url = "https://image.tmdb.org/t/p/w185";
            for (let i = 0; i <= 3; i++) {
                let doc = reviewResultList[i];
                reviewDetailsFromApi = {
                    msg: doc.content,
                    date: new Date(doc.updated_at).toLocaleDateString('en-US', options),
                };
        
                const reviewElement = createReviewElement(reviewDetailsFromApi, doc.author, image_url + doc.author_details.avatar_path);
                reviewDisplay.appendChild(reviewElement);
            }
        } catch (e) {
            console.log("Error in userName fetching");
            console.log(e);
        }
        
    }

    
}





function createReviewElement(reviewData, userName, userProfile) {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review-item');


    // Create HTML structure for a review item
    reviewElement.innerHTML = `
        <div id="review-profile"> 
            <img id="review-profile-image" src="${userProfile}"> 
            <p id="review-username">${userName}</p>
            
            <i class="bi bi-three-dots-vertical" id="review-threeDot"></i>
        </div>
        <div id="review-msg">
            <p id="review-date">${reviewData.date}</p>
            <p id="review-msg-inside" class="review-msg-inside">${reviewData.msg}</p>
        </div>
      
    `;

    return reviewElement;
}


const togglepopup = () => {
    const popup = document.getElementById("popup-container");

    // Get the computed style
    const computedStyle = window.getComputedStyle(popup);

    if (computedStyle.display === 'none') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}



document.getElementById('main-review-container').addEventListener('click', function (event) {
    console.log(event.target);
    const reviewMsgContent = document.getElementById('review-msg-inside');


    if (event.target.matches('#review-msg-inside')) {
        console.log("inside");
        reviewMsgContent.classList.toggle('expanded');
    }


    if (event.target.matches('#open-popup')) {

        togglepopup();
    }
    if (event.target.matches('.close')) {
        togglepopup();
    }


})

document.getElementById("review-submit").addEventListener('click', async function () {
    console.log("inside the submittion")
    reviewMsg = document.getElementById("review-msg").value;
    await addReview(reviewMsg);
    console.log("Review submitted:", reviewMsg);
    await displayReviews();

});


