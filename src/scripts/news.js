
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