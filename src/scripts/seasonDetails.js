import { apiFetch } from "../scripts/apiFetch.js";

const season_id=async()=>{
    console.log("inside season_id");
    const apiUrl='https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
    const response=await apiFetch(apiUrl);
    const data= await response;
    console.log(data);
    data.results.forEach((item)=>{
        //console.log(item)
        let id=item.id;
        console.log(id);
        season_no(id)
    });
    
    
};
window.handleEpisodeDetails=async(id, seasonNumber,episode_no)=>{
  console.log("inside handle episode")
  const apiUrl=`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episode_no}?language=en-US`;
  const reponse=await apiFetch(apiUrl);
  const data=await reponse;
 console.log(data);
};
window.handleSeasonClick = async (id, seasonNumber) => {
  console.log("inside handle season")
  const apiUrl=`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`;
  const reponse=await apiFetch(apiUrl);
  const data=await reponse;
  const results=data.episodes
   console.log(data);
   results.map((item) =>{
    let episode_no=item.episode_number;
    handleEpisodeDetails(id,seasonNumber,episode_no);
    console.log(episode_no)
  });
   
  
   
};

const season_no=async(id)=>{
  console.log("inside season_no")
  const apiUrl=`https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  const reponse=await apiFetch(apiUrl);
  const data=await reponse;
   console.log(data);
    let season_no=data.number_of_seasons;
    console.log(season_no);
    
    let buttonsHTML = '';
    for (let i = 1; i <= season_no; i++) {
      buttonsHTML += `<button onclick="handleSeasonClick(${id}, ${i})">S${i}</button>`;
   
      }
     const card = `
     <div class="card">
       
       <div class="season-buttons">
         ${buttonsHTML}
       </div>
     </div>
   `;

   
   const container = document.getElementById('season_no');
   container.innerHTML = card;
    
};

season_no(' 213026')