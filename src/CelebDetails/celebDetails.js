import { apiFetch } from "../scripts/apiFetch.js";

let image_url = "https://image.tmdb.org/t/p/original";
let celebId = "";

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
  let movieName = item.original_title;
  let overView = item.overview;
  let poster = image_url + item.poster_path;
  let release = item.release_date;
  let bigImage = image_url + item.backdrop_path;

  const card = `<div ><img src="${poster}" class="poster"></div>
                <div class="movieName">${movieName}</div>
                <div class="overView">${overView}</div>
                <div class="release">${release}</div>
                <div ><img src = "${bigImage}" class="backdrop"></div>`;
  appendMovieSectionCard(card);
};

const createTopSectionCard = (details) => {
  let name = details.name || "";
  let poster = details.profile_path ? image_url + details.profile_path : "";
  let description = details.biography || "";
  let birthday = details.birthday || "";
  let knownFor = details.known_for_department || "";
  let placeOfBirth = details.place_of_birth || "";
  let popularity = details.popularity || "";

  const card = `
      <div id="celebName">${name}</div>
      <div id="knownFor">${knownFor}</div>
      <div><img src="${poster}" alt="" id="celebPoster"></div>
      <div id="description">${description}</div>
      <div id="dateOfBirth">${birthday}</div> 
      <div id="popularity">${popularity}</div>
      <div id="placeOfBirth">${placeOfBirth}</div>
  `;

  appendTopSection(card);
};

const appendMovieSectionCard = (card) => {
  let div = document.createElement("div");
  div.setAttribute("class", "movieSection");
  div.innerHTML = card;
  document.getElementById("middleSection").append(div);
  console.log("appended first movie");
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
