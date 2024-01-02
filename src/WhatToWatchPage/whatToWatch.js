


function openTab(tabName) {
    // Hide all tab content
    var tabContent = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Remove 'active' class from all tabs
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Show the selected tab content and mark the tab as active
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active');
}



///////////////////////////////////////   API FETCH   ///////////////////////////////////////////////// 


async function apifetchWatchGuide(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        // console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item) => {
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url + item.poster_path;

            // Updated card variable to include the play icon
            const card = `
            
                            <div class="image-container">
                                <label>
                                    <img class="poster" src="${poster}" alt="">
                                </label>
                               
                                
                                <div class="card-text">
                                    <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                    <h3>${title}</h3>
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

async function apifetchFanFavourites(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        // console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            // console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            // console.log(title,rating);
            const card = `
                            <div class="image-container">
                                <label>
                                    <img class="poster" src="${poster}" alt="">
                                </label>                            
                                <div class="card-text">
                                    <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                    <h3>${title}</h3>
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

async function apifetchTopPicks(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        // console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            // console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            // console.log(title,rating); 
            const card = `
                            <div class="image-container">
                                <label>
                                    <img class="poster" src="${poster}" alt="">
                                </label>  
                                <div class="card-text">
                                    <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                    <h3>${title}</h3>
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

 async function apifetchFromYourWatchlist() {
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q4Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try {
        const response = await fetch(apiUrl, options);
        const result = await response.json();
        // console.log(result.results);
        const apilist = result.results;
        console.log("inside recently adedd");
        let image_url = "https://image.tmdb.org/t/p/original";
        apilist.map((item) => {
            // console.log(item);
            const title = item.title;
            const rating = item.vote_average; // Round to 1 decimal point
            const poster = image_url + item.poster_path;
            console.log("recently",title, rating);
            const card = `
                        <div class="image-container">
                            <label>
                                <img class="poster" src="${poster}" alt="">
                            </label>
                             <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                        </div>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class", "card");
            divs.innerHTML = card;

            document.getElementById("apifetchFromYourWatchlist").append(divs);
        })
    } catch (error) {
        console.log(error);
    }

}

apifetchFromYourWatchlist();

async function apifetchMostPopular() {
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q4Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try {
        const response = await fetch(apiUrl, options);
        const result = await response.json();
        // console.log(result.results);
        const apilist = result.results;
        console.log("inside recently adedd");
        let image_url = "https://image.tmdb.org/t/p/original";
        apilist.map((item) => {
            // console.log(item);
            const title = item.title;
            const rating = item.vote_average; // Round to 1 decimal point
            const poster = image_url + item.poster_path;
            console.log("recently",title, rating);
            const card = `
                        <div class="image-container">
                            <label>
                                <img class="poster" src="${poster}" alt="">
                            </label>
                             <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
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

async function apirecentlyviewed() {
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q4Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try {
        const response = await fetch(apiUrl, options);
        const result = await response.json();
        // console.log(result.results);
        const apilist = result.results;
        console.log("inside recently adedd");
        let image_url = "https://image.tmdb.org/t/p/original";
        apilist.map((item) => {
            // console.log(item);
            const title = item.title;
            const rating = item.vote_average; // Round to 1 decimal point
            const poster = image_url + item.poster_path;
            console.log("recently",title, rating);
            const card = `
                        <div class="image-container">
                            <label>
                                <img class="poster" src="${poster}" alt="">
                            </label>
                             <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                        </div>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class", "card");
            divs.innerHTML = card;

            document.getElementById("apirecentlyviewed").append(divs);
        })
    } catch (error) {
        console.log(error);
    }

}

apirecentlyviewed();



