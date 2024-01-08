import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, updateDoc , doc as firestoreDoc ,collection, setDoc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseCredentials } from "../../../config.js";

const firebaseConfig = firebaseCredentials;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const getWatchlist = async () =>{
    
    const docList = await getDocs(collection(db,"users",localStorage.getItem("userId"),"watchlist"));
    let tempDocList = [];

    if(docList.empty){
        document.getElementById("empty-watchlist").innerText = "Nothing added to watchlist";
    }else{
        docList.forEach((doc) => {
                let item = doc.data();
                
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