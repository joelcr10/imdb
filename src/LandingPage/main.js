
import { apiFetch } from "../scripts/apiFetch.js";


const popularMoviesSection = async () =>{
   
    console.log("inside popular section");
    
    const apiUrl = `https://api.themoviedb.org/3/movie/popular`;
    
    const result = await apiFetch(apiUrl);
    const resultList = result.results;
    let image_url = "https://image.tmdb.org/t/p/original";
    
    resultList.map((item) =>{
        let title = item.title;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
        let id = item.id;
        
        const card = `
                    <a href="../MovieDetails/movieDetails.html?id=${id}">
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
        
    const result = await apiFetch(apiUrl);
    const resultList = result.results;
        resultList.map((item) =>{
            let title = item.title;
            let poster = image_url+item.poster_path;
            let rating = item.vote_average;
            let id = item.id;
            const card = `<a href="../MovieDetails/movieDetails.html?id=${id}">
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
        
    const result = await apiFetch(apiUrl);
    const resultList = result.results;
        resultList.map((item) =>{
            let title = item.original_name;
            let poster = image_url+item.poster_path;
            let rating = item.vote_average;
            let id = item.id;
            const card = `<a href="../TvDetails/tvDetails.html?id=${id}">
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
   console.log("iinside upcoming movies");
    let minDate = "2024-01-01";
    let maxDate = "2024-01-10";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
   
    let image_url = "https://image.tmdb.org/t/p/original"
        
    const result = await apiFetch(apiUrl);
    const resultList = result.results;
        
    resultList.map((item) =>{
        let title = item.title;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
        let id = item.id;
        const card = `<a href="../MovieDetails/movieDetails.html?id=${id}">
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
                        </a>
                        `;
            let div = document.createElement('div');
            div.setAttribute("class","card");
            div.innerHTML = card;
            document.getElementById("upcoming-movies").append(div);
        })
    
    
}




const trendingCelebSection = async () =>{
   
    const apiUrl = `https://api.themoviedb.org/3/trending/person/week?language=en-US`;

    try{

        const result = await apiFetch(apiUrl);
        const resultList = result.results;

        let image_url = "https://image.tmdb.org/t/p/original"
       
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

const topBoxOfice = async () =>{
    // const apiUrl = `https://api.themoviedb.org/3/movie/popular`;
    const min_date = "2023-12-20";
    const max_date = "2024-01-03";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}`;
    
    const result = await apiFetch(apiUrl);
    const resultList = result.results;
    
    for(let i=0;i<6;i++){
        const title = resultList[i].title;
        const boxOfficeMovieId =  "bo-movie-"+(i+1);
        const boxOfficeCollectionId = "bo-collection-"+(i+1);
        const movieId = resultList[i].id;
        document.getElementById(boxOfficeMovieId).innerText = title;

        const boxOfficeApi = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const res = await apiFetch(boxOfficeApi);
        console.log(res);
        let revenue = res.revenue;
        if(revenue==0){
            revenue = 10000000;
        }
        document.getElementById(boxOfficeCollectionId).innerText = "$"+revenue/1000000+"M";
        
    }
}

const checkWatchList = () =>{
    if(localStorage.getItem("userId")==null){
        document.getElementById("display-watchlist").style.display = "none";
        document.getElementById("watchlist-home").style.display = "flex";
    }else{
        document.getElementById("display-watchlist").style.display = "block";
        document.getElementById("watchlist-home").style.display = "none";
    }
}



popularMoviesSection();
topRatedSection();
upcomingMoviesSection();
trendingCelebSection();
popularTvSection();
topBoxOfice();
checkWatchList();






