
const openNavbarMenu = () =>{
    console.log("inside nav");

    let menu = document.getElementById("nav-sections");
    menu.style.display = "block";
}


const closeNavbarMenu = () =>{
    let menu = document.getElementById("nav-sections");
    menu.style.display = "none";
}

// const userOrGuest = async () =>{
//     if(localStorage.getItem("userId")==null){
  
//       document.getElementById("guest-user").style.display = "block"; //if the localStorage is null then display sign in 
//       document.getElementById("nav-profile").style.display = "none";   // hide the profile section if the user hasn't logged in
//       }else{
  
//         document.getElementById("guest-user").style.display = "none";  
//         document.getElementById("nav-profile").style.display = "block";
  
//         const docRef = doc(db, "users", localStorage.getItem("userId"));
//         const docSnap = await getDoc(docRef);
  
//         if (docSnap.exists()) {
  
//           console.log("Document data:", docSnap.data());
//           const userDoc = docSnap.data();
//           console.log(userDoc.username);
  
//         } else {
//           // docSnap.data() will be undefined in this case
//           console.log("No such document!");
//         }
//       }
//   }

