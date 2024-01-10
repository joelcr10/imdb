import { apiFetch } from '../scripts/apiFetch.js';

const showDetails=async(title,poster,overview,release_year)=>{
    console.log("Hello");
    // document.getElementById('details').style.display = 'block';
        const detailContainer = document.getElementById('details');
    detailContainer.innerHTML = ''
    const card_details=`<div class="card-details">
    <h3 class="gridview-title">${title}</h3>
    <img class="card_image" src="${poster}" alt="">
    <br>Release Year:${release_year}<br>
    OVERVIEW:${overview}

    </div>
<`;
detailContainer.innerHTML += card_details;
        
};




const populateGridView =async () => {
    const gridContainer = document.getElementById('topshows-container');
    let image_url = "https://image.tmdb.org/t/p/original"
    const apiUrl = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
    const data = await apiFetch(apiUrl);
    let result=data.results;
    result.map((item) => {
        let title = item.original_name;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
        let date=item.first_air_date;
        let overview=item.overview;
        let release_year=date.split('-')[0];
        
        let random_eps=Math.floor(Math.random() * (20 - 5 + 1)) + 5;;
        let random_no=Math.floor(Math.random() * (5000000 - 100000 + 1)) + 100000;
        let formatted_random_no= random_no >= 1000000 ? (random_no / 1000000).toFixed(1) + 'M' : (random_no / 1000).toFixed(1) + 'K';
    
        const card = `
        <div class="card">
        <img class="card_image" src="${poster}" alt="">
        <div class="card-text" >
            <label class="gridview-headtext">
                <div><img src="../../assets/img/star.png" class="gridview_star">${rating.toFixed(1)}(${formatted_random_no})</div>
                <div class="gridview-rating">
                    <img class="gridview-ratingstar" src="../../assets/img/starred.png" style="margin-right: 5px;">
                    <span  class="gridview-ratingtext"style="color: blue;">RATE</span>
                </div>
            </label>
            <h3 class="gridview-title">${title}</h3>
            <label>${release_year}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${random_eps} eps</label>
            
            <button class="gridview-detailbtn" onclick="showDetails('${title}','${poster}','${overview}','${release_year}')">Details</button>
        </div>
    </div>
                     
                     `;
        gridContainer.innerHTML += card;

     });
};



populateGridView();

window.showDetails=showDetails