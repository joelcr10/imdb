import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, query, where, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import {firebaseCredentials} from '../../config.js';

const firebaseConfig = firebaseCredentials;


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const watchList = [];

// Assuming you have the user's ID after authentication

const userId = localStorage.getItem('userId'); 
console.log(userId);


export const addToWatchlist = async (item) => {

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

        let index = 0;
        const watchListCollection = collection(db, 'users', userId, 'watchlist');
        const querySnapshot = await getDocs(query(collection(db, 'users', userId, 'watchlist'), where('id', '==', id)));
        console.log(querySnapshot);
        querySnapshot.forEach(async (doc) => {
            const movieData = doc.data();
            console.log(movieData);
            if (movieData.id === id) {
                index = 1;
            }

        });

        if (index === 0) {

            watchList.push(movieDetails);
            console.log(`${movieDetails.title} added to Watchlist`);

            // Add the movie to Firestore
            await addDoc(watchListCollection, movieDetails);

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
    if (!userId) {
        document.getElementById("watchlist-container").innerHTML = `<h2 style="padding-top:3%;padding-bottom:1%;padding-left:2%;font-size: 1.6rem">Sign in to see your Watchlist</h2>`;

    } else {
        try {

            // Assuming watchListCollection is a valid Firestore collection reference
            const watchListCollection = collection(db, 'users', userId, 'watchlist');
            const querySnapshot = await getDocs(watchListCollection);
            const watchlistCounter = document.getElementById('watchlistCounter');
            // Clear the watchList array before updating it
            watchList.length = 0;

            if (querySnapshot.empty) {
                const section = document.createElement('div');
                section.innerHTML = `<h2 style="padding-top:3%;padding-bottom:1%;padding-left:2%;font-size: 1.6rem">Your Watch List is Empty</h2>`;
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
    }


};



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


const togglepopup = (title, op) => {
    const popup = document.getElementById("popup-container-release");

    if (popup.style.display === 'none') {

        if (op === 'removed') {
            document.getElementById('pop-head').innerHTML = `${title} Removed from Watch List`;
        } else if (op === 'added') {
            document.getElementById('pop-head').innerHTML = `${title} Added to Watch List`;
        }
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}


export const toggleWatchlist = async (item) => {
    const id = item.dataset.id;
    const title = item.dataset.title;
    const querySnapshot = await getDocs(query(collection(db, 'users', userId, 'watchlist'), where('id', '==', id)));


    if (!querySnapshot.empty) {

        item.classList.replace('bi-bookmark-x-fill', 'bi-bookmark-plus-fill');

        try { togglepopup(title, 'removed'); } catch (e) { console.log(e); }

        await watchListRemove(item);
        await watchlistCounter();

        watchListDisplay();

    } else {
        item.classList.replace('bi-bookmark-plus-fill', 'bi-bookmark-x-fill');
        document.getElementById("popup-container-release").style.display = 'none';
        togglepopup(title, 'added');
        await addToWatchlist(item);
        await watchlistCounter();

    }
};


try {
    document.getElementById('popup-container-release').addEventListener('click', function (event) {
        console.log(event.target);
        if (event.target.matches('#open-popup')) {
            togglepopup(event.target,"hi");   
        }
        if (event.target.matches('.close') || event.target.matches('.okay')) {
            togglepopup(event.target, "hi");
        }

    })
} catch (e) {
    console.log(e);
}


export const watchlistIconToggle = async (id) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'users', userId, 'watchlist'), where('id', '==', id)));

        if (!querySnapshot.empty) {
            console.log("Movie is in the watchlist");

            querySnapshot.forEach((doc) => {
                const movieDetails = doc.data();
                console.log(id);
                console.log(movieDetails.id);
            });
        } else {
            console.log("Movie is not in the watchlist");
        }

    } catch (e) {
        console.log(e);
    }
}

