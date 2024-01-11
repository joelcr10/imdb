// Import only the initializeApp function from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
 
import { firebaseCredentials } from "../../config.js";
import { movieId } from "../MovieDetails/movieDetails.js";
 
const firebaseApp = initializeApp(firebaseCredentials);
 
// Get a reference to the Firestore database
const db = getFirestore(firebaseApp);
console.log(db);
 
 
 
    // Function to create and append HTML elements for each object in the array
    async function createAndAppendElements(){
        const userId = localStorage.getItem("userId");
        console.log("testing");
        const journalCollection = await doc(
        db,
        "users",
        userId,
        "userJournal",
        "journalEntries"
        );
 
        let fetchedJournal = await getDoc(journalCollection);
        let journalData = fetchedJournal.data();
        console.log("journal-data",journalData);
        console.log("CandA");


        let journalArray = Object.keys(journalData);
        const bodyElement = document.getElementById('journal-entries'); // Assuming bodyElement is defined
        
        console.log(Object.keys(journalData));
        
        const journalElements = journalArray.map(journalKey => {
            // Create entry container for each journal entry
            const entryContainer = document.createElement('div');
            entryContainer.classList.add('journal-entry'); // Add a class name to the container
        
            // Create image element
            const imageElement = document.createElement('img');
            imageElement.setAttribute("src", journalData[journalKey].movieImage);
            imageElement.classList.add('journal-image'); // Add a class name to the image
            entryContainer.appendChild(imageElement);
        
            // Create name element
            const nameElement = document.createElement('h1');
            nameElement.textContent = journalData[journalKey].movieName;
            nameElement.classList.add('journal-name'); // Add a class name to the name element
            entryContainer.appendChild(nameElement);
        
            // Create date paragraph element
            const dateParagraph = document.createElement('p');
            dateParagraph.textContent = journalData[journalKey].journalDate;
            dateParagraph.classList.add('journal-date'); // Add a class name to the date paragraph
            entryContainer.appendChild(dateParagraph);
        
            // Create heading element
            const headingElement = document.createElement('h3');
            headingElement.textContent = journalData[journalKey].journalHeading;
            headingElement.classList.add('journal-heading'); // Add a class name to the heading element
            entryContainer.appendChild(headingElement);
        
            // Create paragraph element
            const paragraphElement = document.createElement('p');
            paragraphElement.textContent = journalData[journalKey].journalParagraph;
            paragraphElement.classList.add('journal-paragraph'); // Add a class name to the paragraph element
            entryContainer.appendChild(paragraphElement);
        
            return entryContainer;
        });
        
        // Append all entry containers' children to the bodyElement
        journalElements.forEach(entryContainer => {
            bodyElement.appendChild(entryContainer);
        });
        

 
}
 
 
 
// Call the function to create and append elements for each object
createAndAppendElements();