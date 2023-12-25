function openTab(tabName) {
    // Hide all tab content
    var tabContent = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Remove 'active' class from all tabs
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Show the selected tab content and mark the tab as active
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active');
}



///////////////////////////////////////   API FETCH   ///////////////////////////////////////////////// 


async function apifetch1(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            console.log(title,rating);
            const card = `
                            
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","card");
            divs.innerHTML = card;
            
                document.getElementById("apilist1-0").append(divs);
                document.getElementById("apilist1-1").append(divs);
                document.getElementById("apilist1-2").append(divs);
                document.getElementById("apilist1-3").append(divs);



            
        })
    }catch(error){
        console.log(error);
    }
 }
apifetch1();


async function apifetch2(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            console.log(title,rating);
            const card = `
                            
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","card");
            divs.innerHTML = card;
            
            document.getElementById("apilist2-0").append(divs);
            document.getElementById("apilist2-1").append(divs);
            document.getElementById("apilist2-2").append(divs);
            document.getElementById("apilist2-3").append(divs);


            

            
        })
    }catch(error){
        console.log(error);
    }
 }
apifetch2();

async function apifetch3(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            console.log(title,rating);
            const card = `
                            
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","card");
            divs.innerHTML = card;
            
            
            document.getElementById("apilist3-0").append(divs);
            document.getElementById("apilist3-1").append(divs);
            document.getElementById("apilist3-2").append(divs);
            document.getElementById("apilist4-2").append(divs);


            
            
        })
    }catch(error){
        console.log(error);
    }
 }
apifetch3();

async function apifetch4(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            console.log(title,rating);
            const card = `
                            
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","card");
            divs.innerHTML = card;
            
            
            document.getElementById("apilist4-0").append(divs);
            document.getElementById("apilist4-1").append(divs);
            document.getElementById("apilist4-2").append(divs);
            document.getElementById("apilist4-3").append(divs);


            

            
        })
    }catch(error){
        console.log(error);
    }
 }
apifetch4();

async function apifetch5(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            console.log(title,rating);
            const card = `
                            
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","card");
            divs.innerHTML = card;
            
            
            document.getElementById("apilist5-0").append(divs);
            document.getElementById("apilist5-1").append(divs);
            document.getElementById("apilist5-2").append(divs);
            document.getElementById("apilist5-3").append(divs);


            
        })
    }catch(error){
        console.log(error);
    }
 }
apifetch5();

async function apifetch6(){
    console.log("inside test");
    const API_KEY = 'd808cc664ed4f079c68e9cd427d4f86a';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODA4Y2M2NjRlZDRmMDc5YzY4ZTljZDQyN2Q0Zjg2YSIsInN1YiI6IjY1ODE0YjZlMjI2YzU2MDdmZTllZjkwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9jwZv6dTRR_gOLQGXJlmMTAA69zTAThi1_sbyPVOgs';
    const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
            'accept': 'application/json'
        }
    }

    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();
        console.log(result.results);
        const apilist = result.results;
        let image_url = "https://image.tmdb.org/t/p/w185";
        apilist.map((item)=>{
            console.log(item);   
            const title = item.title;
            const rating = item.vote_average;
            const poster = image_url+item.poster_path;
            console.log(title,rating);
            const card = `
                            
                            <img src="${poster}" alt="">
                            <div class="card-text">
                                <label><img src="../../assets/img/star.png">${rating}<img class="starred-icon" src="../../assets/img/starred.png"></label>
                                <h3>${title}</h3>
                                <button><span>+</span> Watchlist</button>
                            </div>
                       `;
            let divs = document.createElement('div');
            divs.setAttribute("class","card");
            divs.innerHTML = card;
            
          
            document.getElementById("apilist6-0").append(divs);
            document.getElementById("apilist6-1").append(divs);
            document.getElementById("apilist6-2").append(divs);
            document.getElementById("apilist6-3").append(divs);



            
        })
    }catch(error){
        console.log(error);
    }
 }
apifetch6();