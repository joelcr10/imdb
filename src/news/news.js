import { newsApi } from "../../config.js";

const apiKey = newsApi.API_KEY;
let output = 0;
let articleUrl = "";
let query = "games";
let url;


export const setQuery = (value = "celebrity") => {
    query = value;
    url = `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${apiKey}`;
}

let req = new Request(url, {
    method: 'GET',
    headers: {
        'Authorization': ` ${apiKey}`,
        // Add any other headers if needed
    },
});

const createResultCard = (item) => {
    let imageUrl = item.urlToImage;
    let author = item.author;
    let content = item.content.split(".");
    let description = item.description;

    for (let i = 0; i < content.length; i++) {
        let startIndex = content[i].indexOf("[");
        let endIndex = content[i].indexOf("]");

        // Remove the content within the square brackets for each element
        content[i] = content[i].slice(0, startIndex) + content[i].slice(endIndex + 1);
    }

    let title = item.title;
    let source = item.source.name;
    articleUrl = item.url;
    let publishDate = item.publishedAt;

    const card = `
        <div class="article">
        <div class="firstBox" >
        <div class="firstNews">
        <img src="${imageUrl}" alt="" class="firstImage">
        <div class="firstContent">
        <h3 class="firstTitle"><a href="${articleUrl}"> ${title}<img src="/assets/img/linkArrow.png" alt="" class="arrowOne"> </a></h3>
        <div class="firstArticle" ><p>${description}</p> <p> ${content} </p> <p>${description}</p> <p> ${content} </p>
        <a href="${articleUrl}"> See full article at ${articleUrl} <img src="/assets/img/linkArrow.png" alt="" class="arrowTwo"> </a> <br>
        </div>
        </div>
        </div>
        </div> 
        <div  class="bottomDiv"> 
          <div class="articleOptions">
          </div>
          <p>${publishDate} by ${author} <br><a href="${articleUrl}">${source}</a></p>
          <div class="horizontalButton" > ...</div>
          <div class="verticalButton"   >...</div>
          </div>
        </div>  
    `;

    return card;
}

export const getNews = async () => {
    output = 0;
    loading();
    document.getElementById("bigBox").innerHTML = "";
  console.log(req);
    console.log("query value " + query);
    try {
      
      // Create a new instance of Request with the current value of url
      const req = new Request(url, {
        method: 'GET',
        headers: {
            'Authorization': ` ${apiKey}`,
            // Add any other headers if needed
        },
    });
        const response = await fetch(req);
      

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        
        console.log(query);

        let resultList = data.articles;
        for (let item of resultList) {
            if (item.urlToImage == null) {
                continue;
            }
            let card = createResultCard(item);

            let div = document.createElement("div");
            div.innerHTML = card;
            document.getElementById("bigBox").append(div);

            output++;
            if (output > 50) {
                console.log("printing over");
                break;
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const expandArticle = (index) => {
    document.getElementsByClassName('firstBox')[index].style.overflow = 'visible';
    document.getElementsByClassName('firstBox')[index].style.height = "100%";
    document.getElementsByClassName('bottomDiv')[index].style.borderTop = "none";
    document.getElementsByClassName('firstBox')[index].style.borderBottom = "none";
    document.getElementsByClassName('horizontalButton')[index].style.visibility = "hidden";
}

export const glowOptions = (index) => {
    document.getElementsByClassName("horizontalButton")[index].style.color = '#f5c518';
}

export const stopGlow = (index) => {
    document.getElementsByClassName("horizontalButton")[index].style.color = "black";
}

export const openSelectBox = (index) => {
    let length = document.getElementsByClassName("articleOptions")[index].children.length;
    if (length == 0) {
        let anchor = document.createElement('a');
        let option1 = "PERMALINK ";
        anchor.innerText = option1;
        anchor.href = `${articleUrl}`;
        anchor.classList.add("permalink");
        let anchor2 = document.createElement("a");
        let option2 = "REPORT THIS";
        anchor2.innerText = option2;
        anchor2.classList.add("reportThis");

        document.getElementsByClassName("articleOptions")[index].appendChild(anchor);
        document.getElementsByClassName('articleOptions')[index].appendChild(anchor2);

        document.getElementsByClassName("verticalButton")[index].removeEventListener("click", function () { openSelectBox(index) });
    } else {
        document.getElementsByClassName('articleOptions')[index].innerHTML = "";
    }
}

  const loading =  () => {
    document.getElementById('loading-screen').style.display = "";
    setTimeout( function (){
        // Hide the loading screen after 2 seconds
        document.getElementById('loading-screen').style.display = 'none';
        // You can add additional actions or load your main content here
      }, 3000);
 };
