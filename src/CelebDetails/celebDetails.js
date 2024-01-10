import { tmdbAPI } from "../../config.js";
import { apiFetch } from "../scripts/apiFetch.js";

const API_KEY = tmdbAPI.API_KEY;

let image_url = "https://image.tmdb.org/t/p/original";
let celebId = "";
let movieId = "";


document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  celebId = urlParams.get("id");

  if (celebId) {
    console.log(celebId);
    document.getElementById("topSection").textContent = "";
    celebrity(celebId);
  } else {
    console.error("Movie ID not provided in URL");
  }
});

const detailedView = async (id) => {
  const response = await apiFetch(
    `https://api.themoviedb.org/3/person/${id}?language=en-US`
  );

  console.log(response);

  return response;
};

const movies = async (person) => {
  const response = await apiFetch(
    `https://api.themoviedb.org/3/search/person?query=${person}&include_adult=false&language=en-US&page=1`
  );

  return response.results[0];
};

const setMovieDetails = (item) => {
  console.log(item);
  
  movieId = item.id;

  
  if (movieId) {
    console.log(movieId);
    fetchPhoto(movieId);
    fetchVideo(movieId);
    fetchSimilar(movieId);
  } 
};

const createTopSectionCard = (details) => {
  let name = details.name || "";
  let poster = details.profile_path ? image_url + details.profile_path : "";
  let description = details.biography || "";
  description = description.split(".").slice(0,6).join(".")+("...");

  let birthday = details.birthday || "";
  let knownFor = details.known_for_department || "";
  let placeOfBirth = details.place_of_birth || "";
  let popularity = details.popularity || "";

  const card = `
      <div id="celebName">${name}</div>
      <div id="knownFor">Known For: &nbsp ${knownFor}</div>
      <div><img src="${poster}" alt="" id="celebPoster"></div>
      <div id="description">${description}</div>
      <div id="trailer" >  </div>
      <div id="dateOfBirth">${birthday}</div> 
      <div id="popularity">Popularity: &nbsp ${popularity}</div>
      <div id="placeOfBirth">${placeOfBirth}</div>
  `;

  appendTopSection(card);
};


let x = 0;
const appendTopSection = (card) => {
  if (x == 0) {
    let div = document.createElement("div");
    div.innerHTML = card;
    document.getElementById("topSection").append(div);
    x = x + 1;
  } else {
  }
};
export const celebrity = async (id) => {
  let details = await detailedView(id);
  let movieDetails = await movies(details.name);
  console.log(movieDetails);

  // Check if details is defined and not null

  if (details) {
    let topSectionCard = createTopSectionCard(details);
    appendTopSection(topSectionCard);
  } else {
    console.error("Unable to fetch details for the celebrity");
  }

  for (let item of movieDetails.known_for) {
    setMovieDetails(item);
  }
};




const fetchPhoto = async(movieId) => {
  await movieImagesApi(movieId);
}

const fetchVideo = async(movieId) => {
  await movieVideosApi(movieId);
}

const fetchSimilar = async(movieId) => {
  await similarMoviesApi(movieId);
}


const movieImagesApi = async (movieId) =>{
  console.log("inside movie images");
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/images`;
 
  try{
    const response = await apiFetch(apiUrl);
    
    console.log(response);
    const posterList = response.backdrops;
    // console.log(posterList);
    let image_url = "https://image.tmdb.org/t/p/original";

    for(let i=0;i<posterList.length && i<10;i++){
        const photos = image_url+ posterList[i].file_path;
        console.log(photos);
        let img = document.createElement('img');
        img.setAttribute("src",photos);
        document.getElementById("photos-container").append(img);

    }
  }catch(error){
    console.log(error);
  }
}


const movieVideosApi = async (movieId) =>{
  console.log("inside movie videos");
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  
  try{
    const response = await apiFetch(apiUrl);
    console.log("started fetching");
    console.log(response);
    console.log("video over");
     const movieVideos = response.results;
    
     console.log(movieVideos);
   
    const movieTrailer = movieVideos.filter( movie => {
                        const name =  movie.name;
                        if(name.includes("Trailer")){
                          return true;
                        }
    });
    console.log(movieTrailer);
    let youtubeUrl = "https://www.youtube.com/embed/";
    console.log(youtubeUrl+movieTrailer[0].key);
    document.getElementById("video").setAttribute("src",youtubeUrl+movieTrailer[0].key+"?autoplay=1");

    //setting iframe 
    for(let i=0; i<movieVideos.length;i++){
      let iframe = document.createElement('iframe');
      iframe.setAttribute("src",youtubeUrl+movieVideos[i].key);
      iframe.setAttribute("frameborder","0");
      iframe.setAttribute("allowfullscreen","true");
      iframe.setAttribute("class","vid");
      console.log("iframe",iframe);
      document.getElementById("videos-slider").appendChild(iframe);
      if(x ==1){
        document.getElementById("trailer").append(iframe);
        x++;
      }
    }

  }catch(error){
    console.log(error);

  }
}

const similarMoviesApi = async (movieId) =>{
  console.log("inside similar movies");
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
 

  try{
    const response = await apiFetch(apiUrl);
    const result = response;
    
    console.log(result.results);

    let image_url = "https://image.tmdb.org/t/p/original";
  
    console.log("similar");
    const resultList = result.results;

    resultList.map((item) =>{
      let title = item.title;
      let poster = image_url+item.poster_path;
      let rating = item.vote_average;
      let id = item.id;
      console.log(title,rating,poster);
      const card = `
                  <a href="../MovieDetails/movieDetails.html?id=${id}">
                      <img src="${poster}" alt="">
                      <div class="card-text">
                          <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                          <h3>${title}</h3>
                          <button><span>+</span> Watchlist</button>
                          
                      </div>
                  </a>
                  `;
      let div = document.createElement('div');
      div.setAttribute("class","card");
      div.innerHTML = card;
      document.getElementById("similar-movies").append(div);
  })

  }catch(error){
    console.log(error);
    
  }

  
  
}