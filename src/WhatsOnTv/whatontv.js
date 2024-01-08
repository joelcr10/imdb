import { apiFetch } from "../scripts/apiFetch.js";

const tv_series=async()=>{
    
    console.log("inside tv_series")
    const apiUrl='https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
    const response=await apiFetch(apiUrl);
    const data= await response;
    console.log(data);
    let imageUrl ="https://image.tmdb.org/t/p/original"
    let image=imageUrl+data.results[1].backdrop_path;
    const card=` <img class="card_image" src="${image}" alt="">`;
          let div = document.createElement('div');
        div.setAttribute("class","card");
        div.innerHTML = card;
        document.getElementById("image-1").append(div);
    let image_2=imageUrl+data.results[8].backdrop_path;
    const card_2=`<img class="card_image_2" src="${image_2}" alt="">`;
    console.log(image_2);
    let div_2=document.createElement('div');
    div_2.setAttribute("class","card_2");
    div_2.innerHTML=card_2;
    document.getElementById("image_2").append(div_2);


    let image_3=imageUrl+data.results[10].backdrop_path;
    const card_3=`<img class="card_image_3" src="${image_3}" alt="">`;
    console.log(image_3);
    let div_3=document.createElement('div');
    div_3.setAttribute("class","card_3");
    div_3.innerHTML=card_3;
    document.getElementById("image_3").append(div_3);
};
tv_series()