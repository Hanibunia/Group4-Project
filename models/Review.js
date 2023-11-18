class Review {
    constructor(reviewId, email, reviewText, rating) {
        this.reviewId = reviewId;
        this.email = email;
        this.reviewText = reviewText;
        this.rating = rating;
    }
}


module.exports = { Review }