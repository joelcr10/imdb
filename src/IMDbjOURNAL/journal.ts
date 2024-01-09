// Journal Entry Form

// Selecting the entry form, entry results section, result item, and result row elements
const entryForm: HTMLFormElement | null = document.querySelector(`#entryForm`);
const entryResultsSection: HTMLElement | null = document.querySelector(`#entryResultsSection`);
const entryResultItem: HTMLElement | null = document.querySelector(`.entryResultItem`);
const entryResultRow: HTMLElement | null = document.querySelector(`.entryResultRow`);

// Selecting entry title and entry text elements
const getEntryTitle: HTMLCollectionOf<Element> = document.getElementsByClassName(`entry-text-title`);
const getEntryText: HTMLCollectionOf<Element> = document.getElementsByClassName(`entry-text-box`);

// Function to add an entry to the DOM
function addEntryToDom(event: Event): void {
  event.preventDefault();

  // Getting the current date
  const d: Date = new Date();
  const month: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const n: string = month[d.getMonth()];
  const day: number = d.getDay();
  const year: number = d.getFullYear();

  // Creating a heading element for the journal entries
  for (let i = 0; i < 1; i++) {
    const heading: HTMLHeadingElement = document.createElement(`h2`);
    heading.className = `heading-results`;
    heading.textContent = `Journal Entries`;
    if (entryResultRow) entryResultRow.insertAdjacentElement(`beforebegin`, heading);
  }

  // Creating a div element for the entry
  const entryDiv: HTMLDivElement = document.createElement(`div`);
  entryDiv.className = `single-entry-div`;
  if (entryResultRow) entryResultRow.appendChild(entryDiv);

  // Creating an h3 element for the entry title
  const entryHeading: HTMLHeadingElement = document.createElement(`h3`);
  entryHeading.className = `single-entry-heading`;
  entryHeading.textContent = getEntryTitle[0]?.textContent || '';
  entryDiv.appendChild(entryHeading);

  // Creating a paragraph element for the entry date
  const entryDate: HTMLParagraphElement = document.createElement(`p`);
  entryDate.className = `single-entry-date`;

  // Checking if the entry title has a value before adding the date
  if (getEntryTitle[0]?.textContent) {
    entryDate.textContent = `Date Added: ${day} ${n} ${year}`;
    entryDiv.appendChild(entryDate);
  }

  // Creating a paragraph element for the entry text
  const entryParagraph: HTMLParagraphElement = document.createElement(`p`);
  entryParagraph.className = `single-entry-text`;
  entryParagraph.textContent = getEntryText[0]?.textContent || '';
  entryDiv.appendChild(entryParagraph);

  // Clearing the entry text box
  if (getEntryText[0]) getEntryText[0].textContent = ``;
}

// Adding an event listener to the entry form to trigger the addEntryToDom function on form submission
const submit: HTMLElement | null = document.getElementById("submit");
if (entryForm) entryForm.addEventListener(`submit`, addEntryToDom);
