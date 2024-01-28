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
// creating delete icon
function createDeleteIcon() {
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    return deleteIcon;
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

                        // Check if the user is logged in (check for the existence of 'user' in session storage)
                      // Check if the user is logged in
                        const loggedInUser = JSON.parse(localStorage.getItem('user'));
                        
                        // Check if the review was created by the logged-in user
                        if (loggedInUser && loggedInUser.email === review.email) {
                            // User is logged in and the review belongs to them, show the "Edit" icon
                            const editIcon = createEditIcon();
                            editIcon.addEventListener('click', () => openUpdateReviewModal(review));
                            reviewContainer.appendChild(editIcon);

                            //if user is logged in, show the "Delete" icon
                            const deleteIcon = createDeleteIcon();
                            deleteIcon.addEventListener('click', () => confirmAndDeleteReview({ reviewId: review.reviewId, email: review.email }));
                            reviewContainer.appendChild(deleteIcon);
                        }

                        // Append the review container to the reviews modal body
                        reviewsModalBody.appendChild(reviewContainer);
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
async function updateReview(email, reviewId, reviewText, rating) {
    try {
        const restaurantId = await getSelectedRestaurantId();

        console.log('Updating review with the following data:');
        console.log('Email:', email);
        console.log('Review ID:', reviewId);
        console.log('Review Text:', reviewText);
        console.log('Rating:', rating);
        console.log('Restaurant ID:', restaurantId);
        const response = await fetch('/updateReview', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                reviewId,
                reviewText,
                rating,
                restaurantId,
            }),
        });

        if (response.ok) {
            showReviews({ restaurantId });
            $('#updateReviewModal').modal('hide');
        } else {
            console.error('Failed to update review:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
function openUpdateReviewModal(review) {
    // Assuming you have fields in the update review modal with IDs like 'updatedReviewText' and 'updatedRating'
    const updatedReviewTextInput = document.getElementById('updatedReviewText');
    const updatedRatingInput = document.getElementById('updatedRating');

    // Populate the modal fields with the existing review details
    updatedReviewTextInput.value = review.reviewText;
    updatedRatingInput.value = review.rating;

    // Store the review ID and email in data attributes of the modal
    $('#updateReviewModal').data('reviewId', review.reviewId);
    $('#updateReviewModal').data('email', review.email);

    // Open the update review modal
    $('#updateReviewModal').modal('show');
}
function confirmAndDeleteReview({ reviewId, email }) {
    // Show a confirmation dialog to the user
    const isConfirmed = confirm("Are you sure you want to delete this review?");
  
    if (isConfirmed) {
        // If user confirms, you can make an API request to delete the review
        // Replace the URL and method with your actual API endpoint and method (e.g., POST, DELETE)
        fetch('/deleteReview', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                reviewId
            }),
        })
        .then(response => {
            if (response.ok) {
                // Review deleted successfully, you can update the UI or handle it as needed
                console.log('Review deleted successfully');

                // Update the UI by removing the deleted review element from the DOM
                const deletedReviewElement = document.getElementById(`review-${reviewId}`);
                if (deletedReviewElement) {
                    deletedReviewElement.remove();
                    
                }
            } else {
                // Handle error response from the server
                console.error('Failed to delete review');
            }window.location.reload();
        })
        .catch(error => {
            // Handle network errors or other issues
            console.error('Error deleting review:', error);
        });
    } else {
        // User canceled the deletion
        console.log('Deletion canceled');
    }
}