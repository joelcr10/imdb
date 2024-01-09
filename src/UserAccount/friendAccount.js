import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, updateDoc , doc as firestoreDoc ,collection, setDoc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseCredentials } from "../../../config.js";
import { getWatchlist } from "./friendWishlist.js";
import loadingAnimation from "../scripts/loadingAnimation.js";

const firebaseConfig = firebaseCredentials;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const switchTab = async (tabName) =>{
    let content = "";
    if(tabName=="WatchList"){
        const path = "./userWatchlist/userWatchlist.html";
        content = await fetchContent(path);
        document.getElementById("user-list-container").append(content);
        loadingAnimation(getWatchlist);

    }else if(tabName=="Completed"){
        const path = "./CompletedList/completedList.html";
        content = await fetchContent(path);
        document.getElementById("user-list-container").append(content);
    }

    
}


const fetchContent = async(path) =>{
    const content = await fetch(path);
    const data = await content.text();
   
    let div = document.createElement('div');
    div.innerHTML = data;

    return div;

}

const addTabs = (tabs) =>{
    // Add click event listeners to each tab
      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Remove 'active' class from all tabs
          document.getElementById("user-list-container").innerHTML = "";
          tabs.forEach(t => t.classList.remove('active'));
  
          // Add 'active' class to the clicked tab
          this.classList.add('active');
          const tabName = this.innerText;
          console.log("switching");
          switchTab(tabName);
          
        });
      });
      


  }
  

const addFriendDetails = async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('userId');
    const docRef = firestoreDoc(db, "users", userId);
    const docSnaps = await getDoc(docRef);
    const userDoc = docSnaps.data();
    document.getElementById("username").innerText = userDoc.username;
    document.getElementById("user-profile").setAttribute("src",userDoc.profile);

}

addFriendDetails();
const tabs = document.querySelectorAll('.tab');
addTabs(tabs);
