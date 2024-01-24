function appendRestaurantsToContainer(restaurants) {
    try {
        // Get the container element where we'll append restaurant elements
        const restaurantListContainer = document.getElementById('restaurantList');

        // Clear existing content in the container
        restaurantListContainer.innerHTML = '';

        // Loop through the formatted restaurants and create HTML elements for each
        restaurants.forEach(restaurant => {
            // Assuming you have restaurantId as the identifier
            const restaurantCard = document.createElement('div');
            restaurantCard.classList.add('card', 'mb-3');
            
            restaurantCard.setAttribute('data-restaurant-id', restaurant.restaurantId);

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
        
            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = restaurant.name;
        
            const description = document.createElement('p');
            description.classList.add('card-text');
            description.textContent = restaurant.description;
        
            const image = document.createElement('img');
            image.classList.add('card-img-top');
            image.src = restaurant.imageUrl;
            image.alt = restaurant.name;
        
            // Append elements to the card body
            cardBody.appendChild(title);
            cardBody.appendChild(description);
        
            // Append image to the card only if an image URL is provided
            if (restaurant.imageUrl) {
                cardBody.appendChild(image);
            }
        
            // Append card body to the card
            restaurantCard.appendChild(cardBody);
        
            // Append the card to the restaurantListContainer
            restaurantListContainer.appendChild(restaurantCard);
        
            // Ensure that the restaurant object has the 'restaurantId' property
            if (restaurant.restaurantId) {
                restaurantCard.addEventListener('click', () => showReviews(restaurant));
                restaurantCard.addEventListener('click', () => handleRestaurantClick(restaurant.restaurantId));

            }
            
        });
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
let selectedRestaurantId; // Declare this variable globally

function handleRestaurantClick(restaurantId) {
    selectedRestaurantId = restaurantId;
    // Open the reviews modal or perform any other actions you need
    $('#reviewsModal').modal('show');
}
