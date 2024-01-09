import { apiFetch } from "../scripts/apiFetch.js";

///////////////////////////////////////             TRENDING TRAILERS           /////////////////////////////////////////////////

async function apifetchTrendingTrailers() {
  // console.log("inside test");

  const apiUrl =
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  try {
    const result = await apiFetch(apiUrl);

    // console.log(result.results);
    const apilist = result.results;
    let image_url = "https://image.tmdb.org/t/p/original";
    apilist.map((item) => {
      // console.log(item);
      const title = item.title;
      const rating = item.vote_average;
      const poster = image_url + item.poster_path;
      const id = item.id;
      // console.log(title,rating);
      const card = `
                            
                           <div class="image-container">
                                <label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}">
                                        <img class="poster" src="${poster}" alt="">
                                        <i id="playbutton" class="bi bi-play-circle" style="font-size: 3em;"></i>
                                    </a>
                                </label>
                                                   
                                
                                <div class="card-text">
                                    <label>
                                        <a href="../MovieDetails/movieDetails.html?id=${id}">
                                            <img src="../../assets/img/star.png">${rating.toFixed(
                                              1
                                            )}
                                        </a>
                                        <img class="starred-icon" src="../../assets/img/starred.png" onclick="openRatingModal('${title}', '${id}')">
                                    </label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}">
                                        <h3>${title}</h3>
                                    </a>
                                    <button><span>+</span> Watchlist</button>
                                </div>
                                
                            </div>
                       `;
      let divs = document.createElement("div");
      divs.setAttribute("class", "card");
      divs.innerHTML = card;

      document.getElementById("apifetchTrendingTrailers").append(divs);
    });
  } catch (error) {
    console.log(error);
  }
}
apifetchTrendingTrailers();

/////////////////////////////////////////           MOST ANTICIPATED             ///////////////////////////////////////

async function apifetchMostAnticipated() {
  // console.log("inside test");
  const apiUrl =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

  try {
    const result = await apiFetch(apiUrl);

    // console.log(result.results);
    const apilist = result.results;
    let image_url = "https://image.tmdb.org/t/p/original";
    apilist.map((item) => {
      // console.log(item);
      const title = item.title;
      const rating = item.vote_average;
      const poster = image_url + item.poster_path;
      const id = item.id;

      // console.log(title,rating);
      const card = `
                            
                           <div class="image-container">
                                <label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}">
                                        <img class="poster" src="${poster}" alt="">
                                        <i id="playbutton" class="bi bi-play-circle" style="font-size: 3em;"></i>
                                    </a>
                                </label>
                                                   
                                
                                <div class="card-text">
                                    <label>
                                        <a href="../MovieDetails/movieDetails.html?id=${id}">
                                            <img src="../../assets/img/star.png">${rating.toFixed(
                                              1
                                            )}
                                        </a>
                                        <img class="starred-icon" src="../../assets/img/starred.png" onclick="openRatingModal('${title}', '${id}')">
                                    </label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}">
                                        <h3>${title}</h3>
                                    </a>
                                    <button><span>+</span> Watchlist</button>
                                </div>
                                
                            </div>
                       `;
      let divs = document.createElement("div");
      divs.setAttribute("class", "card");
      divs.innerHTML = card;

      document.getElementById("apifetchMostAnticipated").append(divs);
    });
  } catch (error) {
    console.log(error);
  }
}
apifetchMostAnticipated();

//////////////////////////////////////////          MOST POPULAR            /////////////////////////////////////////////////

async function apifetchMostPopular() {
  // console.log("inside test");
  const apiUrl =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  try {
    const result = await apiFetch(apiUrl);

    // console.log(result.results);
    const apilist = result.results;
    let image_url = "https://image.tmdb.org/t/p/original";
    apilist.map((item) => {
      // console.log(item);
      const title = item.title;
      const rating = item.vote_average;
      const poster = image_url + item.poster_path;
      const id = item.id;
      // console.log(title,rating);
      const card = `
                            
                           <div class="image-container">
                                <label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}">
                                        <img class="poster" src="${poster}" alt="">
                                        <i id="playbutton" class="bi bi-play-circle" style="font-size: 3em;"></i>
                                    </a>
                                </label>
                                                   
                                
                                <div class="card-text">
                                    <label>
                                        <a href="../MovieDetails/movieDetails.html?id=${id}">
                                            <img src="../../assets/img/star.png">${rating.toFixed(
                                              1
                                            )}
                                        </a>
                                        <img class="starred-icon" src="../../assets/img/starred.png" onclick="openRatingModal('${title}', '${id}')">
                                    </label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}">
                                        <h3>${title}</h3>
                                    </a>
                                    <button><span>+</span> Watchlist</button>
                                </div>
                                
                            </div>
                       `;
      let divs = document.createElement("div");
      divs.setAttribute("class", "card");
      divs.innerHTML = card;

      document.getElementById("apifetchMostPopular").append(divs);
    });
  } catch (error) {
    console.log(error);
  }
}
apifetchMostPopular();

////////////////////////////////////////////////        RECENTLY ADDED         //////////////////////////////////////////////////

async function apifetchRecentlyAddeded() {
  // console.log("inside test");
  const apiUrl =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

  try {
    const result = await apiFetch(apiUrl);

    // console.log(result.results);
    const apilist = result.results;
    console.log("inside recently adedd");
    let image_url = "https://image.tmdb.org/t/p/original";
    apilist.map((item) => {
      // console.log(item);
      const title = item.title;
      const rating = item.vote_average; // Round to 1 decimal point
      const poster = image_url + item.poster_path;
      const id = item.id;
      console.log("recently", title, rating);
      const card = `
                            
                           <div class="image-container">
                                <label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}">
                                        <img class="poster" src="${poster}" alt="">
                                        <i id="playbutton" class="bi bi-play-circle" style="font-size: 3em;"></i>
                                    </a>
                                </label>
                                                   
                                
                                <div class="card-text">
                                    <label>
                                        <a href="../MovieDetails/movieDetails.html?id=${id}">
                                            <img src="../../assets/img/star.png">${rating.toFixed(
                                              1
                                            )}
                                        </a>
                                        <img class="starred-icon" src="../../assets/img/starred.png" onclick="openRatingModal('${title}', '${id}')">
                                    </label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}">
                                        <h3>${title}</h3>
                                    </a>
                                    <button><span>+</span> Watchlist</button>
                                </div>
                                
                            </div>
                       `;
      let divs = document.createElement("div");
      divs.setAttribute("class", "card");
      divs.innerHTML = card;

      document.getElementById("recently-added").append(divs);
    });
  } catch (error) {
    console.log(error);
  }
}

apifetchRecentlyAddeded();
