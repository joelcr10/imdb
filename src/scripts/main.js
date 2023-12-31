
import { apiFetch } from "./apiFetch.js";




// const popularMoviesSection = async () =>{
   
//     const API_KEY = '8b701ace30227088c2f1ef89b747c764';
//     const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'Authorization': API_KEY,    
//             'accept': 'application/json'
//         }
//     };
//     const response = await fetch(apiUrl,options);
//     const result = await response.json();
//     let image_url = "https://image.tmdb.org/t/p/w185"
    

//     let resultList = result.results;
//     resultList.map((item) =>{
//         let title = item.title;
//         let poster = image_url+item.poster_path;
//         let rating = item.vote_average;
        
//         const card = `
//                         <img src="${poster}" alt="">
//                         <div class="card-text">
//                             <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
//                             <h3>${title}</h3>
//                             <button><span>+</span> Watchlist</button>
//                             <div class="card-trailer-container">
//                                 <div class="card-trailer">
//                                     <img src="../../assets/img/play-icon.png">
//                                     <label>Trailer</label>
//                                 </div>
//                                 <img src="../../assets/img/info.png" class="info-icon">
//                             </div>
//                         </div>
//                     `;
//         let div = document.createElement('div');
//         div.setAttribute("class","card");
//         div.innerHTML = card;
//         document.getElementById("popular-movies").append(div);
//     })
// }

const popularMoviesSection = async () =>{
   
    
    const apiUrl = `https://api.themoviedb.org/3/movie/popular`;
    
    const resultList = await apiFetch(apiUrl);

    let image_url = "https://image.tmdb.org/t/p/original";
    
    resultList.map((item) =>{
        let title = item.title;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
        let id = item.id;
        
        const card = `
                    <a href="movieDetails.html?id=${id}">
                        <img src="${poster}" alt="">
                        <div class="card-text">
                            <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                            <h3>${title}</h3>
                            <button><span>+</span> Watchlist</button>
                            <div class="card-trailer-container">
                                <div class="card-trailer">
                                    <img src="../../assets/img/play-icon.png">
                                    <label>Trailer</label>
                                </div>
                                <img src="../../assets/img/info.png" class="info-icon">
                            </div>
                        </div>
                    </a>
                    `;
        let div = document.createElement('div');
        div.setAttribute("class","card");
        div.innerHTML = card;
        document.getElementById("popular-movies").append(div);
    })
}

const topRatedSection = async () =>{
    
    const apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
    
    let image_url = "https://image.tmdb.org/t/p/original"
        
        let resultList = await apiFetch(apiUrl);
        resultList.map((item) =>{
            let title = item.title;
            let poster = image_url+item.poster_path;
            let rating = item.vote_average;
            let id = item.id;
            const card = `<a href="movieDetails.html?id=${id}">
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                                <div class="card-trailer-container">
                                    <div class="card-trailer">
                                        <img src="../../assets/img/play-icon.png">
                                        <label>Trailer</label>
                                    </div>
                                    <img src="../../assets/img/info.png" class="info-icon">
                                </div>
                            </div>
                            </a>
                        `;
            let div = document.createElement('div');
            div.setAttribute("class","card");
            div.innerHTML = card;
            document.getElementById("top-rated").append(div);
        })
    
    
}


const popularTvSection = async () =>{
    
    const apiUrl = 'https://api.themoviedb.org/3/tv/popular';
    
    let image_url = "https://image.tmdb.org/t/p/original";
        
        let resultList = await apiFetch(apiUrl);
        resultList.map((item) =>{
            let title = item.original_name;
            let poster = image_url+item.poster_path;
            let rating = item.vote_average;
            let id = item.id;
            const card = `<a href="tvDetails.html?id=${id}">
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating.toFixed(1)}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                                <div class="card-trailer-container">
                                    <div class="card-trailer">
                                        <img src="../../assets/img/play-icon.png">
                                        <label>Trailer</label>
                                    </div>
                                    <img src="../../assets/img/info.png" class="info-icon">
                                </div>
                            </div>
                            </a>
                        `;
            let div = document.createElement('div');
            div.setAttribute("class","card");
            div.innerHTML = card;
            document.getElementById("popular-tv").append(div);
        })
    
    
}

const upcomingMoviesSection = async () =>{
   
    let minDate = "2023-12-20";
    let maxDate = "2024-01-10";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
   
    let image_url = "https://image.tmdb.org/t/p/original"
        
    let resultList =  await apiFetch(apiUrl);
        
    resultList.map((item) =>{
        let title = item.title;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
            
        const card = `
                        <img src="${poster}" alt="">
                        <div class="card-text">
                            <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button>Watch options</button>
                                <div class="card-trailer-container">
                                <div class="card-trailer">
                                    <img src="../../assets/img/play-icon.png">
                                    <label>Trailer</label>
                                </div>
                                <img src="../../assets/img/info.png" class="info-icon">
                            </div>
                            </div>
                        `;
            let div = document.createElement('div');
            div.setAttribute("class","card");
            div.innerHTML = card;
            document.getElementById("upcoming-movies").append(div);
        })
    
    
}




const trendingCelebSection = async () =>{
   
    const API_KEY = 'Bearer 8b701ace30227088c2f1ef89b747c764'; 
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA';
    const apiUrl = `https://api.themoviedb.org/3/trending/person/week?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,    
            'accept': 'application/json'
        }
    };
    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        let image_url = "https://image.tmdb.org/t/p/original"
        
        let resultList = result.results;
       
        resultList.map((item) =>{
        
            let name = item.name;
            let profile = image_url+item.profile_path;
            let card = `
                        <img src="${profile}">
                        <label>${name}</label>
                        `;
            let div = document.createElement('div');
            div.setAttribute("class","celeb-card");
            div.innerHTML = card;
            document.getElementById("trending-celeb").append(div);
            
        })
    }catch(error){
        console.log(error);
    }
    
}



popularMoviesSection();
topRatedSection();
upcomingMoviesSection();
trendingCelebSection();
popularTvSection();

async function testData(){
    const data = await apiFetch();
    
    data.map((item)=>{
        console.log(item);
    })

    
}


testData();

