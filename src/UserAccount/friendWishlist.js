import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore,doc as firestoreDoc ,collection, getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseCredentials } from "../../../config.js";

const firebaseConfig = firebaseCredentials;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const getWatchlist = async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('userId');
    console.log("inside watchlist of user account");
    const docList = await getDocs(collection(db,"users",userId,"watchlist"));
    

    if(docList.empty){
        document.getElementById("empty-watchlist").innerText = "Nothing Added to watchlist";
    }else{
        docList.forEach((doc) => {
                let item = doc.data();
                console.log(item);
                let id = item.id;
                let title = item.title;
                let poster = item.poster;
                const card = `
                            <a href="../MovieDetails/movieDetails.html?id=${id}">
                                <img src="${poster}" alt="">
                                <div class="card-text">
                                    
                                    
                                    
                                </div>
                            </a>
                        `;
                    let div = document.createElement('div');
                    div.setAttribute("class","watchlist-card");
                    div.innerHTML = card;
                    document.getElementById("watchlist-container").append(div);
          });
    }

    
}