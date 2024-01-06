import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, updateDoc , doc as firestoreDoc ,collection, setDoc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseCredentials } from "../../../config.js";

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

export const openModal = async (user) =>{
    document.getElementById("friend-modal-container").style.display = "flex";
    document.getElementById("username-prompt").innerText = user.name;
    document.getElementById("modal-profile").setAttribute("src",user.profile);
    document.getElementById("add-friend-btn").onclick = function(){
        addFriend(user.id);
    }

    


    

    const docRef = firestoreDoc(db, "users", localStorage.getItem("userId"));
    const docSnaps = await getDoc(docRef);
    const userDoc = docSnaps.data();
    let friendList = userDoc.friendList;
    let pendingRequest = userDoc.pendingRequest;
    console.log("testing buttons",userDoc);
    if(pendingRequest.includes(user.id)){
        document.getElementById("add-friend-btn").style.display = "none";
        document.getElementById("remove-friend-btn").style.display = "none";
    }
    else if(friendList.includes(user.id)){
        document.getElementById("add-friend-btn").style.display = "none";
        document.getElementById("remove-friend-btn").style.display = "none";
    }else{
        document.getElementById("add-friend-btn").style.display = "block";
        document.getElementById("remove-friend-btn").style.display = "none";
    }
}

export const closeModal = () =>{
    document.getElementById("friend-modal-container").style.display = "none";
}


const addFriend = async (userId) =>{
    console.log("inside add friend");
    console.log(userId);

    const test = await getDocs(collection(db,"users"));
    console.log("get docs is working");

    try{
        const docRefs = await firestoreDoc(db,"users",userId);
        const docSnaps = await getDoc(docRefs);
        const userDoc = docSnaps.data();
        console.log("add frnd",userDoc);
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

    const userRef = await firestoreDoc(db,"users",localStorage.getItem("userId"));
    const userSnap = await getDoc(userRef);
    const doc = userSnap.data();
    let pendingRequest = doc.pendingRequest;
    
    // pendingRequest = pendingRequest.filter(item => item != userId);
    pendingRequest.push(userId);
    console.log("pen req",pendingRequest);
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
    console.log("inside add friend");
    const docRef = await firestoreDoc(db,"users",localStorage.getItem("userId"));
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();
    let friendRequest = userDoc.friendRequest;
    console.log(friendRequest);
    for(let i=0; i<friendRequest.length;i++){
        const docRef = await firestoreDoc(db,"users",friendRequest[i]);
        const docSnap = await getDoc(docRef);
        const userDoc = docSnap.data();
        const username = userDoc.username;

        const content = `<div class="friend-request-container" data-value='${friendRequest[i]}'>
                            <img src="${userDoc.profile}" alt="">
                            <div class="request-user-details">
                                <div class="user-details">
                                    <label for="">${username}</label>
                                    <label for="">email</label>
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
        console.log("added list of friend requests");

        
    }
}


export const acceptRequest = async (acceptId) =>{

    //remove the current user from the friendRequest list of friend
    //add the current user to the friendList of Friend
    console.log("accept req",acceptId);
    let docRef = await firestoreDoc(db,"users",acceptId);
    let docSnap = await getDoc(docRef);
    let userDoc = docSnap.data();
    let pendingRequest = userDoc.pendingRequest;
    pendingRequest = pendingRequest.filter(item => item != localStorage.getItem("userId"));

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
    let friendRequest = user.friendRequest;
    friendRequest = friendRequest.filter(item => item!= acceptId);

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

    console.log("successfully added the friend");

}


export const cancelRequest = async (cancelId) =>{
   
    const docRef = await firestoreDoc(db,"users",cancelId);
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();
    let pendingRequest = userDoc.pendingRequests;
    console.log(pendingRequest);
    let indexToRemove = pendingRequest.indexOf(localStorage.getItem("userId"));

    if (indexToRemove !== -1) {
        // Remove the string at the found index
        pendingRequest.splice(indexToRemove, 1);
    }

    console.log(pendingRequest);

    await updateDoc(docRef,{
        pendingRequests: pendingRequest, 
    })


}


export const removeFriendRequest = async (cancelId) =>{
    const docRef = await firestoreDoc(db,"users",localStorage.getItem("userId"));
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();
    let friendRequest = userDoc.friendRequest;
    console.log("friend req",friendRequest);

    friendRequest = friendRequest.filter(item => item != cancelId)

    console.log("friend req",friendRequest);
    await updateDoc(docRef,{
        friendRequest: friendRequest, 
    })
}


export const displayFriends = async() =>{
    const docRef = await firestoreDoc(db,"users",localStorage.getItem("userId"));
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();
    let friendList = userDoc.friendList;
    console.log(friendList);
    for(let i=0; i<friendList.length;i++){
        const docRef = await firestoreDoc(db,"users",friendList[i]);
        const docSnap = await getDoc(docRef);
        const userDoc = docSnap.data();
        const username = userDoc.username;

        const content = `<div class="friend-request-container" data-value='${friendList[i]}'>
                            <img src="${userDoc.profile}" alt="">
                            <div class="request-user-details">
                                <div class="user-details">
                                    <a href="./friendAccount.html?userId=${friendList[i]}">
                                        <label for="">${username}</label>
                                        <label for="">email</label>
                                    </a>
                                </div>
                                <div class="request-buttons">
                                    <button class="remove-friend-from-list" data-value="${friendList[i]}">Remove Friend</button>
                                </div>
                            </div>
                        </div>`;
        
        const div = document.createElement('div');
        div.innerHTML = content;
        document.getElementById("friends-container").append(div);
        console.log("added list of friend requests");

        
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