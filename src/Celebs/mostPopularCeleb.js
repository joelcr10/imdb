import { apiFetch } from "../scripts/apiFetch.js";

//let randomPage = getRandomNumber(1,15);

let image_url = "https://image.tmdb.org/t/p/w185";

export const celebrity = async (needDetails,firstLineNumber) => {
  for (let page = 1; page <= 5; page++) {
    console.log("first fetch started");
  
      
      const data = await apiFetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`);
       

      
     
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
        let firstLineRandomNumber = Math.floor(item.popularity * 10);


        let scr = image_url + item.profile_path;
        ++firstLineNumber;

        let id = item.id;
        let details = '';

        if (needDetails) {
          details = await detailedView(id);
          details = details.split('.').slice(0, 2).join('.')+ ('.');
        }
        
        

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
        
      }
    }
  }
    

const detailedView = async (id) => {
  
    const response = await apiFetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`);      


   
    console.log(response);

    return response.biography;
 
}

function getRandomNumber(min, max) {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
  return randomNumber;
}
