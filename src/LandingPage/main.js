import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDocs, getDoc, collection } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseCredentials } from "../../config.js";
import { apiFetch } from "../scripts/apiFetch.js";
import loadingAnimation from "../scripts/loadingAnimation.js";

const firebaseConfig = firebaseCredentials; //fetching the firebase credentials
const app = initializeApp(firebaseConfig); // initialization of firebase;
const db = getFirestore(app); //getting the reference of firestore database



//get the users watchlist
const getUserWatchlist = async () =>{
    let watchlistMovieId = []
    if(localStorage.getItem("userId")==null){
        return [];
    }
    const docList = await getDocs(collection(db,"users",localStorage.getItem("userId"),"watchlist"));
    docList.forEach((doc) => {
        let item = doc.data();
        let id = item.id;
        watchlistMovieId.push(id);
    });

    return watchlistMovieId;
}

const getUserRatings = async () =>{    
    if(localStorage.getItem("userId")==null){
        return {};
    }
    const ratingDoc = await getDoc(doc(db,"users",localStorage.getItem("userId"),"userRatings","rating"));
    
    let userRatingList = ratingDoc.data();

    return userRatingList;
}


var watchlistMovieId = await getUserWatchlist(); //gloabl variables to store the watchlist of user
var userRatingList = await getUserRatings(); //gloabl variables to store the user ratings of user

const popularMoviesSection = async () =>{

    const apiUrl = `https://api.themoviedb.org/3/movie/popular`;
    
    const result = await apiFetch(apiUrl);
    const resultList = result.results;

    let image_url = "https://image.tmdb.org/t/p/original";

    resultList.map((item) =>{
  
        let poster = image_url+item.poster_path;

        let div = createCard(item.id,item.title,item.vote_average,poster,true);

        document.getElementById("popular-movies").append(div);
    })
}

const topRatedSection = async () =>{
    
    const apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
    
    let image_url = "https://image.tmdb.org/t/p/original"
  
    const result = await apiFetch(apiUrl);
    const resultList = result.results;

    resultList.map((item) =>{
        let poster = image_url+item.poster_path;
        let div = createCard(item.id,item.title,item.vote_average,poster,true);
        document.getElementById("top-rated").append(div);
    })
    
    
}


const popularTvSection = async () =>{
    
    const apiUrl = 'https://api.themoviedb.org/3/tv/popular';
    
    let image_url = "https://image.tmdb.org/t/p/original";
        
    const result = await apiFetch(apiUrl);

    const resultList = result.results;

        resultList.map((item) =>{
            
            let poster = image_url+item.poster_path;
          
            let div = createCard(item.id,item.original_name,item.vote_average,poster,true);
            
            document.getElementById("popular-tv").append(div);
        })
    
    
}

const upcomingMoviesSection = async () =>{
    let minDate = "2024-01-01";
    let maxDate = "2024-01-10";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
   
    let image_url = "https://image.tmdb.org/t/p/original"
        
    const result = await apiFetch(apiUrl);
    const resultList = result.results;
        
    resultList.map((item) =>{

        let poster = image_url+item.poster_path;

        let div = createCard(item.id ,item.title ,item.vote_average ,poster ,true);

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
    
    const min_date = "2023-12-20";
    const max_date = "2024-01-10";
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
        
        let revenue = res.revenue;
        if(revenue==0){
            revenue = 10000000;
        }
        document.getElementById(boxOfficeCollectionId).innerText = "$"+revenue/1000000+"M";
        
    }
}


const displayWatchlist = async () =>{

    const docList = await getDocs(collection(db,"users",localStorage.getItem("userId"),"watchlist"));

    if(docList.empty){
        document.getElementById("watchlist-prompt").innerText = "Nothing added to watchlist";
    }else{
        
        docList.forEach((doc) => {
                let item = doc.data();
              
                let id = item.id;
                let title = item.title;
                let poster = item.poster;
                const card = `
                            <a href="../MovieDetails/movieDetails.html?id=${id}">
                                <img src="${poster}" alt="">
                                <div class="card-text">
                                    <h3>${title}</h3>
                                </div>
                            </a>
                        `;
                    let div = document.createElement('div');
                    div.setAttribute("class","card");
                    div.innerHTML = card;
                    document.getElementById("display-watchlist").append(div);
          });
    }
}

//function to check if the user has signed-in or not to display the watchlist
//if the user has not signed in then show sign in button
const checkWatchList = () =>{

    if(localStorage.getItem("userId")==null){

        document.getElementById("display-watchlist").style.display = "none";
        document.getElementById("watchlist-home").style.display = "flex";

    }else{

        document.getElementById("display-watchlist").style.display = "flex";
        displayWatchlist();
        document.getElementById("watchlist-home").style.display = "none";
    }
}



//template to create movie/tv show cards
const createCard = (id,title,rating,poster,movie) =>{

    let detailsPage = "";
    let cardButton = "";
    let rateStarImage = "";
       
    //check if the movie is already added to watchlist
    if(watchlistMovieId.includes(id.toString())){
        cardButton = `<button id="watchlisted"><span></span>Watchlisted</button>`
    }else{
        cardButton = `<button><span>+</span> Watchlist</button>`
    }
     
    //check if the movie has been rated
    if( id in userRatingList){    
        rateStarImage = `<img class="starred-icon" src="../../assets/img/ratingStar.png" onclick="openRatingModal('${title}', '${id}')">`;
    }else{
        rateStarImage = `<img class="starred-icon" src="../../assets/img/starred.png" onclick="openRatingModal('${title}', '${id}')">`
    }

    //check if the card is for movie or tv
    if(movie==true){
        detailsPage = `<a href="../MovieDetails/movieDetails.html?id=${id}">`;
    }else{
        detailsPage = `<a href="../TvDetails/tvDetails.html?id=${id}">`;
    }
    let card = `
                    ${detailsPage}
                        <img src="${poster}" alt="">
                    </a>
                    <div class="card-text">
                        <label>
                            <img src="../../assets/img/star.png">${rating.toFixed(1)}
                            ${rateStarImage}
                        </label>
                        ${detailsPage}
                            <h3>${title}</h3>
                        </a>
                        ${cardButton}
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
    return div;
}


loadingAnimation(popularMoviesSection);

topRatedSection();

upcomingMoviesSection();
trendingCelebSection();
popularTvSection();
topBoxOfice();
checkWatchList();






