import { apiFetch } from "../scripts/apiFetch.js";
import {openRatingModal,selectStar, hoverStar,resetStarColors,closeRatingModal,selectedRatingValue,displayUserRating} from "../MovieDetails/userrating.js";
// import {} from "../UserRating/userratingDB.js";

let movieId = "";
export var movieNameGlobal = "";
export var movieImage = "";
let recentmovie_list = JSON.parse(sessionStorage.getItem("Recent Movies")) || [];

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');
    
    if (movieId) {
        console.log(movieId);
        // fetchMovieDetails(movieId);
        fetchAllApi(movieId);
        if(!recentmovie_list.includes(movieId)){
          recentmovie_list.push(movieId);
          }
          console.log(recentmovie_list);
      
          // Store the updated array in sessionStorage
          sessionStorage.setItem("Recent Movies", JSON.stringify(recentmovie_list));
    } else {
      console.error('Movie ID not provided in URL');
    }
  });

const fetchAllApi = async (movieId) => {
  await movieDetailsApi(movieId);
  await movieCastApi(movieId);
  await movieImagesApi(movieId);
  await movieVideosApi(movieId);
  await similarMoviesApi(movieId);

  // document.getElementById("journalButton").onclick= function(){
  //   addEntryToDom(event);
  // }

  document.getElementById("rating-icon").onclick = function(){
    var selectedRating = 0;
    const urlParams = new URLSearchParams(window.location.search);
    let movieId = urlParams.get('id');
    openRatingModal(`${movieNameGlobal}`,`${movieId}`);
    let starIcon = document.getElementsByClassName("star");
    console.log("star icon",starIcon);

    for(let i=0;i<starIcon.length;i++){
      let dataValue = starIcon[i].getAttribute("data-value");
      starIcon[i].onmouseover = function(){
        hoverStar(dataValue);
      };

      starIcon[i].onclick = function(){
        selectedRating = dataValue;
        selectStar(dataValue);
      }

      starIcon[i].onmouseout =function(){
        resetStarColors(dataValue);
      }
    
    }

    let closeButton = document.getElementById("close");
    closeButton.onclick = function(){
      closeRatingModal();
    }

    let rateButton = document.getElementById("rateButton");
    rateButton.onclick = function(){
      displayUserRating();
    }
  }
  
};





