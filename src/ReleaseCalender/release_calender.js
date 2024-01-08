
import { apiFetch } from '../scripts/apiFetch.js';

// import { addToWatchlist } from '../YourWatchList/watchlist.js';






const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];




const returnGenre = (genreIds, genreList) => {
    const genresList = [];
    genreIds.map(genreId => {
        for (let i = 0; i < genreList.genres.length; i++) {
            if (genreId == genreList.genres[i].id) {
                genresList.push(genreList.genres[i].name);
            }
        }
    });
    return genresList;

};



const upcomingMoviesSection = async () => {
    let minDate = "2023-12-20";
    let maxDate = "2024-01-10";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
    const genre_url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

    try {

        const result = await apiFetch(apiUrl);
        console.log(result);

        const genreList = await apiFetch(genre_url);
        let image_url = "https://image.tmdb.org/t/p/w185"

        let resultList = result.results;
        console.log(resultList);


        let moviesByMonth = {};
        let releasedatesArray = [];


        resultList.forEach((item) => {
            console.log(item.release_date);
            const yearMonthKey = item.release_date.substring(0, 7);
            console.log(yearMonthKey);
            if (!releasedatesArray.includes(yearMonthKey)) {
                releasedatesArray.push(yearMonthKey); //contains the release dates only

            }


            if (!moviesByMonth[yearMonthKey]) {
                moviesByMonth[yearMonthKey] = [];  // creates an empty array for the release dates
            }


            moviesByMonth[yearMonthKey].push({     // details of each movies is pushed to the created movie array
                title: item.title,
                poster: image_url + item.poster_path,
                rating: item.vote_average,
                releaseDate: item.release_date,
                genre: returnGenre(item.genre_ids, genreList),
                id: item.id
            });

        });
        console.log(moviesByMonth)


        // Sort movies within each month in descending order based on release date
        const sortedDates = releasedatesArray.sort((a, b) => new Date(b) - new Date(a));





        console.log(sortedDates);

        const movieListSorted = []; //creates a empty array to push the moies in correct upcomming order

        sortedDates.forEach(dates => {
            console.log(dates);
            console.log(moviesByMonth[dates]);
            movieListSorted.push(moviesByMonth[dates]); //they key will be the release dates
        })
        console.log(movieListSorted);


        movieListSorted.forEach(item => {
            console.log(item);
            item.map(movieList => {
                console.log(movieList);
            })
            const month_year = month[new Date(item[0].releaseDate).getMonth()] + "  " + new Date(item[0].releaseDate).getFullYear();


            const section = document.createElement('div');
            section.innerHTML = `<h2 style="padding-top:3%;padding-bottom:1%;font-size: 1.6rem">${month_year}</h2>`;

            // Create a single card for the month
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = 'movie-card';



            item.map(movie => {

                // Append each movie to the card
                const movieDetails = document.createElement('div');

                movieDetails.classList.add('movie-details');


                movieDetails.style.minHeight = '6rem';


                // movieDetails.onclick = function() {

                


                //     window.location.href = `../MovieDetails/movieDetails.html?id=${movie.id}`;
                // };
                // <a href = "../MovieDetails/movieDetails.html?id=${movie.id}" style="min-height:6rem;";
                movieDetails.innerHTML = `
                    

                        
                        <div class="movie-contents" >
                            
                                <div class="movie-content-poster">
                                    <img class="movie-poster" src="${movie.poster}" alt="movie-poster" >
                                </div>
                                <div class="movie-content-title-genre">
                                    <a class="movie-title" href='../MovieDetails/movieDetails.html?id=${movie.id}' >${movie.title} </a><br>
                                    <a class="dynamicGenre">${movie.genre} </a>       
                                </div>  
                            
                        </div>

                        <div class="watchlist" id="watchlistButton-container" data-title="${movie.title}" data-poster="${movie.poster}" data-genre="${movie.genre}" data-id="${movie.id}" >
                                <i class="bi bi-bookmark-plus-fill "  id="watchlistButton" data-title="${movie.title}" data-poster="${movie.poster}" data-genre="${movie.genre}" data-id="${movie.id}" ></i>
                        </div>
                        <hr>
                    `;
                card.appendChild(movieDetails);
            });

            // Append the card to the section
            section.appendChild(card);

            // Append the section to the container
            document.getElementById("movie-per-date").appendChild(section);
        });






    } catch (error) {
        console.log(error);
    }
}
upcomingMoviesSection();


