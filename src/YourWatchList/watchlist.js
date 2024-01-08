import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, query, where, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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

console.log(firebaseConfig)


// const auth = app.auth();

const db = getFirestore(app);
console.log(db);



const watchList = [];




// Assuming you have the user's ID after authentication


const userId = localStorage.getItem('userId'); // Replace this with the actual user ID
console.log(userId);

//  const watchListCollection = collection(db, 'users', userId, 'watchlist');





export const addToWatchlist = async (item) => {




    console.log("Add to watchList inside");
    console.log(item)

    const title = item.dataset.title;
    const poster = item.dataset.poster;
    const genre = item.dataset.genre;
    const id = item.dataset.id;

    const movieDetails = {
        id: id,
        title: title,
        poster: poster,
        genre: genre,
    };





    // Check if the movie is not already in the watchlist
    try {
        // const index = watchList.findIndex((movie) => movie.id === id);
        let index = 0;
        const querySnapshot = await getDocs(query(collection(db, 'users', userId, 'watchlist'), where('id', '==', id)));
        console.log(querySnapshot);
        querySnapshot.forEach(async (doc) => {
            const movieData = doc.data();
            console.log(movieData);
            if (movieData.id === id) {
                index = 1;
            }

        });

        // console.log(index);  
        if (index === 0) {
            watchList.push(movieDetails);
            console.log(`${movieDetails.title} added to Watchlist`);

            // Add the movie to Firestore
            await addDoc(watchListCollection, movieDetails);
            item.classList.add('watchListRemove');


        } else {
            console.log(`${movieDetails.title} is already in Watchlist`);
        }

        await watchlistCounter();
    } catch (err) {
        console.log(err);
        console.log("Eroorrr!!!!");
    }

};




export const watchListDisplay = async () => {



    document.getElementById("watchlist-container").innerHTML = "";

    try {

        // Assuming watchListCollection is a valid Firestore collection reference
        const watchListCollection = collection(db, 'users', userId, 'watchlist');
        const querySnapshot = await getDocs(watchListCollection);
        const watchlistCounter = document.getElementById('watchlistCounter');
        // Clear the watchList array before updating it
        watchList.length = 0;

        if (querySnapshot.empty) {
            const section = document.createElement('div');
            section.innerHTML = `<h2 style="padding-top:3%;padding-bottom:1%;font-size: 1.6rem">Your Watch List is Empty</h2>`;
            document.getElementById("watchlist-container").appendChild(section);
            watchlistCounter.innerHTML = "0";
        } else {
            querySnapshot.forEach((doc) => {
                const movieDetails = doc.data();
                watchList.push(movieDetails);


                let watchListCounterValue = watchList.length;

                watchlistCounter.innerHTML = `${watchListCounterValue}`;

                const section = document.createElement('div');
                const card = document.createElement('div');
                card.classList.add('card-movie');
                card.id = 'movie-card';


                const movieDetailsElement = document.createElement('div');
                movieDetailsElement.classList.add('movie-details');
                movieDetailsElement.innerHTML = `
                <div class="movie-contents">
                <div class="movie-content-poster">
                    <img class="movie-poster" src="${movieDetails.poster}" alt="movie-poster" >
                </div>
                <div class="movie-content-title-genre">
                    <a class="movie-title" >${movieDetails.title}</a><br>
                    <a class="dynamicGenre">${movieDetails.genre} </a>       
                </div>  


            </div>
            <div class="watchlist" id="watchlistButton-container" data-title="${movieDetails.title}" data-poster="${movieDetails.poster}" data-genre="${movieDetails.genre}" data-id="${movieDetails.id}" >
                    <i class="bi bi-bookmark-x-fill "  id="watchlistButton" data-title="${movieDetails.title}" data-poster="${movieDetails.poster}" data-genre="${movieDetails.genre}" data-id="${movieDetails.id}" ></i>
            </div>
            <hr>
                `;
                card.appendChild(movieDetailsElement);
                section.appendChild(card);
                document.getElementById("watchlist-container").appendChild(section);

            });

        }
    } catch (error) {
        console.error('Error getting watchlist data:', error);
    }
};
// watchListDisplay();



export const watchListRemove = async (item) => {
    console.log(item);
    const id = item.dataset.id;
    const title = item.dataset.title;

    try {
        // Find the corresponding document in Firestore and delete it
        const querySnapshot = await getDocs(query(collection(db, 'users', userId, 'watchlist'), where('id', '==', id)));

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            item.classList.remove('watchListRemove');
        });

        // Update the display after removing the movie
        // watchListDisplay();




    } catch (error) {
        console.log(`${title} not found in watchList`);
        console.error('Error removing movie from watchlist:', error);


    }
};


export const watchlistCounter = async () => {

    try {

        const querySnapshot = await getDocs(query(collection(db, 'users', userId, 'watchlist')));
        const numberOfDocuments = querySnapshot.size;
        console.log(`Number of documents in the watchlist: ${numberOfDocuments}`);
        const watchlistCounter = document.getElementById('watchlistCounter');
        watchlistCounter.innerHTML = `${numberOfDocuments}`;


    }
    catch (error) {
        console.log("Error in fetching:  ");
        console.log(error);
    }

};


// const toggleWatchListIcon = async (icon) => {
//     // Retrieve the value of the custom attribute
//     const customAttributeValue = icon.getAttribute('data-isAdded');
//     console.log(customAttributeValue); // Output: someValue
//     if(customAttributeValue === 'yes')
//     {
//         icon.style.color = 'green';

//     }
//     else if(customAttributeValue === 'no'){
//         icon.style.color = 'red';
//     }

// }

export const toggleWatchlist = async (item) => {
    const id = item.dataset.id;
    const title = item.dataset.title;
    const querySnapshot = await getDocs(query(collection(db, 'users', userId, 'watchlist'), where('id', '==', id)));
    

    if (!querySnapshot.empty) {

        item.setAttribute('data-isAdded', 'no');
        await watchListRemove(item);
        await watchlistCounter();
        // toggleWatchListIcon(item);

        watchListDisplay();
        alert(`${title} Removed from WatchList`);
        // document.getElementById("watchlistButton-container").innerHTML=`<i class="bi bi-bookmark-x-fill" id=""></i>`;


    } else {
        // item.classList.add('watchListRemove');
        item.setAttribute('data-isAdded', 'yes');
        await addToWatchlist(item);
        await watchlistCounter();
        // toggleWatchListIcon(item);
        alert(`${title} Added to the WatchList`);

    }
};
