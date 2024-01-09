import { apiFetch } from "../scripts/apiFetch.js";


let image_url = "https://image.tmdb.org/t/p/w185";
let currentPage = 1; // Track the current page

const createCard = async(resultList,needDetails,firstLineNumber=0) =>{

  for (const item of resultList) {
    let movie = "the chihuahua";
    let movieId = 286217;
    
    for (let i = 0; i < 3; i++) {
      if (item.known_for[i]?.title) {
        movie = item.known_for[i].title;
        movieId = item.known_for[i].id;
        break; // Exit the loop once a valid movie is found
      }
    }
    

    let name = item.original_name;
    let department = item.known_for_department;
    let popularity = Math.floor(item.popularity * 10);
    let scr = image_url + item.profile_path;
    ++firstLineNumber;
    let id = item.id;
    let details = '';

    if (needDetails) {
      details = await detailedView(id);
      details = details.split('.').slice(0, 2).join('.')+ ('.');
    }
    
    const card = `
      <div class="celebrityImage"><img src="${scr}" alt=" " class="celebIcon"></div>
      <div class="firstLine" name="numberLine">( <div class="firstLineNumber">${firstLineNumber}</div>
        <img src="../../assets/img/greenUpArrow.png" alt="" class="greenUpArrow"> 
        <div class="firstLineRandomNumber">${popularity}</div> )
      </div>
      <a href="../CelebDetails/celebDetails.html?id=${id}"><div class="secondLine" name="nameLine">${name}</div></a>
      <div class="thirdLine" name="positionLine">${department} </div>
      <div class="fourthLine" name="productLine"><a href ="../MovieDetails/movieDetails.html?id=${movieId}">${movie}</a></div>
      <div class="plusIconDiv"><img src="../../assets/img/plusIcon.png" alt="" class="plusIcon"></div>
      <div class=details>${details}</div>
    `;

   appendCard(card);
    
  }
}

const appendCard = (card) => {
  let div = document.createElement('div');
  div.setAttribute("class", "celebrityBox");
  div.innerHTML = card;
  document.getElementById("bigBox").append(div);
};

export const celebrity = async (needDetails, firstLineNumber) => {
  try {
    const data = await apiFetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`);
    console.log(data);
    let resultList = data.results;
    firstLineNumber = (currentPage - 1) * 20;
    createCard(resultList, needDetails, firstLineNumber);
  } catch (error) {
    console.error('Error fetching celebrity data:', error.message);
    // Handle the error (e.g., show an error message to the user)
  }
};

const detailedView = async (id) => {
  try {
    const response = await apiFetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`);
    console.log(response);
    return response.biography;
  } catch (error) {
    console.error('Error fetching detailed view:', error.message);
    // Handle the error (e.g., show an error message to the user)
    return '';
  }
};

// Function to load more results (pagination)
const loadMoreResults = async () => {
  currentPage++;
  try {
    const data = await apiFetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`);
    console.log(data);
    let resultList = data.results;
    const firstLineNumber = (currentPage - 1) * 20;
    document.getElementById("bigBox").innerHTML = "";
    createCard(resultList, false, firstLineNumber); // Set needDetails to false for additional pages
  } catch (error) {
    console.error('Error loading more results:', error.message);
    // Handle the error (e.g., show an error message to the user)
  }
};

const loadLessResults = async () => {
  if(currentPage >1){
     currentPage--;
  try {
    const data = await apiFetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`);
    console.log(data);
    let resultList = data.results;
    
    
    document.getElementById("bigBox").innerHTML = "";
    const firstLineNumber = (currentPage - 1) * 20;
    createCard(resultList, false,firstLineNumber);
    }catch (error) {
      console.error('Error loading less results:', error.message);
      // Handle the error (e.g., show an error message to the user)
    }
    
  } 
}

// Attach an event listener to a "Load More" button
document.getElementById("loadMoreButton").addEventListener("click", loadMoreResults);
document.getElementById("loadLessButton").addEventListener("click", loadLessResults);
