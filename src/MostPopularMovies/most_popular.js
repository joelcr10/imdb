import { apiFetch } from '../scripts/apiFetch.js';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];






// const upcomingMoviesSection = async () => {

//     const API_KEY = 'Bearer dd35036818633025b77e437d6e8b9964';
//     const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDM1MDM2ODE4NjMzMDI1Yjc3ZTQzN2Q2ZThiOTk2NCIsInN1YiI6IjY1ODFkODQ1YmYwZjYzMDg5MzYyYjg5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sT5e5quy6JNqGpb4QC2D008yWeeV9goKw0jwdPwFY6I';
//     let minDate = "2023-12-20";
//     let maxDate = "2024-01-10";
//     const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'Authorization': ACCESS_TOKEN,
//             'accept': 'application/json'
//         }
//     };
//     try {
//         const response = await fetch(apiUrl, options);
//         const result = await response.json();
//         let image_url = "https://image.tmdb.org/t/p/w185"
//         console.log(result);
//         let resultList = result.results;
//         console.log(resultList);

//         console.log(resultList);
//         resultList.map((item) => {
//             let title = item.title;
//             let poster = image_url + item.poster_path;
//             let rating = item.vote_average;
//             let releaseDate = new Date(item.release_date) ;
//             console.log(title, rating, poster,releaseDate,months[releaseDate.getMonth()],releaseDate.getFullYear());

//             console.log(resultList);
//             const formatedate =`<h2>${months[releaseDate.getMonth()], releaseDate.getFullYear()} </h2>`;
//             let dateDiv = document.createElement('div');
//             div.setAttribute("class","date");
//             dateDiv.innerHTML = formatedate;
//             document.getElementById("movie-per-date").append(dateDiv);
//             const card = `
//                             <div class="movie-detals">
//                                 <img class="movie-poster" src="${poster}" alt="movie-poster">
//                                     <div class="details">
//                                         <a class="movie-title">${title}</a>
//                                         <div class="watchlist">
//                                             <i class="bi bi-bookmark-plus-fill"></i>
//                                         </div>

//                                     </div>
//                             </div>
//                             <hr>



//                             `;
//             let div = document.createElement('div');
//             div.setAttribute("class", "poster");
//             div.innerHTML = card;
//             // console.log(document.getElementById("movieCard")) ;
//             document.getElementById("movie-card").append(div);

//         })

//     } catch (error) {
//         console.log(error);
//     }

// }


// upcomingMoviesSection();


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









const mostPopularMovies = async () => {

    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const genre_url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
   
    try {
      
        const result = await apiFetch(apiUrl);

       
        const genreList = await apiFetch(genre_url);
        let image_url = "https://image.tmdb.org/t/p/w185"

        
        let resultList = result.results;
        console.log(resultList);
       


        let moviesByMonth = {};
        let popularityArray = [];
        console.log(resultList);
        console.log(resultList.popularity);

        resultList.forEach((item) => {
            console.log(item.popularity);
            popularityArray.push(item.popularity); //contains the release dates only


            if (!moviesByMonth[item.popularity]) {
                moviesByMonth[item.popularity] = [];  // creates an empty array for the release dates
            }


            moviesByMonth[item.popularity].push({     // details of each movies is pushed to the created movie array
                title: item.title,
                poster: image_url + item.poster_path,
                rating: parseFloat(item.vote_average).toFixed(2),
                releaseDate: item.release_date,
                genre: returnGenre(item.genre_ids, genreList),
                popularity : item.popularity,
                id: item.id,
            });

        });
        console.log(moviesByMonth);

        const highPopularity = popularityArray.sort((a, b) => b-a);
        
        console.log(highPopularity);

        const popularMovieListSorted = []; //creates a empty array to push the moies in correct upcomming order

        highPopularity.map(popularity => {
            popularMovieListSorted.push(moviesByMonth[popularity]); //they key will be the release dates
        })
        console.log(popularMovieListSorted);
      
        const section = document.createElement('div');
            
        // Create a single card for the month
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = 'movie-card';

       
        popularMovieListSorted.map(item => {

          

            item.map(movie => {
                // console.log(movie.releaseDate);
                let releaseYear = new Date(movie.releaseDate).getFullYear();
                  
                // Append each movie to the card
                const movieDetails = document.createElement('div');
                movieDetails.classList.add('movie-details');

                movieDetails.onclick = function() {
                    
                    window.location.href = `../MovieDetails/movieDetails.html?id=${movie.id}`;
                };

                movieDetails.innerHTML = `
                        <img  class="popularimg " src="${movie.poster}" alt="movie-poster">
                        <a class="movie-title ">${movie.title}</a><br>
                        <a class="dynamicYear">${releaseYear}</a>
                        <a class="dynamicRating "><i id="ratingStar" class="bi bi-star-fill"></i>${movie.rating} </a>         
                            
                        <div class="info">
                          <i class="bi bi-info-circle" onclick="showMovieDetails('${movie.title}', '${movie.releaseDate}', '${movie.genre.join(', ')}')"></i>
                          <div class="moviePopup" id="moviePopup"></div>
                        </div>
                        <hr class="horizontal">
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
mostPopularMovies();



const showMovieDetails = (title, releaseDate, genre) => {
    const popupBox = document.getElementById('moviePopup');
    popupBox.innerHTML = `
        <p>Title: ${title}</p>
        <p>Release Date: ${releaseDate}</p>
        <p>Genre: ${genre}</p>
       
    `;
    popupBox.style.display = "block";
};



document.addEventListener('click', function (event) {
    const popupBox = document.getElementById('moviePopup');
    
    // Check if the clicked element is not the info icon or inside the popup
    if (!event.target.closest('.bi-info-circle') && !event.target.closest('#moviePopup')) {
        if (popupBox.style.display === 'block') {
            popupBox.style.display = 'none';
        }
    }
});




