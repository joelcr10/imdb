      
    var interalId = setInterval(()=>{
        homeNextCard();
    },2000);

    let nextVideoList = [
                `
                    <img src="../../assets/img/jawan.jpg" class="highlight-video-thumbnail" alt="">
                    <div class="video-text">
                        <label><img src="../../assets/img/round-play-icon.png" alt=""> 1:48</label>
                        <h3>Cinema Rewind: Best Films of 2017</h3>
                        <label for="">Watch the trailers to find out</label>
                    </div>
                `,

                `
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f3edfe4-68af-49df-b0c8-0586dad7e53c/dgfppef-335a22c1-98cc-446c-9dfb-93325ca69c83.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlmM2VkZmU0LTY4YWYtNDlkZi1iMGM4LTA1ODZkYWQ3ZTUzY1wvZGdmcHBlZi0zMzVhMjJjMS05OGNjLTQ0NmMtOWRmYi05MzMyNWNhNjljODMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.jf6o3LACR7CUCcEcgBOUzkAML6WBaY-UnxwYMJdNqis" alt="" class="highlight-video-thumbnail">
                    <div class="video-text">
                        <label><img src="../../assets/img/round-play-icon.png" alt=""> 1:48</label>
                        <h3>Meet the Characters of Marvel Studios' The Marvels</h3>
                        <label for="">Who is your favourite character</label>
                    </div>
                `,

                `
                    <img src="https://i.ebayimg.com/images/g/ayIAAOSw~HNlKqgc/s-l1200.webp" alt="" class="highlight-video-thumbnail">
                    <div class="video-text">
                        <label><img src="../../assets/img/round-play-icon.png" alt=""> 1:48</label>
                        <h3>Wonka tops January Box Office, Night Swim impresses.</h3>
                        <label for="">Fans Just Couldn't Stop Talking About Them.</label>
                    </div>
                `,

                `
                    <img src="https://m.media-amazon.com/images/M/MV5BMTdmZDNhNjgtMjk4NS00YzQzLTliM2UtMDEzZDY2MDZmMTcwXkEyXkFqcGdeQXVyMTA4MzgzNDM3._V1_.jpg" alt="" class="highlight-video-thumbnail">
                    <div class="video-text">
                        <label><img src="../../assets/img/round-play-icon.png" alt=""> 1:48</label>
                        <h3>'Rebel Moon: Part Two - The Scargiver'</h3>
                        <label for="">The Battle Continues</label>
                    </div>
                `


    ]

    for(let i=0;i<3;i++){
        const div = document.createElement('div');
        div.setAttribute("class","top-section-video");
        div.innerHTML = nextVideoList[i];
        document.getElementById("next-video-container").append(div);
    }


    function homeNextCard(){
        clearInterval(interalId);
        console.log("inside next vid");
        document.getElementById("next-video-container").innerHTML = "";
        const topVideo = nextVideoList.shift();
        nextVideoList.push(topVideo);
        for(let i=0;i<3;i++){
            const div = document.createElement('div');
            div.setAttribute("class","top-section-video");
            div.innerHTML = nextVideoList[i];
            document.getElementById("next-video-container").append(div);
        }

        interalId = setInterval(()=>{
            homeNextCard();
        },2000);

    }

    function homePreviousCard(){
        clearInterval(interalId);

        document.getElementById("next-video-container").innerHTML = "";
        const lastVideo = nextVideoList.pop();
        nextVideoList.unshift(lastVideo);
        for(let i=0;i<3;i++){
            const div = document.createElement('div');
            div.setAttribute("class","top-section-video");
            div.innerHTML = nextVideoList[i];
            document.getElementById("next-video-container").append(div);
        }
        

        interalId = setInterval(()=>{
            homeNextCard();
        },2000);

    }


   
