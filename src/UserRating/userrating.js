// Function to open the rating modal

let movieid;

 function openRatingModal(movieName, id) {
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
                                    <span class="star" id="star" data-value="1" onmouseover="hoverStar(1)" onclick="selectStar(1)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="2" onmouseover="hoverStar(2)" onclick="selectStar(2)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="3" onmouseover="hoverStar(3)" onclick="selectStar(3)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="4" onmouseover="hoverStar(4)" onclick="selectStar(4)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="5" onmouseover="hoverStar(5)" onclick="selectStar(5)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="6" onmouseover="hoverStar(6)" onclick="selectStar(6)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="7" onmouseover="hoverStar(7)" onclick="selectStar(7)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="8" onmouseover="hoverStar(8)" onclick="selectStar(8)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="9" onmouseover="hoverStar(9)" onclick="selectStar(9)" onmouseout="resetStarColors()">&#9733;</span>
                                    <span class="star" id="star" data-value="10" onmouseover="hoverStar(10)" onclick="selectStar(10)" onmouseout="resetStarColors()">&#9733;</span>
                                </div>
                                <p id="selectedRating">Your Rating: 0</p>
                                <button class = "submit" ">Rate</button>
                                <button class = "closee" onclick="closeRatingModal()">Close</button>
                            </div>`;

  // Update the rating modal content
  document.getElementById("ratingModal").innerHTML = ratingContainer;
}

// Function to close the rating modal
function closeRatingModal() {
  document.getElementById("ratingModal").style.display = "none";
}

// Declare a variable to store the rating value
let selectedRatingValue = 0; // Default value

// Function to handle selecting a star
function selectStar(value) {
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
function hoverStar(value) {
  // Update the star colors during hover
  updateStarColors(value, true);
}

// Function to reset star colors after hovering
function resetStarColors() {
  const starsContainer = document.querySelector(".stars");
  const currentRating = parseInt(starsContainer.getAttribute("data-rating"));

  // Update the star colors based on the current selected rating
  updateStarColors(currentRating);
}

// Function to update the displayed rating text
function updateSelectedRating(rating) {
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
