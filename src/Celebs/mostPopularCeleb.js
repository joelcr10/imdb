let randomPage = getRandomNumber(1,15);
let output = 0;

 
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc0OGYxMWVlY2YwYTNjOWE4ODM0NDhiZTUxNmI4MyIsInN1YiI6IjY1ODE2NzBmODc1ZDFhMDdkZmFlZTgyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EvpMF4IBQ8n8RIPmnupE3K1p0sXyDo-VqS0BbbmJqUM'; // Replace with your actual TMDb access token
let image_url = "https://image.tmdb.org/t/p/w185";

export const celebrity = async (needDetails,firstLineNumber) => {
  for (let page = 1; page <= 5; page++) {
    try {
      
      const response = await fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${randomPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      
      const data = await response.json();
      console.log(data);

      let resultList = data.results;

      for (const item of resultList) {
        let movie;
        if (item.known_for[0]?.title) {
          movie = item.known_for[0].title;
        } else if (item.known_for[1]?.title) {
          movie = item.known_for[1].title;
        } else if (item.known_for[2]?.title) {
          movie = item.known_for[2].title;
        }
        else {
          movie = "the chihuaha";
        }

        let name = item.original_name;
        let department = item.known_for_department;
        let firstLineRandomNumber = getRandomNumber(500, 5000);
        let scr = image_url + item.profile_path;
        ++firstLineNumber;

        let id = item.id;
        let details = '';

        if (needDetails) {
          details = await detailedView(id);
        }
        details = details.split('.').slice(0, 2).join('.');
        

        const card = `
          <div class="celebrityImage"><img src="${scr}" alt=" " class="celebIcon"></div>
          <div class="firstLine" name="numberLine">( <div class="firstLineNumber">${firstLineNumber}</div>
            <img src="../../assets/img/greenUpArrow.png" alt="" class="greenUpArrow"> 
            <div class="firstLineRandomNumber">${firstLineRandomNumber}</div> )
          </div>
          <div class="secondLine" name="nameLine">${name}</div>
          <div class="thirdLine" name="positionLine">${department} </div>
          <div class="fourthLine" name="productLine"><a>${movie}</a></div>
          <div class="plusIconDiv"><img src="../../assets/img/plusIcon.png" alt="" class="plusIcon"></div>
          <div class=details>${details}</div>
        `;

        let div = document.createElement('div');
        div.setAttribute("class", "celebrityBox");
        div.innerHTML = card;
        document.getElementById("bigBox").append(div);
        if(output<100){
          output++;
        }
        else{
          break;
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle errors here
    }
  }
  randomPage++;
};

const detailedView = async (id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data.biography;
  } catch (error) {
    console.error('Fetch error:', error);
    // Handle errors here
  }
};

function getRandomNumber(min, max) {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
  return randomNumber;
}
