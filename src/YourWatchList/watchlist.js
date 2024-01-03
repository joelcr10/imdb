const watchList = [];
console.log(!watchList);

const addToWatchlist = (item) => {
    const title = item.dataset.title;
    const poster = item.dataset.poster;
    const genre = item.dataset.genre;

    const movieDetails = {
        title: title,
        poster: poster,
        genre: genre,
    };

    // Check if the movie is not already in the watchlist
    if (!watchList.some((movie) => movie.title === title)) {
        watchList.push(movieDetails);
        console.log(`${title} added to Watchlist`);
    } else {
        console.log(`${title} is already in Watchlist`);
    }


};


// Attach the event listener to the bookmark icon
document.getElementById('movie-per-date').addEventListener('click', function (event) {
    if (event.target.matches('.watchlist')) {
        addToWatchlist(event.target);

    }
    watchListDisplay();

});


const watchListDisplay = () => {

    document.getElementById("watchlist-container").innerHTML = "";


    if (watchList.length === 0) {


        const section = document.createElement('div');
        console.log("hi ")
        section.innerHTML = `<h2 style="padding-top:3%;padding-bottom:1%;font-size: 1.6rem">Yor Watch List is Empty</h2>`;
        document.getElementById("watchlist-container").appendChild(section);




    } else {
        watchList.forEach(movie => {
            console.log(movie);

            const section = document.createElement('div');
            // section.innerHTML = `<h2 style="padding-top:3%;padding-bottom:1%;font-size: 1.6rem">${month_year}</h2>`;

            // Create a single card for the month
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = 'movie-card';



            // Append each movie to the card
            const movieDetails = document.createElement('div');
            movieDetails.classList.add('movie-details');
            movieDetails.innerHTML = `
                    <img class="movie-poster" src="${movie.poster}" alt="movie-poster">
                    <a class="movie-title">${movie.title}</a><br>

                         <a class="dynamicGenre">${movie.genre} </a>         

                    <div class="watchlist" id="watchlistButton" data-title="${movie.title}" data-poster="${movie.poster}" data-genre="${movie.genre}" onclick="addToWatchlist(this)"">
                        
                    <i class="bi bi-file-x" id="removeWatchList" data-title="${movie.title}" data-poster="${movie.poster}" data-genre="${movie.genre}" onclick="watchListRemove(this)" ></i>
                    </div>
                    <hr>
                `;
            card.appendChild(movieDetails);


            // Append the card to the section
            section.appendChild(card);

            // Append the section to the container
            document.getElementById("watchlist-container").appendChild(section);

        });
    }
}


watchListDisplay();

const watchListRemove = (item) => {
    console.log(item);
    const title = item.dataset.title;

    watchList.forEach((movie, index) => {
        console.log(movie.title);
        if (movie.title === title) {
            watchList.splice(index, 1);
        }
    });
}


document.getElementById('watchlist-container').addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.matches('#removeWatchList')) {
        console.log("hi");
        watchListRemove(event.target);
        watchListDisplay();


    }


});
