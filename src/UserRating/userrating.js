
    // Function to open the rating modal
    function openRatingModal() {
        document.getElementById('ratingModal').style.display = 'flex';
    }

    // Function to close the rating modal
    function closeRatingModal() {
        document.getElementById('ratingModal').style.display = 'none';
    }

    // Function to handle selecting a star
    function selectStar(value) {
        const starsContainer = document.querySelector('.stars');
        const selectedRatingText = document.getElementById('selectedRating');

        // Set the data-rating attribute to the selected value
        starsContainer.setAttribute('data-rating', value);

        // Update the displayed rating
        updateSelectedRating(value);

        // Update the star colors
        updateStarColors(value);
    }

    // Function to update the displayed rating text
    function updateSelectedRating(rating) {
        const selectedRatingText = document.getElementById('selectedRating');
        selectedRatingText.textContent = `Your Rating: ${rating}`;
    }

    // Function to update the color of stars based on the selected rating
    function updateStarColors(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.style.color = index < rating ? 'gold' : 'gray';
        });
    }
