class Review {
    constructor(reviewId, email, reviewText, rating, restaurantId) {
        this.reviewId = reviewId;
        this.email = email;
        this.reviewText = reviewText;
        this.rating = rating;
        this.restaurantId = restaurantId; // Include restaurantId
    }
}

module.exports = { Review }