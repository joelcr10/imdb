import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore , doc as firestoreDoc , getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseCredentials } from "../../../config.js";

import { removeFriend,searchUsername, closeModal, displayFriendRequests, cancelRequest, acceptRequest, removeFriendRequest, displayFriends } from "./UserFriends/userFriends.js";
import { getWatchlist } from "./userWatchlist/userWatchlist.js";
import loadingAnimation from "../scripts/loadingAnimation.js";


//fetching the firebase credentials
const firebaseConfig = firebaseCredentials;

//initialize the firebase app
const app = initializeApp(firebaseConfig);

//intializing the firestore database
const db = getFirestore(app);


//function to switch between tabs in user account page
const switchTab = async (tabName) =>{ 
    let content = "";
    if(tabName=="WatchList"){

        const path = "./userWatchlist/userWatchlist.html";
        content = await fetchContent(path);   //fetching the content from watchlist
        document.getElementById("user-list-container").append(content); //adding the content to the userAccount page
        loadingAnimation(getWatchlist);   //loadding animation
        

    }else if(tabName=="Completed"){ 

        const path = "./CompletedList/completedList.html";
        content = await fetchContent(path);
        document.getElementById("user-list-container").append(content); //adding the content to the userAccount page

    }else if(tabName=="Friends"){

      const path = "./UserFriends/userFriends.html";
      content = await fetchContent(path);
      document.getElementById("user-list-container").append(content); //adding the content to the userAccount page

      //adding the searchUsername function to the search bar
      document.getElementById("friendSearch").oninput = function(){
        searchUsername();
      }

      //adding close button to the Modal after it's loaded
      document.getElementById("close-modal").onclick = function(){
          closeModal();
      }

      loadingAnimation();
      await displayFriendRequests();

      // Get all elements with class "myButton"
      var buttons = document.querySelectorAll('.request-add-btn');

      // Iterate through each button and add the onclick event to accept the friend request
      buttons.forEach( function(button) {
          button.addEventListener('click', async function() {
            const parentDiv = this.parentElement.parentElement.parentElement;
            const acceptId = parentDiv.getAttribute("data-value");
            await acceptRequest(acceptId);
            await removeFriendRequest(acceptId);
            parentDiv.remove();    //removing the element after the request has been accepted

        });
      });



        var buttons = document.querySelectorAll('.request-close-btn');
       
        // Iterate through each button and add the onclick event
        buttons.forEach(function(button) {
          button.addEventListener('click', async function() {

            console.log("clicled cancel request");
            const parentDiv = this.parentElement.parentElement.parentElement;
            const cancelId = parentDiv.getAttribute("data-value");

            await cancelRequest(cancelId);
            await removeFriendRequest(cancelId);
            parentDiv.remove();  //removing the element after the request has been cancelled

          });
        });

        loadingAnimation();
        await displayFriends();  //passing a function to display the FriendList

        //add remove button feature

        const display = document.getElementById("friends-container").children;

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

        //passing the clicked tab to the switch tab
        switchTab(tabName);
        
      });
    });
}

const addFriendDetails = async () =>{


  const docRef = firestoreDoc(db, "users", localStorage.getItem("userId"));
  const docSnaps = await getDoc(docRef);
  const userDoc = docSnaps.data();

  //setting the username and profile to the user account
  document.getElementById("username").innerText = userDoc.username;
  document.getElementById("user-profile").setAttribute("src",userDoc.profile);

}

addFriendDetails();  //invoking the function to set username and profile to user account

const tabs = document.querySelectorAll('.tab');  //getting all the tab elements
addTabs(tabs);  
  
