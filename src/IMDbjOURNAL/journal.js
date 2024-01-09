// Journal Entry Form

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
  for(let i=0;i<1;i++){
  const heading = document.createElement(`h2`);
  heading.className = `heading-results`;
  heading.textContent = `Journal Entries`;
  entryResultRow.insertAdjacentElement(`beforebegin`, heading);
}

  // Creating a div element for the entry
  const entryDiv = document.createElement(`div`);
  entryDiv.className = `single-entry-div`;
  entryResultRow.appendChild(entryDiv);

  // Creating an h3 element for the entry title
  const entryHeading = document.createElement(`h3`);
  entryHeading.className = `single-entry-heading`;
  entryHeading.textContent = getEntryTitle[0].value;
  entryDiv.appendChild(entryHeading);

  // Creating a paragraph element for the entry date
  const entryDate = document.createElement(`p`);
  entryDate.className = `single-entry-date`;

  // Checking if the entry title has a value before adding the date
  if (getEntryTitle[0].value) {
    entryDate.textContent = `Date Added: ${day} ${n} ${year}`;
    entryDiv.appendChild(entryDate);
  }

  // Creating a paragraph element for the entry text
  const entryParagraph = document.createElement(`p`);
  entryParagraph.className = `single-entry-text`;
  entryParagraph.textContent = getEntryText[0].value;
  entryDiv.appendChild(entryParagraph);

  // Clearing the entry text box
  getEntryText[0].value = ``;
}

// Adding an event listener to the entry form to trigger the addEntryToDom function on form submission
let submit = document.getElementById("submit");
entryForm.addEventListener(`submit`, addEntryToDom);


// Listen for changes in the 'readUrl' input element
document.getElementById('readUrl').addEventListener('change', function() {
  // Check if a file has been selected
  if (this.files[0]) {
    // Create a new FileReader to read the selected file
    var picture = new FileReader();

    // Read the file as a data URL
    picture.readAsDataURL(this.files[0]);

    // Set up an event listener for when the file reading is complete
    picture.addEventListener('load', function(event) {
      // Update the 'src' attribute of the 'uploadedImage' element with the data URL
      document.getElementById('uploadedImage').setAttribute('src', event.target.result);
      
      // Make the 'uploadedImage' element visible by changing its display style
      document.getElementById('uploadedImage').style.display = 'block';
    });
  }
});

