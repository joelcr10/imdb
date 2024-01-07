import { removeFriend,searchUsername, closeModal, displayFriendRequests, cancelRequest, acceptRequest, removeFriendRequest, displayFriends } from "./UserFriends/userFriends.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getWatchlist } from "./userWatchlist/userWatchlist.js";
import { getFirestore, updateDoc , doc as firestoreDoc ,collection, setDoc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseCredentials } from "../../../config.js";
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
        // await getWatchlist();

    }else if(tabName=="Completed"){
        const path = "./CompletedList/completedList.html";
        content = await fetchContent(path);
    }else if(tabName=="Friends"){
      const path = "./UserFriends/userFriends.html";
        content = await fetchContent(path);
        document.getElementById("user-list-container").append(content);
        document.getElementById("friendSearch").oninput = function(){
          searchUsername();
        }

        document.getElementById("close-modal").onclick = function(){
          closeModal();
        }

        loadingAnimation(displayFriendRequests);

        // Get all elements with class "myButton"
        var buttons = document.querySelectorAll('.request-add-btn');

        // Iterate through each button and add the onclick event
        buttons.forEach( function(button) {
          button.addEventListener('click', async function() {
            const parentDiv = this.parentElement.parentElement.parentElement;
            const acceptId = parentDiv.getAttribute("data-value");
            await acceptRequest(acceptId);
            await removeFriendRequest(acceptId);
            parentDiv.remove();

          });
        });


        var buttons = document.querySelectorAll('.request-close-btn');

        // Iterate through each button and add the onclick event
        buttons.forEach(function(button) {
          button.addEventListener('click', async function() {
            
            const parentDiv = this.parentElement.parentElement.parentElement;
            const cancelId = parentDiv.getAttribute("data-value");
            console.log("cancelId=",cancelId);
            await cancelRequest(cancelId);
            await removeFriendRequest(cancelId);
            parentDiv.remove();

          });
        });

        // await displayFriends();  
        loadingAnimation(displayFriends);
        //add remove button feature

        const display = document.getElementById("friends-container").children;
        console.log(display.length);

        if(display.length>1){
          const removeBtn = document.getElementsByClassName("remove-friend-from-list");
          console.log(removeBtn);

          for(let i=0;i<removeBtn.length;i++){
            removeBtn[i].onclick = async function(){
                console.log(this);
                let userId = this.getAttribute("data-value");
                await removeFriend(userId);
                this.parentElement.parentElement.parentElement.remove();
            }
          }
        }




    }

    document.getElementById("user-list-container").append(content);
}


const fetchContent = async(path) =>{
    const content = await fetch(path);
    const data = await content.text();
    let div = document.createElement('div');
    div.innerHTML = data;
    return div;
}


// window.addEventListener('load', function() {
//   setTimeout(function() {
//     // Hide the loader
//     document.querySelector('.loader').style.display = 'none';
//     // Show the content
//     // document.getElementById('content').style.display = 'block';
//     console.log("loading is working");
//     fetchContent("./CompletedList/completedList.html");
//   }, 2000); // Adjust the delay time as needed (in milliseconds)
// });


// const loadingAnimation = (loadContent) =>{
//   setTimeout(async function() {
//     // Hide the loader
//     document.querySelector('.loader').style.display = 'none';
//     // Show the content
//     // document.getElementById('content').style.display = 'block';
//     console.log("loading is working");
//     await loadContent();
//   }, 2000);
// }





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
  const docRef = firestoreDoc(db, "users", localStorage.getItem("userId"));
  const docSnaps = await getDoc(docRef);
  const userDoc = docSnaps.data();
  document.getElementById("username").innerText = userDoc.username;
  document.getElementById("user-profile").setAttribute("src",userDoc.profile);

}

addFriendDetails();
  const tabs = document.querySelectorAll('.tab');
  addTabs(tabs);
  
