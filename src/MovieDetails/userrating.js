// Function to open the rating modal
// import addRating from "../UserRating/userratingDB.js";
let movieid;

export const openRatingModal = (movieName, id) => {
  // Display the modal
  movieid = id;
  console.log("inside open rating modal", movieName);
  document.getElementById("ratingModal").style.display = "flex";

  // Construct the rating container HTML
  const ratingContainer = `<div class="modal-content">
                                <!-- Display the movie name -->
                                <p class="ratepara">RATE THIS <br></p>
                                <h2 class="moviename">${movieName}</h2>
                                <div class="stars" data-rating="0">
                                    <!-- Five stars with data-value attribute representing their rating value -->
                                    <span class="star" id="star" data-value="1" >&#9733;</span>
                                    <span class="star" id="star" data-value="2" >&#9733;</span>
                                    <span class="star" id="star" data-value="3" >&#9733;</span>
                                    <span class="star" id="star" data-value="4" >&#9733;</span>
                                    <span class="star" id="star" data-value="5" >&#9733;</span>
                                    <span class="star" id="star" data-value="6" >&#9733;</span>
                                    <span class="star" id="star" data-value="7" >&#9733;</span>
                                    <span class="star" id="star" data-value="8" >&#9733;</span>
                                    <span class="star" id="star" data-value="9" >&#9733;</span>
                                    <span class="star" id="star" data-value="10" >&#9733;</span>
                                </div>
                                <p id="selectedRating">Your Rating: 0</p>
                                <button id="rateButton" class = "submit" onclick="displayUserRating()">Rate</button>
                                <button id="close" class = "close">Close</button>
                             </div>`;

  // Update the rating modal content
  document.getElementById("ratingModal").innerHTML = ratingContainer;
  console.log("exiting ope rating modal");
}

// Function to close the rating modal
export function closeRatingModal() {
  
  document.getElementById("ratingModal").style.display = "none";
}

// Declare a variable to store the rating value
export var selectedRatingValue = 0; // Default value

// Function to handle selecting a star
export function selectStar(value) {
  const starsContainer = document.querySelector(".stars");
  const selectedRatingText = document.getElementById("selectedRating");

  // Set the data-rating attribute to the selected value
  starsContainer.setAttribute("data-rating", value);

  // Update the displayed rating
  updateSelectedRating(value);

  // Update the star colors
  updateStarColors(value);

  selectedRatingValue = value;
}

// Function to handle hovering over a star
export function hoverStar(value) {
  // Update the star colors during hover
  updateStarColors(value, true);
}

// Function to reset star colors after hovering
export function resetStarColors() {
  const starsContainer = document.querySelector(".stars");
  const currentRating = parseInt(starsContainer.getAttribute("data-rating"));

  // Update the star colors based on the current selected rating
  updateStarColors(currentRating);
}

// Function to update the displayed rating text
export function updateSelectedRating(rating) {
  const selectedRatingText = document.getElementById("selectedRating");
  selectedRatingText.textContent = `Your Rating: ${rating}`;
}

// Function to update the color of stars based on the selected rating
function updateStarColors(rating, isHover) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    if (isHover && index < rating) {
      star.style.color = "gold"; // Yellow color during hover
    } else {
      star.style.color = index < rating ? "gold" : "gray";
    }
  });
}

//Function to display user rating on movie details page
export function displayUserRating(){
const userRating=document.getElementById("userRating");
userRating.textContent = `${selectedRatingValue}/10`;
}
