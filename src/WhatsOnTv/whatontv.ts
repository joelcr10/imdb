// tv_series.ts
export const apiFetch = async (apiUrl: string): Promise<any> => {
    // const apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
    const API_KEY = 'Bearer 8b701ace30227088c2f1ef89b747c764';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA';
  
    const options = {
      method: 'GET',
      headers: {
        'Authorization': ACCESS_TOKEN,
        'accept': 'application/json'
      }
    };
  
    try {
      const response = await fetch(apiUrl, options);
      const result = await response.json();
  
      // console.log("result",result);
  
      return result;
    } catch (err) {
      console.log(err);
    }
  };
  

const tv_series = async (): Promise<void> => {
  console.log("inside tv_series");
  const apiUrl = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
  const response= await apiFetch(apiUrl);

  console.log(response);

  let imageUrl = "https://image.tmdb.org/t/p/original";

  let image = imageUrl + response.results[1].backdrop_path;
  const card = `<img class="card_image" src="${image}" alt="">`;

  let div = document.createElement('div');
  div.setAttribute("class", "card");
  div.innerHTML = card;
  document.getElementById("image-1")!.append(div);

  let image_2 = imageUrl + response.results[8].backdrop_path;
  const card_2 = `<img class="card_image_2" src="${image_2}" alt="">`;

  console.log(image_2);
  let div_2 = document.createElement('div');
  div_2.setAttribute("class", "card_2");
  div_2.innerHTML = card_2;
  document.getElementById("image_2")!.append(div_2);

  let image_3 = imageUrl + response.results[10].backdrop_path;
  const card_3 = `<img class="card_image_3" src="${image_3}" alt="">`;

  console.log(image_3);
  let div_3 = document.createElement('div');
  div_3.setAttribute("class", "card_3");
  div_3.innerHTML = card_3;
  document.getElementById("image_3")!.append(div_3);
};

tv_series();
