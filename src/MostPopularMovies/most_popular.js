import { apiFetch } from '../scripts/apiFetch.js';


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



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



const mostPopularMovies = async (sortBy) => {

    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const genre_url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
   
    try {
      
        const result = await apiFetch(apiUrl);

       
        const genreList = await apiFetch(genre_url);
        let image_url = "https://image.tmdb.org/t/p/w185"

        
        let resultList = result.results;
        console.log(resultList);
       

        let moviesByDate = {};
        let movesByRating = {};
        let moviesByPopularity = {};
        let moviesByAlphabetic = {};
    
        let popularityArray = [];
        let ratingArray = [];
        let releasedatesArray = [];
        let alphabeticArray = [];
        console.log(resultList);
        console.log(resultList.popularity);

        resultList.forEach((item) => {
            console.log(item.popularity);
            popularityArray.push(item.popularity); //contains the movie popularity only
            ratingArray.push(parseFloat(item.vote_average).toFixed(2));
            console.log(ratingArray);
            releasedatesArray.push(item.release_date);
            console.log(releasedatesArray);
            alphabeticArray.push(item.title);
            console.log(alphabeticArray);



            if (!moviesByPopularity[item.popularity]) {
                moviesByPopularity[item.popularity] = [];  // creates an empty array for the release dates
            }


            moviesByPopularity[item.popularity].push({     // details of each movies is pushed to the created movie array
                title: item.title,
                poster: image_url + item.poster_path,
                rating: parseFloat(item.vote_average).toFixed(2),
                releaseDate: item.release_date,
                genre: returnGenre(item.genre_ids, genreList),
                popularity : item.popularity,
                id: item.id,
            });

            if (!movesByRating[parseFloat(item.vote_average).toFixed(2)]) {
                movesByRating[parseFloat(item.vote_average).toFixed(2)] = [];  // creates an empty array for the release dates
            }


            movesByRating[parseFloat(item.vote_average).toFixed(2)].push({     // details of each movies is pushed to the created movie array
                title: item.title,
                poster: image_url + item.poster_path,
                rating: parseFloat(item.vote_average).toFixed(2),
                releaseDate: item.release_date,
                genre: returnGenre(item.genre_ids, genreList),
                popularity : item.popularity,
                id: item.id,
            });

            if (!moviesByDate[item.release_date]) {
                moviesByDate[item.release_date] = [];  // creates an empty array for the release dates
            }


            moviesByDate[item.release_date].push({     // details of each movies is pushed to the created movie array
                title: item.title,
                poster: image_url + item.poster_path,
                rating: parseFloat(item.vote_average).toFixed(2),
                releaseDate: item.release_date,
                genre: returnGenre(item.genre_ids, genreList),
                popularity : item.popularity,
                id: item.id,
            });

            if (!moviesByAlphabetic[item.title]) {
                moviesByAlphabetic[item.title] = [];  // creates an empty array for the release dates
            }


            moviesByAlphabetic[item.title].push({     // details of each movies is pushed to the created movie array
                title: item.title,
                poster: image_url + item.poster_path,
                rating: parseFloat(item.vote_average).toFixed(2),
                releaseDate: item.release_date,
                genre: returnGenre(item.genre_ids, genreList),
                popularity : item.popularity,
                id: item.id,
            });





        });
       

        const highPopularity = popularityArray.sort((a, b) => b-a);

        const highRating = ratingArray.sort((a,b)=>b-a);

        const releasedDateDesc = releasedatesArray.sort((a, b) => new Date(b) - new Date(a));

        const alphabeticAsc = alphabeticArray.sort((a, b) => a.localeCompare(b));

        
        console.log(highPopularity);
        console.log(highRating);
        console.log(releasedDateDesc);
        console.log(alphabeticAsc);


        const popularMovieListSortedByPopularity = [];     //creates a empty array to push the movies in sorted popularity
        const popularMovieListSortedByRating = [];         //creates a empty array to push the movies in sorted by rating 
        const popularMovieListSortedByReleasedDate = [];   //creates a empty array to push the movies in sorted by release date 
        const popularMovieListSortedByAlphabet = [];       //creates a empty array to push the movies in sorted Alphabet



        highPopularity.map(popularity => {
            popularMovieListSortedByPopularity.push(moviesByPopularity[popularity]); //the key will be the popularity
        })
        console.log(popularMovieListSortedByPopularity);

        highRating.map(rating => {
            popularMovieListSortedByRating.push(movesByRating[rating]);
        })
        console.log(popularMovieListSortedByRating);

        releasedDateDesc.map(dates => {
            popularMovieListSortedByReleasedDate.push(moviesByDate[dates]);
        })
        console.log(popularMovieListSortedByReleasedDate);  
        
        alphabeticAsc.map(alphabet => {
            popularMovieListSortedByAlphabet.push(moviesByAlphabetic[alphabet]);
        })
        console.log(popularMovieListSortedByAlphabet);  



            
        if (sortBy === 'popularity') {
            displayMovies(popularMovieListSortedByPopularity); 
            
        } else if (sortBy === 'rating') {
            displayMovies(popularMovieListSortedByRating); 
            
        } else if (sortBy === 'releaseDate') {
            displayMovies(popularMovieListSortedByReleasedDate); 
            
        } else if (sortBy === 'alphabetic') {
            displayMovies(popularMovieListSortedByAlphabet); 
            
        }

    } catch (error) {
        console.log(error);
    }
}
mostPopularMovies("popularity");



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


const displayMovies = (movieList) =>{
    document.getElementById("movie-per-date").innerHTML = "";
    const section = document.createElement('div');
         
        // Create a single card for the month
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = 'movie-card';
        
    movieList.map(item => {

          

        item.map(movie => {
            // console.log(movie.releaseDate);
            let releaseYear = new Date(movie.releaseDate).getFullYear();
              
            // Append each movie to the card
            const movieDetails = document.createElement('div');
            movieDetails.classList.add('movie-details');

            movieDetails.innerHTML = `   
            <div class = "popular-movies-maincontainer">
                <div class="popular-movies">
                    <a href='../MovieDetails/movieDetails.html?id=${movie.id}' id = "redirect">
                        <img  class="popularimg " src="${movie.poster}" alt="movie-poster" >
                    </a>
                </div>
                <div class = "movie-info">
                    <a class="popular-movie-title " href='../MovieDetails/movieDetails.html?id=${movie.id}'>${movie.title}</a><br>
                    <a class="popular-dynamicYear">${releaseYear}</a>
                    <a class="popular-dynamicRating "><i id="ratingStar" class="bi bi-star-fill"></i>&nbsp;${movie.rating} </a>         
                </div>
        
                <div class="info">
                    <i class="bi bi-info-circle" onclick="showMovieDetails('${movie.title}', '${movie.releaseDate}', '${movie.genre.join(', ')}')"></i>
              
                </div>
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
} 

document.getElementById('dropdown').addEventListener('change', function() {
    var selectedValue = this.value;

    // Perform actions based on the selected value
    if (selectedValue === 'Popularity') {
        mostPopularMovies("popularity");
        
    } else if (selectedValue === 'Imdb Rating') {
        mostPopularMovies("rating")
        
    } else if (selectedValue === 'Date of release') {
        mostPopularMovies("releaseDate");
        
    } else if (selectedValue === 'Alphabetical') {
        mostPopularMovies("alphabetic");
        
    }
});