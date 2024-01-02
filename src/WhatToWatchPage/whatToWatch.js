async function test2(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
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
        console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/original";
        apilist.map((item)=>{
            // console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            // console.log(title,rating);
            const card = `
                            
                            <img src="${poster}">
                            <h3>${title}</h3>
                            <label>${rating}</label>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","cards");
            divs.innerHTML = card
            document.getElementById("firstlist").append(divs);
            
        })
    }catch(error){
        console.log(error);
    }
 }
test2();

async function first(){
    console.log("inside first");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
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
        console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            // console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            // console.log(title,rating);
            const card = `
                            
                            <img src="${poster}">
                            <h3>${title}</h3>
                            <label>${rating}</label>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","cards");
            divs.innerHTML = card
            document.getElementById("cardbody").append(divs);
            
        })
    }catch(error){
        console.log(error);
    }
}
first();