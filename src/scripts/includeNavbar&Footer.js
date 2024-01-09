import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, getDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

import { watchlistCounter } from "../YourWatchList/watchlist.js";

import {apiFetch} from "../scripts/apiFetch.js"
import { firebaseCredentials } from "../../config.js";






const firebaseConfig = firebaseCredentials;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const includeNavbar = async () =>{
   
    await fetch("../pages/navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => {
      console.error('Error fetching navbar:', error);
    });
    
}


const userOrGuest = async () =>{

    if(localStorage.getItem("userId")==null){
      
      document.getElementById("guest-user").style.display = "block"; //if the localStorage is null then display sign in 
      document.getElementById("nav-profile").style.display = "none";   // hide the profile section if the user hasn't logged in
      }
    else{
      document.getElementById("nav-profile").style.display = "flex";

      document.getElementById("guest-user").style.display = "none";  

      const docRef = doc(db, "users", localStorage.getItem("userId"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        
        const userDoc = docSnap.data();
     
        document.getElementById("nav-username").innerText = userDoc.username;
        document.getElementById("profile-icon").setAttribute("src",userDoc.profile);

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
}


const includeFooter = async () =>{
    
    await fetch("../pages/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch( error =>{
        console.error("error fetching footer: ",error);
    })
}


export const signOut = () =>{
  
  localStorage.setItem("userId",null);
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  

  location.reload();
}


window.onload =async function() {
    
    await includeNavbar();
    await includeFooter();
    await userOrGuest();
    await watchlistCounter();
    document.getElementById("signout-btn").onclick = function(){
      signOut();
    }
    //navbar search
      search();
    
      };


//navbar search functionality

let image_url = "https://image.tmdb.org/t/p/original";
let output =0;
const search = () => {
    let searchInput = document.getElementById("searchnow");
    let searchFilterInput = document.getElementById("searchFilter");
  

    // Use a named function for the event handler to improve readability
    const handleSearch = async () => {
      document.getElementById("searchResult").innerHTML = "";
      if(document.getElementById("errorBox") !=null){
        document.getElementById("navErrorBox").style.visibility="hidden";
        document.getElementById("errorBox").innerHTML = "";
      }
      
        if (searchInput.value !== "") {
            await fetchResults(searchInput.value, searchFilterInput.value);
        }
    };

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
          output = 0;
            handleSearch();
        }
    });

    searchInput.addEventListener("input", function () {
      document.getElementById("navErrorBox").style.visibility="hidden";
      document.getElementById("navErrorBox").innerHTML = "";
      output = 0;
          handleSearch();
  });

   
    
};

const createResultCard = (item) => {
  const poster = item.profile_path ? image_url + item.profile_path : image_url + item.poster_path;
  const title = item.title || item.name;
  

  const littleBox = document.createElement("div");
  littleBox.classList.add("littleBox");

  const card = `<a href="../MovieDetails/movieDetails.html?id=${item.id}">
                  <div class="imageBox"> <img src="${poster}" alt=""  ></div>
                  <div class="titleBox">${title}</div>
                </a>
              `;

  littleBox.innerHTML = card;
  return littleBox;
};


const createResultCardForTv = (item) => {
  const poster = item.profile_path ? image_url + item.profile_path : image_url + item.poster_path;
  const title = item.title || item.name;
  

  const littleBox = document.createElement("div");
  littleBox.classList.add("littleBox");

  const card = `<a href="../TvDetails/tvDetails.html?id=${item.id}">
                  <div class="imageBox"> <img src="${poster}" alt=""  ></div>
                  <div class="titleBox">${title}</div>
                </a>
              `;

  littleBox.innerHTML = card;
  return littleBox;
};


const createResultCardForPerson = (item) => {
  const poster = item.profile_path ? image_url + item.profile_path : image_url + item.poster_path;
  const title = item.title || item.name;
  

  const littleBox = document.createElement("div");
  littleBox.classList.add("littleBox");

  const card = `<a href="../CelebDetails/celebDetails.html?id=${item.id}">
                  <div class="imageBox"> <img src="${poster}" alt=""  ></div>
                  <div class="titleBox">${title}</div>
                </a>
              `;

  littleBox.innerHTML = card;
  return littleBox;
};

const appendResultCard = (littleBox) => {
  if(output < 4){
    
    document.getElementById("searchResult").appendChild(littleBox);
  output++;
  }
  
};
 
let page = 1;
const fetchResults = async (searchItem, type) => {
  
 
          const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${searchItem}&include_adult=false&language=en-US&page=${page}`;

          let result = await apiFetch(apiUrl);
           let
            resultList = result.results;

          
          if (resultList.length === 0) {
            let message = "Sorry no information available!";
    
            let div = document.createElement("div");
            div.textContent = message;
            document.getElementById("searchResult").style.visiblity = "hidden";
            document.getElementById("navErrorBox").innerHTML = "";
            document.getElementById("navErrorBox").style.visibility="visible";
            document.getElementById("navErrorBox").append(div);
          }
        
          
            
          if (type !== "") {
            const filteredResults =resultList.filter(item => item.media_type === type);
            resultList = filteredResults;
          }
          
          for(const item of resultList){

           let littleBox;
            switch(item.media_type)
            { 
              case "movie" :  littleBox = createResultCard(item);
                              appendResultCard(littleBox);
                              break;
              case "tv"    : littleBox = createResultCardForTv(item);
                             appendResultCard(littleBox);
                             break;
              case "person": littleBox = createResultCardForPerson(item);
                             appendResultCard(littleBox);
                             break;        
              default      :  littleBox = createResultCard(item);
                              appendResultCard(littleBox);
                              break;    
            }
             
           
      }
    }
    




