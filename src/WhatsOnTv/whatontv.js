const get_image = async () =>{
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
      let image_url = "https://image.tmdb.org/t/p/original"
    

    let resultList = result.results;
    console.log(resultList);
    let image_1=image_url+resultList[1].poster_path;
    let image_2=image_url+resultList[10].poster_path;
    let image_3=image_url+resultList[7].poster_path;
        const card = `<img src="${image_1}" alt="">`;
                    
        let div = document.createElement('div');
        div.setAttribute("class","card");
        div.innerHTML = card;
        document.getElementById("image_1").append(div);

        const card_2 = `<img src="${image_2}" alt="">`;
                    
        let div_2 = document.createElement('div');
        div_2.setAttribute("class","card_2");
        div_2.innerHTML = card_2;
        document.getElementById("image_2").append(div_2);
        
        const card_3 = `<img src="${image_3}" alt="">`;
                    
        let div_3 = document.createElement('div');
        div_3.setAttribute("class","card_3");
        div_3.innerHTML = card_3;
        document.getElementById("image_3").append(div_3);
  };
  get_image();