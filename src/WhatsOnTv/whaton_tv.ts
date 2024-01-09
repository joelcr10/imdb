const get_img = async (): Promise<void> => {
  console.log("inside omdb3");
  const API_KEY = '8b701ace30227088c2f1ef89b747c764';
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Authorization': API_KEY,
      'accept': 'application/json',
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();

    let image_url = "https://image.tmdb.org/t/p/original";
    let resultList = result.results;
    console.log(resultList);

    let image_1 = image_url + resultList[1].poster_path;
    let image_2 = image_url + resultList[10].poster_path;
    let image_3 = image_url + resultList[7].poster_path;

    const card = `<img src="${image_1}" alt="">`;

    let div = document.createElement('div');
    div.setAttribute("class", "card");
    div.innerHTML = card;

    const image1Container = document.getElementById("image_1");
    if (image1Container) image1Container.append(div);

    const card_2 = `<img src="${image_2}" alt="">`;

    let div_2 = document.createElement('div');
    div_2.setAttribute("class", "card_2");
    div_2.innerHTML = card_2;

    const image2Container = document.getElementById("image_2") ?? document.createElement('div');
    image2Container.append(div_2);

    const card_3 = `<img src="${image_3}" alt="">`;

    let div_3 = document.createElement('div');
    div_3.setAttribute("class", "card_3");
    div_3.innerHTML = card_3;

    const image3Container = document.getElementById("image_3");
    if (image3Container) image3Container.append(div_3);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

get_img();
