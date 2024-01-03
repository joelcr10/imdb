
const mostpopularshows = async () =>{
    console.log("inside omdb3");
    const API_KEY = 'Bearer d808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,    
            'accept': 'application/json'
        }
    };
    const response = await fetch(apiUrl,options);
    const result = await response.json();
    let image_url = "https://image.tmdb.org/t/p/original"
    

    let resultList = result.results;
    resultList.map((item) =>{
        let title = item.title;
        let poster = image_url+item.poster_path;
        let rating = item.vote_average;
        let date=item.release_date;
        let overview=item.overview;
        let release_year=date.split('-')[0];
        let random_eps=Math.floor(Math.random() * (20 - 5 + 1)) + 5;;
        let random_no=Math.floor(Math.random() * (5000000 - 100000 + 1)) + 100000;
        let formatted_random_no= random_no >= 1000000 ? (random_no / 1000000).toFixed(1) + 'M' : (random_no / 1000).toFixed(1) + 'K';

        //console.log(rating);
        console.log(item);

        const card = `
                        <img src="${poster}" alt="">
                        <div class="card-text">
                            <label><div class="gridview_image"><img src="../../assets/img/star.png">${rating.toFixed(1)}(${formatted_random_no})</div>
                            <div style="display: flex; align-items: center;">
                            <img class="starred-icon" src="../../assets/img/starred.png" style="margin-right: 5px;">
                            <span style="color: blue;">RATE</span>
                        </div></label>
                            <h3>${title}</h3>
                            <label>${release_year}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ${random_eps} eps</label>
                            <button onclick="showDetails('${title}', '${release_year}','${overview}')">Details</button>
                        </div>
                    `;
                    
        let div = document.createElement('div');
        div.setAttribute("class","card");
        div.innerHTML = card;
        document.getElementById("topshows-container").append(div);
    })
   
}
mostpopularshows ();