import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, updateDoc , doc as firestoreDoc ,collection, setDoc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseCredentials } from "../../../config.js";
// import loadingAnimation from "../../scripts/loadingAnimation.js";

const firebaseConfig = firebaseCredentials;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const searchUsername = async () =>{
    let search = document.getElementById("friendSearch").value;
    // console.log(search.value);

    if(search==""){
        document.getElementById("search-results").innerHTML = "";
        return;
    }

    const test = await getDocs(collection(db,"users"));
    
    let tempDocList = [];
    test.forEach((doc) => {
        const username = doc.data().username;
        if(username.includes(search)){
            tempDocList.push({
                name: username,
                id: doc.id,
                profile: doc.data().profile,
            });

        }
  
      });

    console.log(tempDocList);
    
    document.getElementById("search-results").innerHTML = "";
    //creating the results
    if(tempDocList.length==0){
        let span = document.createElement("span");
        span.innerText = "No Such username exists";
        document.getElementById("search-results").append(span);
    }else{
        for(let i=0;i<tempDocList.length;i++){
            if(tempDocList[i].id!=localStorage.getItem("userId")){
                let span = document.createElement("span");
                span.innerText = tempDocList[i].name;
                span.onclick = function(){
                    openModal(tempDocList[i]);
                }
                console.log(tempDocList[i]);
                document.getElementById("search-results").append(span);
            }
        }
    }
    

}

export const openModal = async (user) =>{
    document.getElementById("friend-modal-container").style.display = "flex";
    document.getElementById("username-prompt").innerText = user.name;
    document.getElementById("modal-profile").setAttribute("src",user.profile);
    document.getElementById("add-friend-btn").onclick = function(){
        addFriend(user.id);
    }

 
    let userDoc = await getUserDoc(localStorage.getItem("userId"));

    let friendList = userDoc.friendList;
    let pendingRequest = userDoc.pendingRequest;

    //if the friend is in the pendingList then the user can not send him/her a friend request again
    //checking if the current user has the friend's user id in it's pending list
    if(pendingRequest.includes(user.id)){

        document.getElementById("add-friend-btn").style.display = "none";
    }
    else if(friendList.includes(user.id)){

        document.getElementById("add-friend-btn").style.display = "none";

    }else{
        //only give the option to add friend when the friend is not already in the friendlist or pendingList
        document.getElementById("add-friend-btn").style.display = "block";

    }
}

export const closeModal = () =>{

    document.getElementById("friend-modal-container").style.display = "none";
}



//adding friend from the modal box
const addFriend = async (userId) =>{

    try{
        let docRefs = await firestoreDoc(db,"users",userId);
        let userDoc = await getUserDoc(userId);
        
        let friendRequest = userDoc.friendRequest;

        friendRequest.push(localStorage.getItem("userId"));

        await updateDoc(docRefs,{
            friendRequest: friendRequest,
        });

        document.getElementById("add-friend-btn").style.display = "none";
        document.getElementById("remove-friend-btn").style.display = "block";

    }catch(error){
        console.log(error);
    }

    let userRef = await firestoreDoc(db,"users",localStorage.getItem("userId"));
    let doc = await getUserDoc(localStorage.getItem("userId"));
    let pendingRequest = doc.pendingRequest;
    
    pendingRequest.push(userId);

    try{
        await updateDoc(userRef,{
            pendingRequest: pendingRequest,
        }).then((data)=>{
            console.log("Sent Friend Request");
        });

    }catch(error){
        console.log(error);
    } 
    
}


export const displayFriendRequests = async () =>{
    

    let userDoc = await getUserDoc(localStorage.getItem("userId"));

    let friendRequest = userDoc.friendRequest;

    if(friendRequest.length==0){    //if the user has no friend request yet
        
        document.getElementById("friend-request-prompt").innerText = "No new Request";
    
    }else{
        
        for(let i=0; i<friendRequest.length;i++){
            
            let userDoc = await getUserDoc(friendRequest[i]); //getting the doc of each friend request

            const username = userDoc.username;
            
            //creating card for friend
            const content = `<div class="friend-request-container" data-value='${friendRequest[i]}'>
                                <img src="${userDoc.profile}" alt="">
                                <div class="request-user-details">
                                    <div class="user-details">
                                        <label for="">${username}</label>
                                        
                                    </div>
                                    <div class="request-buttons">
                                        <span class="request-close-btn">&times;</span>
                                        <span class="request-add-btn">&#x2713;</span>
                                    </div>
                                </div>
                            </div>`;
            
            const div = document.createElement('div');
            div.innerHTML = content;
            document.getElementById("friend-requests").append(div);
    
            
        }
    }
    
}


