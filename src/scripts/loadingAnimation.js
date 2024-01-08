

const loadingAnimation = async (loadContent) =>{
    setTimeout(async function() {
      // Hide the loader
      document.querySelector('.loader').style.display = 'none';
      // Show the content
      // document.getElementById('content').style.display = 'block';
      console.log("loading is working");
      try{
        await loadContent();
      }catch(error){
        console.log("not passing anything");
      }
    }, 2000);
  }

export default loadingAnimation;