const upcomingTVSection = async () => {

    const API_KEY = 'Bearer dd35036818633025b77e437d6e8b9964';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDM1MDM2ODE4NjMzMDI1Yjc3ZTQzN2Q2ZThiOTk2NCIsInN1YiI6IjY1ODFkODQ1YmYwZjYzMDg5MzYyYjg5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sT5e5quy6JNqGpb4QC2D008yWeeV9goKw0jwdPwFY6I'
    const tvApi = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc'
    const tv_genre_api = 'https://api.themoviedb.org/3/genre/tv/list?language=en'

    try {
        // const response = await fetch(tvApi, options);
        // const result = await response.json();
        const result = await apiFetch(tvApi);
        // const genre = await fetch(tv_genre_api, options);
        // const genreList = await genre.json();
        const genreList = await apiFetch(tv_genre_api);
        let image_url = "https://image.tmdb.org/t/p/w185"

        // console.log(genreList);
        // console.log(result.results);

        let resultList = result.results;


        let tvByMonth = {};
        let releasedatesArray = [];


        resultList.forEach((item) => {
            console.log(item.first_air_date)
            const yearMonthKey = item.first_air_date.substring(0, 7);
            if (!releasedatesArray.includes(yearMonthKey)) {
                releasedatesArray.push(yearMonthKey); //contains the release dates only

            }


            if (!tvByMonth[yearMonthKey]) {
                tvByMonth[yearMonthKey] = [];  // creates an empty array for the release dates
            }


            tvByMonth[yearMonthKey].push({     // details of each movies is pushed to the created movie array
                title: item.original_name,
                poster: image_url + item.poster_path,
                rating: item.vote_average,
                releaseDate: item.first_air_date,
                genre: returnGenre(item.genre_ids, genreList),
                id: item.id
            });

        });


        // Sort movies within each month in descending order based on release date
        const sortedDates = releasedatesArray.sort((a, b) => new Date(b) - new Date(a));

        const tvListSorted = []; //creates a empty array to push the moies in correct upcomming order

        sortedDates.map(dates => {
            tvListSorted.push(tvByMonth[dates]); //they key will be the release dates
        })


        tvListSorted.map(item => {

            const month_year = month[new Date(item[0].releaseDate).getMonth()] + "  " + new Date(item[0].releaseDate).getFullYear();


            const section = document.createElement('div');
            section.innerHTML = `<h2 style="padding-top:3%;padding-bottom:1%;font-size: 1.6rem">${month_year}</h2>`;

            // Create a single card for the month
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = 'movie-card';

            item.map(tv => {

                // Append each movie to the card
                const movieDetails = document.createElement('div');
                movieDetails.classList.add('movie-details');
                // movieDetails.onclick = function () {

                //     window.location.href = `../TvDetails/tvDetails.html?id=${tv.id}`;
                // };

                movieDetails.innerHTML = `
                <div class="movie-contents" >
                    <div class="movie-content-poster">
                        <img class="movie-poster" src="${tv.poster}" alt="movie-poster" >
                    </div>
                    <div class="movie-content-title-genre">
                        <a class="movie-title" href="../TvDetails/tvDetails.html?id=${tv.id}" >${tv.title}</a><br>
                        <a class="dynamicGenre">${tv.genre} </a>       
                    </div>  


                </div>
            <div class="watchlist" id="watchlistButtonlll" data-title="${tv.title}" data-poster="${tv.poster}" data-genre="${tv.genre}" data-id="${tv.id}" >
                    <i class="bi bi-bookmark-plus-fill "  id="watchlistButton" data-title="${tv.title}" data-poster="${tv.poster}" data-genre="${tv.genre}" data-id="${tv.id}" ></i>
            </div>
            <hr>
                    `;
                card.appendChild(movieDetails);
            });

            // Append the card to the section
            section.appendChild(card);

            // Append the section to the container
            document.getElementById("movie-per-date").appendChild(section);
        });


    } catch (error) {
        console.log(error);
    }
}




document.getElementById('movie').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    document.getElementById("movie-per-date").innerHTML = "";
    upcomingMoviesSection();
});

document.getElementById('tv').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById("movie-per-date").innerHTML = "";
    upcomingTVSection();
});




