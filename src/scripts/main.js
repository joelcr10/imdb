
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


// testApi();
weekly();
