const apiKey ="f575a715e6d64500abfa65a89012f5fd";
let output = 0;


 

var url = 'https://newsapi.org/v2/everything?' +
          'q=television&' +
          'sortBy=popularity&' +
          'apiKey=f575a715e6d64500abfa65a89012f5fd';


//var req = new Request(url);
const req = new Request(url, {
    method:'GET',
    headers: {
      'Authorization': ` ${apiKey}`,
      // Add any other headers if needed
    },
  });
  

export const getNews = () => {
    fetch(req)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  // This returns a Promise
      })
      .then(data => {
        console.log('API Response:', data);
        let resultList = data.articles;
        for(let item of resultList){
            
            if(item.urlToImage == null){
                continue;
            }
            let imageUrl = item.urlToImage;
            let author = item.author;
            let content = item.content.split(".");
            let description = item.description ;
            let title= item.title;
            let source = item.source.name;
            let articleUrl = item.url;
            let publishDate = item.publishedAt;

            
        const card =`
        <div class="article">
        <div class="firstBox" >
        <div class="firstNews">
        <img src="${imageUrl}" alt="" class="firstImage">
        <div class="firstContent">
         <h3 class="firstTitle"> ${title}<img src="/assets/img/linkArrow.png" alt="" class="arrowOne"></h3>
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
`

           let div = document.createElement("div");
           div.innerHTML = card;
           document.getElementById("bigBox").append(div);

           output ++;
           if(output >50){
            console.log("printing over");
            break;
           }
           
        }
        
      


      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

// getNews();



export const expandArticle = (index) =>{
   
     document.getElementsByClassName('firstBox')[index].style.overflow= 'visible';
     document.getElementsByClassName('firstBox')[index].style.height= "100%";
     document.getElementsByClassName('bottomDiv')[index].style.borderTop = "none";
     document.getElementsByClassName('firstBox')[index].style.borderBottom = "none";
     document.getElementsByClassName('horizontalButton')[index].style.visibility="hidden";
    
   
 }
 
 export const glowOptions = (index) =>{
     
    
   document.getElementsByClassName("horizontalButton")[index].style.color='#f5c518';
   
 }
 
 export const stopGlow = (index) => {
    
     document.getElementsByClassName("horizontalButton")[index].style.color="black";
 }
 
 export const openSelectBox = (index) =>{
     
     let length = document.getElementsByClassName("articleOptions")[index].children.length;
     if(length==0){
         let anchor = document.createElement('a');
         let option1= "PERMALINK "; 
         anchor.innerText = option1;
         anchor.classList.add("verticalOptions");
         let anchor2= document.createElement("a");
         let option2 = "REPORT THIS";
         anchor2.innerText = option2;
         anchor2.classList.add("verticalOptions");
         
         document.getElementsByClassName("articleOptions")[index].appendChild(anchor);
         document.getElementsByClassName('articleOptions')[index].appendChild(anchor2);
         
         document.getElementsByClassName("verticalButton")[index].removeEventListener("click",function(){openSelectBox(index)});
     }else{
         document.getElementsByClassName('articleOptions')[index].innerHTML = "";
     }  
 } 
