import { apiFetch } from "../scripts/apiFetch.js";

let movieId = "";
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    movieId = urlParams.get('id');
    
    if (movieId) {
        console.log(movieId);
        // fetchMovieDetails(movieId);
        fetchAllApi(movieId);
    } else {
      console.error('Movie ID not provided in URL');
    }
  });
  const fetchAllApi = async (movieId) =>{
    await movieDetailsApi(movieId);
    
    await movieImagesApi(movieId);
   
}

  const movieImagesApi = async (movieId) =>{
    console.log("inside movie images");
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/images`;
    console.log(apiUrl);
    // const apiUrl = 'https://api.themoviedb.org/3/movie/572802?language=en-US';
    const API_KEY = 'Bearer 8b701ace30227088c2f1ef89b747c764';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA';

    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,    
            'accept': 'application/json'
        }
    };

    try{
      const response = await fetch(apiUrl,options);
      const result = await response.json();
      console.log(result.backdrops);
      const posterList = result.backdrops;
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