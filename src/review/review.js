import { apiFetch } from '../scripts/apiFetch.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, query, where, deleteDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import {firebaseCredentials} from '../../config.js';

const firebaseConfig = firebaseCredentials;

const app = initializeApp(firebaseConfig);   // Initialize Firebase
const db = getFirestore(app);

let reviewMsg;
let movieId = '';


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
            return null; // handle the case when the user document is not found
        }
    } catch (error) {
        console.error("Error fetching user document:", error);
        return null; // handle the error case
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
            return null; // handle the case when the user document is not found
        }
    } catch (error) {
        console.error("Error fetching user document:", error);
        return null; // handle the error case
    }
};


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
    if (event.target.matches('#close-popup')) {
        togglepopup();
    }


})

document.getElementById("review-submit").addEventListener('click', async function () {
    console.log("inside the submittion")
    reviewMsg = document.getElementById("review-msg").value;
    await addReview(reviewMsg);
    console.log("Review submitted:", reviewMsg);
    document.getElementById("review-msg").value = "";
    await displayReviews();

});


