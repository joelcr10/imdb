        
    let nextVideoList = [
                `
                    <img src="../../assets/img/buring-questions.jpg" class="highlight-video-thumbnail" alt="">
                    <div class="video-text">
                        <label><img src="../../assets/img/round-play-icon.png" alt=""> 1:48</label>
                        <h3>Siddhart talks about his 2023 Favourites</h3>
                        <label for="">Watch the interview</label>
                    </div>
                `,

                `
                    <img src="../../assets/img/jawan-poster.jfif" alt="" class="highlight-video-thumbnail">
                    <div class="video-text">
                        <label><img src="../../assets/img/round-play-icon.png" alt=""> 1:48</label>
                        <h3>'Jawan,''Leo' Among Top 2023 Indian Theatrical Movies</h3>
                        <label for="">Did your favourite make the list</label>
                    </div>
                `,

                `
                    <img src="../../assets/img/farzi-poster.jfif" alt="" class="highlight-video-thumbnail">
                    <div class="video-text">
                        <label><img src="../../assets/img/round-play-icon.png" alt=""> 1:48</label>
                        <h3>"Farzi","Khorra" & More Top 2023 Indian Series of 2023</h3>
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

    }

    function homePreviousCard(){
        document.getElementById("next-video-container").innerHTML = "";
        const lastVideo = nextVideoList.pop();
        nextVideoList.unshift(lastVideo);
        for(let i=0;i<3;i++){
            const div = document.createElement('div');
            div.setAttribute("class","top-section-video");
            div.innerHTML = nextVideoList[i];
            document.getElementById("next-video-container").append(div);
        }

    }