const movieDetailsApi = async (movieId) => {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  console.log(apiUrl);
  // const apiUrl = 'https://api.themoviedb.org/3/movie/572802?language=en-US';
  const API_KEY = "Bearer 8b701ace30227088c2f1ef89b747c764";
  const ACCESS_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA";

  const options = {
    method: "GET",
    headers: {
      Authorization: ACCESS_TOKEN,
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    let image_url = "https://image.tmdb.org/t/p/original";

    console.log("movie", result);
    const movieTitle = result.title;
    movieNameGlobal = movieTitle;
    localStorage.setItem('journal-movie-title',movieNameGlobal);
    const movieOverview = result.overview;
    const releaseYear = result.release_date.slice(0, 4);
    const movieRating = result.vote_average.toFixed(1);
    const moviePopularity = result.popularity;
    const movieTagline = result.tagline;
    const movieWebsite = result.homepage;
    const genreList = result.genres;
    const poster = image_url + result.poster_path;
    movieImage = poster;
    localStorage.setItem('journal-movie-image',movieImage);
    const movieBudget = result.budget;
    const movieRuntime = result.runtime;
    const movieReleaseDate = result.release_date;
    const countryOrigin = result.production_countries[0].name;
    const movieLanguage = result.spoken_languages[0].name;

    document.getElementById("movie-title").innerText = movieTitle;
    document.getElementById("movie-duration").innerHTML = movieRuntime;
    document.getElementById("release-year").innerText = releaseYear;
    document.getElementById("imdb-rating").innerText = movieRating;
    document.getElementById("movie-popularity").innerText =
      moviePopularity.toFixed(0);
    document.getElementById("movie-poster").setAttribute("src", poster);
    document.getElementById("official-movie-site").innerText = movieWebsite;
    document
      .getElementById("official-movie-site")
      .setAttribute("href", movieWebsite);
    document
      .getElementById("official-movie-site")
      .setAttribute("target", "_blank");

    document.getElementById("movie-language").innerText = movieLanguage;
    document.getElementById("movie-budget").innerText = "$" + movieBudget;
    for (let i = 0; i < genreList.length; i++) {
      let label = document.createElement("label");
      label.innerText = genreList[i].name;
      document.getElementById("genre-container").append(label);
    }

    document.getElementById("summary-container").innerText = movieOverview;
    document.getElementById("storyline").innerText = movieOverview;

    document.getElementById("tagline").innerText = movieTagline;

    for (let i = 0; i < genreList.length; i++) {
      const genre = `${genreList[i].name} &nbsp; <div class="dot"></div>`;
      const span = document.createElement("span");
      span.innerHTML = genre;
      document.getElementById("genre-list-span").append(span);
    }

    document.getElementById("release-date").innerText =
      formatReleaseDate(movieReleaseDate);
    document.getElementById("countryOrigin").innerText = countryOrigin;
    // console.log(movieTitle,releaseYear,movieOverview,movieRating);
  } catch (error) {
    console.log(error);
  }
};

const movieCastApi = async (movieId) => {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  console.log(apiUrl);
  // const apiUrl = 'https://api.themoviedb.org/3/movie/572802?language=en-US';
  const API_KEY = "Bearer 8b701ace30227088c2f1ef89b747c764";
  const ACCESS_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA";

  const options = {
    method: "GET",
    headers: {
      Authorization: ACCESS_TOKEN,
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    // console.log(result.crew);

    const castList = result.cast;

    let image_url = "https://image.tmdb.org/t/p/original";

    //displaying the cast
    for (let i = 0; i < castList.length && i < 10; i++) {
      const castName = castList[i].name;
      const castCharacter = castList[i].character;
      const profile = image_url + castList[i].profile_path;
      const castDetails = `<img src="${profile}" alt="${castName} photos">
                              <div class="cast-details">
                                <h1>${castName}</h1>
                                <label>${castCharacter} </label>
                              </div>
                          `;
      const div = document.createElement("div");
      div.setAttribute("class", "cast");
      div.innerHTML = castDetails;
      document.getElementById("cast-container").append(div);
    }

    document.getElementById("star1").innerText = castList[0].name;
    document.getElementById("star2").innerText = castList[1].name;

    //displaying the crew
    const crewList = result.crew;
    //storing the directors

    let directingNames = crewList.filter(
      (person) => person.known_for_department == "Directing"
    );
    document.getElementById("director-name").innerText = directingNames[0].name;
    document.getElementById("director-name-bts").innerText =
      directingNames[0].name;

    let writersNames = crewList.filter(
      (person) => person.known_for_department == "Writing"
    );
    // console.log(writersNames);
    document.getElementById("writers-name").innerText = writersNames[0].name;
    document.getElementById("writers-name-bts").innerText =
      writersNames[0].name;
  } catch (error) {
    console.log(error);
  }
};

const movieImagesApi = async (movieId) => {
  console.log("inside movie images");
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/images`;
  console.log(apiUrl);
  // const apiUrl = 'https://api.themoviedb.org/3/movie/572802?language=en-US';
  const API_KEY = "Bearer 8b701ace30227088c2f1ef89b747c764";
  const ACCESS_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA";

  const options = {
    method: "GET",
    headers: {
      Authorization: ACCESS_TOKEN,
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    console.log(result.backdrops);
    const posterList = result.backdrops;
    // console.log(posterList);
    let image_url = "https://image.tmdb.org/t/p/original";

    for (let i = 0; i < posterList.length && i < 10; i++) {
      const photos = image_url + posterList[i].file_path;
      console.log(photos);
      let img = document.createElement("img");
      img.setAttribute("src", photos);
      document.getElementById("photos-container").append(img);
    }
  } catch (error) {
    console.log(error);
  }
};

const movieVideosApi = async (movieId) => {
  console.log("inside movie videos");
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  // const apiUrl = 'https://api.themoviedb.org/3/movie/572802?language=en-US';
  const API_KEY = "Bearer 8b701ace30227088c2f1ef89b747c764";
  const ACCESS_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA";

  const options = {
    method: "GET",
    headers: {
      Authorization: ACCESS_TOKEN,
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    console.log(result.results);
    const movieVideos = result.results;
    const movieTrailer = movieVideos.filter((movie) => {
      const name = movie.name;
      if (name.includes("Trailer")) {
        return true;
      }
    });
    console.log(movieTrailer);
    let youtubeUrl = "https://www.youtube.com/embed/";
    console.log(youtubeUrl + movieTrailer[0].key);
    document
      .getElementById("trailer-video")
      .setAttribute("src", youtubeUrl + movieTrailer[0].key + "?autoplay=1");

    for (let i = 0; i < movieVideos.length; i++) {
      let iframe = document.createElement("iframe");
      iframe.setAttribute("src", youtubeUrl + movieVideos[i].key);
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("class", "vid");
      document.getElementById("videos-slider").append(iframe);
    }
  } catch (error) {
    console.log(error);
  }
};

const similarMoviesApi = async (movieId) => {
  console.log("inside similar movies");
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;

  // const apiUrl = 'https://api.themoviedb.org/3/movie/572802?language=en-US';
  const API_KEY = "Bearer 8b701ace30227088c2f1ef89b747c764";
  const ACCESS_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA";

  const options = {
    method: "GET",
    headers: {
      Authorization: ACCESS_TOKEN,
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();

    console.log(result.results);

    let image_url = "https://image.tmdb.org/t/p/original";

    console.log("similar");
    const resultList = result.results;

    resultList.map((item) => {
      let title = item.title;
      let poster = image_url + item.poster_path;
      let rating = item.vote_average;
      let id = item.id;
      console.log(title, rating, poster);
      const card = `
                    <a href="movieDetails.html?id=${id}">
                        <img src="${poster}" alt="">
                        <div class="card-text">
                            <label><img src="../../assets/img/star.png">${rating.toFixed(
                              1
                            )}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                            <h3>${title}</h3>
                            <button><span>+</span> Watchlist</button>
                            
                        </div>
                    </a>
                    `;
      let div = document.createElement("div");
      div.setAttribute("class", "card");
      div.innerHTML = card;
      document.getElementById("similar-movies").append(div);
    });
  } catch (error) {
    console.log(error);
  }
};

const formatReleaseDate = (movieReleaseDate) => {
  const date = movieReleaseDate.split("-");
  console.log(date);
  let monthNumber = parseInt(date[1]);
  let monthName = "";
  switch (monthNumber) {
    case 1:
      monthName = "January";
      break;
    case 2:
      monthName = "February";
      break;
    case 3:
      monthName = "March";
      break;
    case 4:
      monthName = "April";
      break;
    case 5:
      monthName = "May";
      break;
    case 6:
      monthName = "June";
      break;
    case 7:
      monthName = "July";
      break;
    case 8:
      monthName = "August";
      break;
    case 9:
      monthName = "September";
      break;
    case 10:
      monthName = "October";
      break;
    case 11:
      monthName = "November";
      break;
    case 12:
      monthName = "December";
      break;
    default:
      monthName = "Invalid month number";
      break;
  }

  return monthName + " " + date[2] + ", " + date[0];
};

// fetchAllApi(movieId);
