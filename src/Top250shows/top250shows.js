const showDetails = async (title, release_year,overview) => {
    try {
        // Construct a string with the film details
        const details = `Title: ${title}\nRelease Year: ${release_year}\nOverview: ${overview}`;

        // Display the details in a popup alert box
        alert(details);
    } catch (error) {
        console.error('Error fetching details:', error);
    }
};


// const topshows = async () =>{
//     console.log("inside omdb3");
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
//     let image_url = "https://image.tmdb.org/t/p/original"
    

//     let resultList = result.results;
//     resultList.map((item) =>{
//         let title = item.title;
//         let poster = image_url+item.poster_path;
//         let rating = item.vote_average;
//         let date=item.release_date;
//         let overview=item.overview;
//         let release_year=date.split('-')[0];
//         let random_eps=Math.floor(Math.random() * (20 - 5 + 1)) + 5;;
//         let random_no=Math.floor(Math.random() * (5000000 - 100000 + 1)) + 100000;
//         let formatted_random_no= random_no >= 1000000 ? (random_no / 1000000).toFixed(1) + 'M' : (random_no / 1000).toFixed(1) + 'K';

//         //console.log(rating);
//         console.log(item);

//         const card = `
//                         <img src="${poster}" alt="">
//                         <div class="card-text">
//                             <label><div class="gridview_image"><img src="../../assets/img/star.png">${rating.toFixed(1)}(${formatted_random_no})</div>
//                             <div style="display: flex; align-items: center;">
//                             <img class="starred-icon" src="../../assets/img/starred.png" style="margin-right: 5px;">
//                             <span style="color: blue;">RATE</span>
//                         </div></label>
//                             <h3>${title}</h3>
//                             <label>${release_year}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ${random_eps} eps</label>
//                             <button onclick="showDetails('${title}', '${release_year}','${overview}')">Details</button>
//                         </div>
//                     `;
                    
//         let div = document.createElement('div');
//         div.setAttribute("class","card");
//         div.innerHTML = card;
//         document.getElementById("topshows-container").append(div);
//     })
   
// }

//topshows();
const fetchData = async () => {
    // const API_KEY = '8b701ace30227088c2f1ef89b747c764';
    const apiUrl = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';

    const API_KEY = 'Bearer 8b701ace30227088c2f1ef89b747c764';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA';
    // const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    // const apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,    
            'accept': 'application/json'
        }
    };

    try {
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        return result.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const populateGridView = (data) => {
    const gridContainer = document.getElementById('topshows-container');
    let image_url = "https://image.tmdb.org/t/p/original"
   
    data.forEach((item) => {
        let title = item.original_name;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
        let date=item.first_air_date;
        let overview=item.overview;
        let release_year=date.split('-')[0];
        //let release_year=date;
        let random_eps=Math.floor(Math.random() * (20 - 5 + 1)) + 5;;
        let random_no=Math.floor(Math.random() * (5000000 - 100000 + 1)) + 100000;
        let formatted_random_no= random_no >= 1000000 ? (random_no / 1000000).toFixed(1) + 'M' : (random_no / 1000).toFixed(1) + 'K';
        console.log(item)
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
            
            <button class="gridview-detailbtn" onclick="showDetails('${title}', '${release_year}','${overview}')">Details</button>
        </div>
    </div>
                     
                     `;
        gridContainer.innerHTML += card;
        
    });
};

const populateDetailedView = (data) => {
    const detailedContainer = document.getElementById('topshows-container');
    let image_url = "https://image.tmdb.org/t/p/original"
    data.forEach((item) => {
        let title = item.original_name;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
        
        let date=item.first_air_date;
        let overview=item.overview;
        // let release_year=date.split('-')[0];
        let sentences = overview.split(/[.!?]/);
        let release_year=date;
        let random_eps=Math.floor(Math.random() * (20 - 5 + 1)) + 5;;
        let random_no=Math.floor(Math.random() * (5000000 - 100000 + 1)) + 100000;
        let formatted_random_no= random_no >= 1000000 ? (random_no / 1000000).toFixed(1) + 'M' : (random_no / 1000).toFixed(1) + 'K';

        const card = `
                      
        <div class="card">
        
        <div class="thumbnail-container">
            <img class="thumbnail" src="${poster}" alt="Thumbnail">
            <div class="episode-info" >
            <h3>${title}</h3>
            <label>${release_year}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${random_eps} eps&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TV-MA
            <br><img class="star_detailed" src="../../assets/img/star.png">${rating.toFixed(1)}(${formatted_random_no})
            <img class="starred-icon" src="../../assets/img/starred.png" style="margin-right: 5px;">
                    <span style="color: blue;">RATE</span>&nbsp;&nbsp;&nbsp;TV SERIES
            </label>
            
                <p class="overview">${overview}</p>
            </div>
        </div>
    </div>
                      `;
        detailedContainer.innerHTML += card;
    });
};
 const displayData_gridview = async () => {
    const data = await fetchData();
    populateGridView(data);
   // populateDetailedView(data);
};
//displayData_gridview();
//  const displayData_detailedview = async () => {
//    const data = await fetchData();
     
//     populateDetailedView(data);
//  };

// Call the function to display data in both grid view and detailed view
//populateDetailedView(data);
displayData_gridview();

