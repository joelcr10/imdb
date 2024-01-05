import { apiFetch } from "../scripts/apiFetch.js";

////////////////////////////////////////////   WATCH GUIDE   ///////////////////////////////////////////////// 


async function apifetchWatchGuide(){
    // console.log("inside test");

    const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
   
    try{

        const result = await apiFetch(apiUrl);
      
        // console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/original";
        apilist.map((item) => {
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url + item.poster_path;
            const id = item.id;

            // Updated card variable to include the play icon
            const card = `
                            <div class="image-container">
                                <label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}"> 
                                        <img class="poster" src="${poster}" alt="">
                                    </a>
                                </label>  

                                
                                <div class="card-text">
                                
                                <label>
                                
                                <img src="../../assets/img/star.png">${rating.toFixed(1)}
                                <img class="starred-icon" src="../../assets/img/starred.png" onclick="openRatingModal('${title}')">

                                </label>
                                <a href="../MovieDetails/movieDetails.html?id=${id}"> 
                                    <h3>${title}</h3>
                                </a>
                                    <button><span>+</span> Watchlist</button>
                                </div>
                                
                            </div>  
                        `;
            let divs = document.createElement('div');
            divs.setAttribute("class", "card");
            divs.innerHTML = card;

            document.getElementById("apifetchWatchGuide").append(divs);
        })
    } catch (error) {
        console.log(error);
    }
}

apifetchWatchGuide();

///////////////////////////////////////////////////     FAN FAVOURITES      ////////////////////////////////////////////////////////

async function apifetchFanFavourites(){
    // console.log("inside test");
    
    const apiUrl = `https://api.themoviedb.org/3/movie/popular`;
   
    try{

        const result = await apiFetch(apiUrl);
      
        // console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/original";
        apilist.map((item)=>{
            // console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            const id = item.id;
            // console.log(title,rating);
            const card = `
                            <div class="image-container">
                                <label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}"> 
                                        <img class="poster" src="${poster}" alt="">
                                    </a>
                                </label>  

                                
                                <div class="card-text">
                                
                                <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <a href="../MovieDetails/movieDetails.html?id=${id}"> 
                                    <h3>${title}</h3>
                                </a>
                                    <button><span>+</span> Watchlist</button>
                                </div>
                                
                            </div>  
                        `;
            let divs = document.createElement('div');
            divs.setAttribute("class","card");
            divs.innerHTML = card;
            
            document.getElementById("apifetchFanFavourites").append(divs);

        })
    }catch(error){
        console.log(error);
    }
 }
 apifetchFanFavourites();



 ///////////////////////////////////////////////////       TOP PICKS         ///////////////////////////////////////////////////////////

async function apifetchTopPicks(){

     const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    
    try{

        const result = await apiFetch(apiUrl);
        
        const apilist = result.results;

        let image_url = "https://image.tmdb.org/t/p/original";
        apilist.map((item)=>{
            // console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            const id = item.id;
            // console.log(title,rating); 
            const card = `
                            <div class="image-container">
                                <label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}"> 
                                        <img class="poster" src="${poster}" alt="">
                                    </a>
                                </label>  

                                
                                <div class="card-text">
                                   
                                <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <a href="../MovieDetails/movieDetails.html?id=${id}"> 
                                    <h3>${title}</h3>
                                </a>
                                    <button><span>+</span> Watchlist</button>
                                </div>
                                
                            </div>  
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","card");
            divs.innerHTML = card;
            
            
            document.getElementById("apifetchTopPicks").append(divs);
                       
        })
    }catch(error){
        console.log(error);
    }
 }
 apifetchTopPicks();

 //////////////////////////////////////////////            YOUR WATCHLIST           ///////////////////////////////////////////////

 


///////////////////////////////////////////////////////           MOST POPULAR            /////////////////////////////////////////////////////////


async function apifetchMostPopular() {
    // console.log("inside test");

    const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    

    try {

        const result = await apiFetch(apiUrl);

        const apilist = result.results;
        console.log("inside recently adedd most popular");
        console.log("apilist",apilist);
        let image_url = "https://image.tmdb.org/t/p/original";
        apilist.map((item) => {
            // console.log(item);
            const title = item.title;
            const rating = item.vote_average; // Round to 1 decimal point
            const poster = image_url + item.poster_path;
            const id = item.id;
            // console.log("recently",title, rating);
            const card = `
                                <div class="image-container">
                                    <label>
                                        <a href="../MovieDetails/movieDetails.html?id=${id}"> 
                                            <img class="poster" src="${poster}" alt="">
                                        </a>
                                    </label>  

                                    
                                    <div class="card-text">
                                    
                                    <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                    <a href="../MovieDetails/movieDetails.html?id=${id}"> 
                                        <h3>${title}</h3>
                                    </a>
                                        <button><span>+</span> Watchlist</button>
                                    </div>
                                    
                                </div>  
                            `;
            let divs = document.createElement('div');
            divs.setAttribute("class", "card");
            divs.innerHTML = card;

            document.getElementById("apifetchMostPopular").append(divs);
        })
    } catch (error) {
        console.log(error);
    }

}

apifetchMostPopular();

//////////////////////////////////////////////////////         RECENTLY VIEWED          ////////////////////////////////////////////////////////////



