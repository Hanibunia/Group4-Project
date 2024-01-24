// Function to create star icons based on the rating

function createRatingStars(rating) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('rating-stars');

    for (let i = 1; i <= 5; i++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('fa', 'fa-star', i <= rating ? 'fas' : 'far'); // Change 'filled' to 'fas'
        starContainer.appendChild(starIcon);
    }

    return starContainer;
}
// Function to create an "Edit" icon
function createEditIcon() {
    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
    return editIcon;
}

// Update the showReviews function
function showReviews(restaurant) {
    const restaurantId = restaurant.restaurantId;

    // Check if the restaurantId is defined before making the fetch request
    if (restaurantId) {
        // Fetch reviews data for the selected restaurant
        fetch(`/viewReviewbyRestaurant/${restaurantId}`)
            .then(response => response.json())
            .then(reviews => {
                const reviewsModalBody = document.getElementById('reviewsModalBody');
                reviewsModalBody.innerHTML = ''; // Clear existing content

                // Check if 'reviews' is an array and has at least one review
                if (Array.isArray(reviews) && reviews.length > 0) {
                    // Loop through the reviews and create HTML elements for each
                    reviews.forEach(review => {
                        const reviewContainer = document.createElement('div');
                        reviewContainer.classList.add('review-container');

                        // Create a div for the profile picture
                        const profilePicture = document.createElement('div');
                        profilePicture.classList.add('profile-picture');

                        // Create an image element for the blank avatar
                        const avatarImg = document.createElement('img');
                        avatarImg.src = './images/blank.jpg';
                        avatarImg.alt = 'Blank Avatar';
                        profilePicture.appendChild(avatarImg);

                        // Create a div for the review content
                        const reviewContent = document.createElement('div');
                        reviewContent.classList.add('review-content');

                        // Populate the review content with the review text
                        const reviewText = document.createElement('p');
                        reviewText.textContent = review.reviewText;
                        reviewContent.appendChild(reviewText);

                        // Create a div for the email
                        const emailDiv = document.createElement('div');
                        emailDiv.classList.add('email');
                        emailDiv.textContent = review.email;

                        // Create a div for the rating stars
                        const rating = parseInt(review.rating);
                        const ratingStars = createRatingStars(rating);

                        // Append the profile picture, review content, email, and rating stars to the review container
                        reviewContainer.appendChild(profilePicture);
                        reviewContainer.appendChild(reviewContent);
                        reviewContainer.appendChild(emailDiv);
                        reviewContainer.appendChild(ratingStars);

                        // Append the review container to the reviews modal body
                        reviewsModalBody.appendChild(reviewContainer);
                        // Add an "Edit" icon beside each review
                        const editIcon = createEditIcon();
                        reviewContainer.appendChild(editIcon);
                    });
                }
                // Show the reviews modal
                $('#reviewsModal').modal('show');
            })
            .catch(error => console.error('An error occurred:', error));
    } else {
        console.error('Invalid restaurant object: Missing restaurantId property');
    }
}


async function addReview(email, reviewText, rating) {
    try {
        const restaurantId = await getSelectedRestaurantId(); // Add 'await' here

        console.log('Posting the following data:');
        console.log('Email:', email);
        console.log('Review Text:', reviewText);
        console.log('Rating:', rating);
        console.log('Restaurant ID:', restaurantId);

        const response = await fetch('/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                reviewText,
                rating,
                restaurantId,
            }),
        });

        console.log('Server Response:', response);

        if (response.ok) {
            showReviews({ restaurantId });

            // Review successfully added, reload the reviews for the selected restaurant
            $('#addReviewModal').modal('hide'); // Close the modal
        } else {
            // Handle errors
            console.error('Failed to add review:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function getSelectedRestaurantId() {
    try {
        const response = await fetch(`/viewRestaurantById/${selectedRestaurantId}`);
        const data = await response.json();


        if (response.ok) {
            // Parse the restaurantId as an integer
            const restaurantId = parseInt(data.restaurantId, 10);
            console.log('Parsed Restaurant ID:', restaurantId);

            return restaurantId;
        } else {
            console.error('Failed to get selected restaurant ID:', data.message);
            return null; // Return null or handle the error accordingly
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return null; // Return null or handle the error accordingly
    }
}
    