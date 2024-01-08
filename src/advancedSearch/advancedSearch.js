import { tmdbAPI } from "../../config.js";

let image_url = "https://image.tmdb.org/t/p/original";
const ACCESS_TOKEN = tmdbAPI.ACCESS_TOKEN;



const createResultCardForPerson = (item) =>{
  let poster = item.profile_path ? image_url + item.profile_path : image_url + item.poster_path;

      let title = item.title || item.name;

      
      let overview = item.overview || item.known_for_department || "";
      overview = overview.split(".").slice(0, 2).join(".") + ".";
      let releaseDate = item.release_date || "2000-01-23";
      let popularity = item.popularity;
      let voteCount = item.voteCount;
      if (voteCount == undefined) {
        voteCount = 2000;
      }

      const card = `<a href = "../CelebDetails/celebDetails.html?id=${item.id}">
        <div class="poster text"><img src="${poster}"></div>
        <div class="title text">${title}</div>
        <div class="overview text">${overview}</div>
        <div class="releaseDate text">${releaseDate}</div>
        <div class="popularity text">${popularity}</div>
        <div class="voteCount text">${voteCount}</div>
        </a>
      `;

     return card;
}

  
  const createResultCardForMovie = (item) =>{
    let poster = item.profile_path ? image_url + item.profile_path : image_url + item.poster_path;

        let title = item.title || item.name;

        
        let overview = item.overview || item.known_for_department || "";
        overview = overview.split(".").slice(0, 2).join(".") + ".";
        let releaseDate = item.release_date || "2000-01-23";
        let popularity = item.popularity;
        let voteCount = item.voteCount;
        if (voteCount == undefined) {
          voteCount = 2000;
        }

        const card = `<a href = "../MovieDetails/movieDetails.html?id=${item.id}">
          <div class="poster text"><img src="${poster}"></div>
          <div class="title text">${title}</div>
          <div class="overview text">${overview}</div>
          <div class="releaseDate text">${releaseDate}</div>
          <div class="popularity text">${popularity}</div>
          <div class="voteCount text">${voteCount}</div>
          </a>
        `;

       return card;
 }

 
 const createResultCardForTv = (item) =>{
  let poster = item.profile_path ? image_url + item.profile_path : image_url + item.poster_path;

      let title = item.title || item.name;

      
      let overview = item.overview || item.known_for_department || "";
      overview = overview.split(".").slice(0, 2).join(".") + ".";
      let releaseDate = item.release_date || "2000-01-23";
      let popularity = item.popularity;
      let voteCount = item.voteCount;
      if (voteCount == undefined) {
        voteCount = 2000;
      }

      const card = `<a href = "../TvDetails/TvDetails.html?id=${item.id}">
        <div class="poster text"><img src="${poster}"></div>
        <div class="title text">${title}</div>
        <div class="overview text">${overview}</div>
        <div class="releaseDate text">${releaseDate}</div>
        <div class="popularity text">${popularity}</div>
        <div class="voteCount text">${voteCount}</div>
        </a>
      `;

     return card;
}

 const appendResultCard = (card) =>{
  let div = document.createElement('div');
  div.setAttribute("class", "smallBox");
  div.innerHTML = card;
  document.getElementById("errorBox").innerHTML = "";
  document.getElementById("bigBox").append(div);
 }


  const setErrorBox = () => {
        let message = "Sorry no information available!";
        let div = document.createElement("div");
        div.textContent = message;
        document.getElementById("errorBox").innerHTML = "";
        document.getElementById("errorBox").append(div);
  }


    const serverError = () => {
      let message = "We have some trouble connecting with the server, kindly try again";
      let div = document.createElement("div");
      div.textContent = message;
      document.getElementById("errorBox").innerHTML = "";
      document.getElementById("errorBox").append(div);

    }


export const multiSearch = (searchIt, type, page = 1,output =0) => {
  fetch(`https://api.themoviedb.org/3/search/multi?query=${searchIt}&include_adult=false&language=en-US&page=${page}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Accept': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the data
      console.log(data);

      let resultList;
      if (data.results.length === 0) {
        setErrorBox();
        
      }
      
        console.log("before filtering " + data.results.length);
      if (type !== "") {
        const filteredResults = data.results.filter(item => item.media_type === type);
        resultList = filteredResults;
      }else {
        // No filter applied, use the entire list of results
        resultList = data.results;
      }
    
      console.log("after filtering " + resultList.length);
      

      for (const item of resultList) {
        let card ;

        switch(item.media_type)
        { 
          case "movie" :  card = createResultCardForMovie(item);
                          appendResultCard(card);
                          break;
          case "tv"    : card= createResultCardForTv(item);
                         appendResultCard(card);
                         break;
          case "person": card= createResultCardForPerson(item);
                         appendResultCard(card);
                         break;
          default      :  card = createResultCardForMovie(item);
                          appendResultCard(card);
                          break;    
        }

        
        console.log(output);
        output++;
        if(output >=20){
          break;
        }
        
      } // for loop

      // Check if there are more pages and fetch the next page
      if (data.page < data.total_pages && output<20 ) {
        multiSearch(searchIt, type, page + 1,output);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error.message);
      serverError();
      // Check if there is a response and log additional details
      if (error.response) {
        console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
      }
    });
};

