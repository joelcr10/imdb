
const testApi = async () =>{
    console.log("inside test api");
    const url = 'https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '68fcb202f9msh7cd96d8060edf68p1caac9jsn2e0d2adc412e',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.list);

        const responseList = result.data.list;
        responseList.map((item)=>{
            // console.log(item);
            // console.log(item.titleText.text);
            let title = item.titleText.text;
            let poster = item.primaryImage.imageUrl;
            let rating = item.ratingsSummary.aggregateRating;
            console.log(title,rating,poster);
            const card = `
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                        `;
            let div = document.createElement('div');
            div.setAttribute("class","card");
            div.innerHTML = card;
            document.getElementById("fan-favourites").append(div);
        })
    } catch (error) {
        console.error(error);
    }
}


const weekly = async () =>{
    console.log("inside weekly");
    const url = 'https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&currentCountry=US&purchaseCountry=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e3c1c41e2amshad1d9b66640f728p163e50jsn66be4c08e6a5',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result[0]);
    } catch (error) {
        console.error(error);
    }
}


const popularMoviesSection = async () =>{
    console.log("inside omdb3");
    const API_KEY = '8b701ace30227088c2f1ef89b747c764';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': API_KEY,    
            'accept': 'application/json'
        }
    };
    const response = await fetch(apiUrl,options);
    const result = await response.json();
    let image_url = "https://image.tmdb.org/t/p/w185"
    

    let resultList = result.results;
    resultList.map((item) =>{
        let title = item.title;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
        console.log(title,rating,poster);
        const card = `
                        <img src="${poster}" alt="">
                        <div class="card-text">
                            <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                            <h3>${title}</h3>
                            <button><span>+</span> Watchlist</button>
                        </div>
                    `;
        let div = document.createElement('div');
        div.setAttribute("class","card");
        div.innerHTML = card;
        document.getElementById("popular-movies").append(div);
    })
}

const topRatedSection = async () =>{
    console.log("inside tmdb function");
    const API_KEY = 'Bearer 8b701ace30227088c2f1ef89b747c764';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA';
    // const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
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
        let image_url = "https://image.tmdb.org/t/p/w185"
        console.log(result);
        let resultList = result.results;
        console.log(resultList);
        resultList.map((item) =>{
            let title = item.title;
            let poster = image_url+item.poster_path;
            let rating = item.vote_average;
            console.log(title,rating,poster);
            const card = `
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                        `;
            let div = document.createElement('div');
            div.setAttribute("class","card");
            div.innerHTML = card;
            document.getElementById("top-rated").append(div);
        })
    }catch(error){
        console.log(error);
    }
    
}

const upcomingMoviesSection = async () =>{
   
    const API_KEY = 'Bearer 8b701ace30227088c2f1ef89b747c764'; 
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA';
    let minDate = "2023-12-20";
    let maxDate = "2024-01-10";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
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
        let image_url = "https://image.tmdb.org/t/p/w185"
        console.log(result);
        let resultList = result.results;
        console.log(resultList);
        resultList.map((item) =>{
            let title = item.title;
            let poster = image_url+item.poster_path;
            let rating = item.vote_average;
            console.log(title,rating,poster);
            const card = `
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                        `;
            let div = document.createElement('div');
            div.setAttribute("class","card");
            div.innerHTML = card;
            document.getElementById("upcoming-movies").append(div);
        })
    }catch(error){
        console.log(error);
    }
    
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
        let image_url = "https://image.tmdb.org/t/p/w185"
        console.log(result);
        let resultList = result.results;
        console.log(resultList);
        resultList.map((item) =>{
            console.log(item);
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

