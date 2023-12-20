// Get the button
const backToTopButton = document.getElementById("back-to-top-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.documentElement.scrollTop > 600) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}


function scrollToTop() {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



// const upcomingMoviesSection = async () =>{
   
//     const API_KEY = 'Bearer dd35036818633025b77e437d6e8b9964'; 
//     const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDM1MDM2ODE4NjMzMDI1Yjc3ZTQzN2Q2ZThiOTk2NCIsInN1YiI6IjY1ODFkODQ1YmYwZjYzMDg5MzYyYjg5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sT5e5quy6JNqGpb4QC2D008yWeeV9goKw0jwdPwFY6I';
//     let minDate = "2023-12-20";
//     let maxDate = "2024-01-10";
//     const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'Authorization': ACCESS_TOKEN,    
//             'accept': 'application/json'
//         }
//     };
//     try{
//         const response = await fetch(apiUrl,options);
//         const result = await response.json();
//         let image_url = "https://image.tmdb.org/t/p/w185"
//         console.log(result);
//         let resultList = result.results;
//         console.log(resultList);
//         resultList.map((item) =>{
//             let title = item.title;
//             let poster = image_url+item.poster_path;
//             let rating = item.vote_average;
//             console.log(title,rating,poster);
//             const card = `<img class="movie-poster" src="${poster}" alt="movie-poster">
//                             <a class="movie-title">${title}</a>`;
//             let div = document.createElement('div');
//             div.setAttribute("class","poster");
//             div.innerHTML = card;
//             console.log(document.getElementById("poster-container")) ;
//         })
//     }catch(error){
//         console.log(error);
//     }
    
// }

// upcomingMoviesSection();