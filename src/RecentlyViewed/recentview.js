import { apiFetch } from "../scripts/apiFetch.js";

const movieImagesApi = async (trail_recentmovie) => {
  console.log("inside get movie api");
  console.log("testing",trail_recentmovie);
  let image_url = "https://image.tmdb.org/t/p/original"
 
    const apiUrl = `https://api.themoviedb.org/3/movie/${trail_recentmovie}?language=en-US`;
    const response = await apiFetch(apiUrl);
    console.log(response);
    const data = await response;
    console.log(data)
    let title = data.original_title;
    console.log(title);
    let poster = image_url+data.backdrop_path;
    let rating = data.vote_average;
    const card=`
      <div class="card">
      
      <img class="card_image" src="${poster}" alt="">
      <h4 class="card_title">${title}<h4>
      </div>
    `;
    let div= document.createElement('div');
    div.innerHTML=card;
    document.getElementById("recent-movies").append(div)
};




const get_recentmovie_id=async()=>{
  
  let trail_recentmovie=JSON.parse(sessionStorage.getItem('Recent Movies'));
  console.log(trail_recentmovie);
  for(let i=0;i<trail_recentmovie.length;i++){
    console.log(trail_recentmovie[i]);
    movieImagesApi(trail_recentmovie[i]);
    
  }
};
get_recentmovie_id();











// const movieImagesApi= async(trail_recentmovie)=>{
//   console.log("inside get movie api");
//   console.log(trail_recentmovie);

//   const apiUrl = `https://api.themoviedb.org/3/movie/${trail_recentmovie}?language=en-US`;
//   
//   console.log(data);
//   const viewContainer = document.getElementById('recent-movies');
  
//   let image_url = "https://image.tmdb.org/t/p/original"
  
//     let title = data.original_title;
//     let poster = image_url+data.backdrop_path;
//     let rating = data.vote_average;
//     const card=`
//       <div class="card">
//       <img class="card_image" src="${poster}" alt="">
//       <h4>${title}<h4>
//       </div>
//     `;
//     viewContainer.innerHTML += card;
  
// }
const include_recentview=async()=>{
  console.log("inside recent view");
  await fetch("../pages/recentviewed.html")
  .then(response => response.text())
  .then(data => {
      document.getElementById('recently-viewed').innerHTML = data;
  })
  .catch( error =>{
      console.error("error fetching footer: ",error);
  })
}


include_recentview();