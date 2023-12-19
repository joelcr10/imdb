export const expandArticle = () =>{
    
    document.getElementById('firstBox').style.overflow= 'visible';
    document.getElementById('firstBox').style.height= "100%";
    document.getElementById('bottomDiv').style.borderTop = "none";
    document.getElementById('firstBox').style.borderBottom = "none";
    document.getElementById('horizontalButton').style.visibility="hidden";
   
  
}

export const glowOptions = () =>{
    //console.log(index);
  document.getElementById("horizontalButton").style.backgroundColor="yellow";
  
}

export const stopGlow = () => {
    document.getElementById("horizontalButton").style.backgroundColor="white";
}

export const openSelectBox = () =>{
    let lenght = document.getElementById("articleOptions").children.length;
    if(lenght==0){
        let anchor = document.createElement('a');
        let option1= "PERMALINK "; 
        anchor.innerText = option1;
        let anchor2= document.createElement("a");
        let option2 = "REPORT THIS";
        anchor2.innerText = option2;
        
        
        document.getElementById("articleOptions").append(anchor,anchor2);
        
        document.getElementById("verticalButton").removeEventListener("click",function(){openSelectBox()});
    }else{
        document.getElementById('articleOptions').innerHTML = "";
    }
   
}