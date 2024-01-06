
const openNavbarMenu = () =>{
    console.log("inside nav");

    let menu = document.getElementById("nav-sections");
    menu.style.display = "block";
}


const closeNavbarMenu = () =>{
    let menu = document.getElementById("nav-sections");
    menu.style.display = "none";
}


const toggleProfileOptions = () =>{
    console.log("pressed toggle");
    const profile = document.getElementById("nav-profile-options");
    console.log("testing toggle",profile.style.display);
    if(profile.style.display==''){
        document.getElementById("nav-profile-options").style.display = "block";

    }
    if(profile.style.display=="none"){
        document.getElementById("nav-profile-options").style.display = "block";
    }else{
        document.getElementById("nav-profile-options").style.display = "none";
    }
    
}





