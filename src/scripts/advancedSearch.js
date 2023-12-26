const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc0OGYxMWVlY2YwYTNjOWE4ODM0NDhiZTUxNmI4MyIsInN1YiI6IjY1ODE2NzBmODc1ZDFhMDdkZmFlZTgyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EvpMF4IBQ8n8RIPmnupE3K1p0sXyDo-VqS0BbbmJqUM'; 
let image_url = "https://image.tmdb.org/t/p/w185";


export const multiSearch = (searchIt) => {
  fetch(`https://api.themoviedb.org/3/search/multi?query=${searchIt}&include_adult=false&language=en-US&page=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Accept': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the data
      console.log(data);

      let resultList = data.results;
      for (const item of resultList) {
        let poster = item.profile_path ? image_url + item.profile_path : image_url + item.poster_path;

        let title = item.title || item.name;

        // Adjust this line based on the property containing the overview
        let overview = item.overview || item.known_for_department;

        let releaseDate = item.release_date || "2000";
        let popularity = item.popularity;
        let voteCount = item.voteCount;

        const card = `
          <div class="poster"><img src="${poster}"></div>
          <div class="title">${title}</div>
          <div class="overview">${overview}</div>
          <div class="releaseDate">${releaseDate}</div>
          <div class="popularity">${popularity}</div>
          <div class="voteCount">${voteCount}</div>
        `;

        let div = document.createElement('div');
        div.setAttribute("class", "smallBox");
        div.innerHTML = card;
        document.getElementById("bigBox").append(div);
      } // for loop
    })
    .catch(error => {
      console.error('Fetch error:', error.message);

      // Check if there is a response and log additional details
      if (error.response) {
        console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
      }
    });
};