export const acceptRequest = async (acceptId) =>{

    //remove the current user from the friendRequest list of friend
    //add the current user to the friendList of Friend
    
    let docRef = await firestoreDoc(db,"users",acceptId);
    let docSnap = await getDoc(docRef);
    let userDoc = docSnap.data();

    let pendingRequest = userDoc.pendingRequest;

    //removing the current user from the friend's pending list
    pendingRequest = pendingRequest.filter(item => item != localStorage.getItem("userId"));

    //adding current user to the friend's friendlist
    let friendList = userDoc.friendList;
    friendList.push(localStorage.getItem("userId"));

    try{
        await updateDoc(docRef,{
            pendingRequest: pendingRequest,
            friendList: friendList
        })
    }catch(error){
        console.log("unable to update friend list",error);
    }

    //remove friend req from pendinglist from user
    //add friend to friendlist of user

    let userRef = await firestoreDoc(db,"users",localStorage.getItem("userId"));
    let userSnap = await getDoc(userRef);
    let user = userSnap.data();

    //removing the friend from current user's friend request list
    let friendRequest = user.friendRequest;
    friendRequest = friendRequest.filter(item => item!= acceptId);

    //adding the friend to user's friendlist
    let userFriendList = user.friendList;
    userFriendList.push(acceptId);

    try{
        await updateDoc(userRef,{
            friendList: userFriendList,
            friendRequest: friendRequest
        })
    }catch(error){
        console.log(error);
    }
}


export const cancelRequest = async (cancelId) =>{
   
    const docRef = await firestoreDoc(db,"users",cancelId);
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();

    let pendingRequest = userDoc.pendingRequest;
    
    //removing the current user from the friend's pending list
    let indexToRemove = pendingRequest.indexOf(localStorage.getItem("userId"));

    if (indexToRemove !== -1) {
        // Remove the string at the found index
        pendingRequest.splice(indexToRemove, 1);
    }

    console.log(pendingRequest);

    await updateDoc(docRef,{
        pendingRequest: pendingRequest, 
    })


}


export const removeFriendRequest = async (cancelId) =>{

    const docRef = await firestoreDoc(db,"users",localStorage.getItem("userId"));
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();

    let friendRequest = userDoc.friendRequest;

    friendRequest = friendRequest.filter(item => item != cancelId)

    await updateDoc(docRef,{
        friendRequest: friendRequest, 
    })
}


export const displayFriends = async() =>{

    
    let userDoc = await getUserDoc(localStorage.getItem("userId"));
    let friendList = userDoc.friendList;

    for(let i=0; i<friendList.length;i++){

        let userDoc = await getUserDoc(friendList[i]);

        const username = userDoc.username;

        const content = `<div class="friend-request-container" data-value='${friendList[i]}'>
                            <img src="${userDoc.profile}" alt="">
                            <div class="request-user-details">
                                <div class="user-details">
                                    <a href="./friendAccount.html?userId=${friendList[i]}">
                                        <label for="">${username}</label>
                                        
                                    </a>
                                </div>
                                <div class="request-buttons">
                                    <button class="remove-friend-from-list" data-value="${friendList[i]}">Remove</button>
                                </div>
                            </div>
                        </div>`;
        
        const div = document.createElement('div');
        div.innerHTML = content;
        document.getElementById("friends-container").append(div);

        
    }

}



export const removeFriend = async(userId) =>{
    
    //remove the friend from the user list
    let docRef = await firestoreDoc(db,"users",localStorage.getItem("userId"));
    let docSnap = await getDoc(docRef);
    let userDoc = docSnap.data();
    let friendList = userDoc.friendList;
    friendList = friendList.filter(item => item!= userId);

    await updateDoc(docRef,{
        friendList: friendList,
    })


    //remove the user from the friend list
    let userRef = await firestoreDoc(db,"users",userId);
    let userSnap = await getDoc(userRef);
    let user = userSnap.data();
    let userFriendList = user.friendList;
    userFriendList = userFriendList.filter(item => item!=localStorage.getItem("userId"));

    await updateDoc(userRef,{
        friendList: userFriendList
    })


    console.log("successfully remove the friend");

}


const getUserDoc = async (userId) =>{
    let userRef = await firestoreDoc(db,"users",userId);
    let userSnap = await getDoc(userRef);
    let user = userSnap.data();
    return user;
}