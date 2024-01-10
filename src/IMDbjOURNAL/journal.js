import { addJournal } from "./journalDB.js";

// Journal Entry Form
const movieNameGlobal = localStorage.getItem("journal-movie-title");
const moviePoster = localStorage.getItem("journal-movie-image");
const movieId = localStorage.getItem("journal-movie-id");
console.log(moviePoster);
console.log(movieNameGlobal);
var divElement = "";
// Selecting the entry form, entry results section, result item, and result row elements
const entryForm = document.querySelector(`#entryForm`);
const entryResultsSection = document.querySelector(`#entryResultsSection`);
const entryResultItem = document.querySelector(`.entryResultItem`);
const entryResultRow = document.querySelector(`.entryResultRow`);

// Selecting entry title and entry text elements
const getEntryTitle = document.getElementsByClassName(`entry-text-title`);
const getEntryText = document.getElementsByClassName(`entry-text-box`);

// Function to add an entry to the DOM
function addEntryToDom(event) {
  document.getElementById("journal-prompt").style.display = "none";
  event.preventDefault();

  // Getting the current date
  const d = new Date();
  const month = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const n = month[d.getMonth()];
  const day = d.getDay();
  const year = d.getFullYear();

  // Creating a heading element for the journal entries
  const heading = document.createElement(`h1`);
  heading.className = `heading-results`;
  heading.textContent = `Journal Entries`;


  // Creating a div element for the entry
  const entryDiv = document.createElement(`div`);
  entryDiv.className = `single-entry-div`;
  entryResultRow.appendChild(entryDiv);
  divElement = entryDiv;

  // Creating an h2 element for the entry movie name
  const entryImage = document.createElement(`img`);
  entryImage.className = `single-entry-Image`;
  entryImage.setAttribute("src",moviePoster);
  entryDiv.appendChild(entryImage);

  // Creating an h2 element for the entry movie name
  const entryMovie = document.createElement(`h2`);
  entryMovie.className = `single-entry-movie`;
  entryMovie.textContent = movieNameGlobal;
  entryDiv.appendChild(entryMovie);

  // Creating an h3 element for the entry title
  const entryHeading = document.createElement(`h3`);
  entryHeading.className = `single-entry-heading`;
  entryHeading.textContent = getEntryTitle[0].value;
  let journalHeading =entryHeading.textContent;
  entryDiv.appendChild(entryHeading);

  // Creating a paragraph element for the entry date
  const entryDate = document.createElement(`p`);
  entryDate.className = `single-entry-date`;

  // Checking if the entry title has a value before adding the date
  if (getEntryTitle[0].value) {
    entryDate.textContent = `Date Added: ${day} ${n} ${year}`;
    entryDiv.appendChild(entryDate);
  }
  let journalDate = `${day} ${n} ${year}`;

  // Creating a paragraph element for the entry text
  const entryParagraph = document.createElement(`p`);
  entryParagraph.className = `single-entry-text`;
  entryParagraph.textContent = getEntryText[0].value;
  let journalParagraph = entryParagraph.textContent;
  entryDiv.appendChild(entryParagraph);

  // Clearing the entry text box
  getEntryText[0].value = ``;

  addJournal(movieId,movieNameGlobal,moviePoster,journalHeading,journalDate,journalParagraph);
  
}

// Adding an event listener to the entry form to trigger the addEntryToDom function on form submission
let submit = document.getElementById("submit");
entryForm.addEventListener(`submit`, addEntryToDom);


