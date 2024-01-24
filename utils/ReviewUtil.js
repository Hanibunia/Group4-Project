const { Review } = require('../models/Review');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        const allUsers = JSON.parse(data);
        //console.log("Loaded users from file:", allUsers); // Add this line for debugging
        return allUsers;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);

        if (Array.isArray(object)) {
            // If object is an array, filter out existing entries before concatenating
            const uniqueObjects = object.filter(newEntry => !allObjects.some(existingEntry => existingEntry.reviewId === newEntry.reviewId));
            allObjects.push(...uniqueObjects);
        } else {
            // If object is not an array, check if it already exists before pushing
            const exists = allObjects.some(existingEntry => existingEntry.reviewId === object.reviewId);
            if (!exists) {
                allObjects.push(object);
            }
        }

        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function viewReview(req, res) {
    try {
        const userEmail = req.params.userEmail; // Make sure it matches the route parameter

        if (!userEmail) {
            return res.status(400).json({ message: 'Invalid data: Missing user email' });
        }

        const allReviews = await readJSON('utils/reviews.json');
        const userReviews = allReviews.filter(entry => entry.email === userEmail); // Updated to entry.email

        if (userReviews.length > 0) {
            res.status(200).json(userReviews);
        } else {
            res.status(404).json({ message: 'No reviews found for the user' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }


}

async function viewReviewbyRestaurant(req, res) {
    try {
        const restaurantId = parseInt(req.params.restaurantId, 10);
        // console.log(req.params);

        if (!restaurantId) {
            return res.status(400).json({ message: 'Invalid data: Missing restaurant ID' });
        }

        const allReviews = await readJSON('utils/reviews.json');
        const restaurantReviews = allReviews.filter(entry => entry.restaurantId === restaurantId);

        if (restaurantReviews.length > 0) {
            res.status(200).json(restaurantReviews);
        } else {
            res.status(404).json({ message: 'No reviews found for the restaurant' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function viewAllReviews(req, res) {
    try {
        // Read all reviews from the file
        const allReviews = await readJSON('utils/reviews.json');

        // Check if there are any reviews
        if (allReviews.length > 0) {
            res.status(200).json(allReviews);
        } else {
            res.status(404).json({ message: 'No reviews found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function addReview(req, res) {
    try {
        console.log('Received request to add review. Request Body:', req.body);

        const email = req.body.email;
        const { reviewText, rating, restaurantId } = req.body;

        // Enhanced input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || isNaN(rating) || rating < 1 || rating > 5 || !reviewText || reviewText.length > 500 || !restaurantId) {
            return res.status(400).json({ message: 'Invalid data: Invalid email format, missing fields, or invalid restaurantId' });
        }

        const allUsers = await readJSON('utils/users.json');
        const userExists = allUsers.some(user => user.email === email);

        const restaurantExists = await checkIfRestaurantExists(restaurantId);

        if (userExists && restaurantExists) {
            const reviewId = uuidv4(); // Generate a unique identifier
            const review = new Review(reviewId, email, reviewText, rating,restaurantId);
            const allReviews = await readJSON('utils/reviews.json');

            // Check if a review with the same reviewId already exists
            const existingReviewIndex = allReviews.findIndex(existingReview => existingReview.reviewId === reviewId);

            if (existingReviewIndex === -1) {
                // Review with the same reviewId does not exist, add the new review
                allReviews.push(review);

                // Use writeJSON to update the 'utils/reviews.json' file
                await writeJSON(allReviews, 'utils/reviews.json');

                // Respond with an array containing only the newly added review
                res.status(201).json([review]);
            } else {
                // Review with the same reviewId already exists, respond with an error
                res.status(400).json({ message: 'Review with the same reviewId already exists' });
            }
        } else {
            res.status(404).json({ message: 'User not found or Restaurant not found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function checkIfRestaurantExists(restaurantId) {
    try {
        const allRestaurants = await readJSON('utils/Restaurant.json');
        return allRestaurants.some(restaurant => restaurant.restaurantId === restaurantId);
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

async function updateReview(req, res) {
    try {
        // console.log('Before reading JSON file');
        const email = req.body.email;
        const { reviewId, reviewText, rating } = req.body;

        // Enhanced input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !reviewId || !emailRegex.test(email) || isNaN(rating) || rating < 1 || rating > 5 || reviewText.length > 500) {
            // console.log('Invalid data: Missing fields');
            return res.status(400).json({ message: 'Invalid data: Missing fields' });
        }

        const allReviews = await readJSON('utils/reviews.json');
        // console.log('After reading JSON file', allReviews);

        // Find the index of the review to be updated based on user email and reviewId
        const reviewIndex = allReviews.findIndex(
            entry => entry.email === email && entry.reviewId === reviewId
        );

        console.log('Review index:', reviewIndex);

        // Check if the review is found
        if (reviewIndex !== -1) {
            // Update the review with the new information
            allReviews[reviewIndex].reviewText = reviewText;
            allReviews[reviewIndex].rating = rating;

            // Rewrite the updated data back to the JSON file
            await fs.writeFile('utils/reviews.json', JSON.stringify(allReviews), 'utf-8');
            // console.log('After writing updated data to JSON file', allReviews);

            res.status(200).json(allReviews[reviewIndex]);
        } else {
            console.error('Review not found for the user');
            res.status(404).json({ message: 'Review not found for the user' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function deleteReview(req, res) {
    try {
        //getting email and id 
        const email = req.body.email;
        const { reviewId } = req.body;

        //enhancing input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || !reviewId) {
            console.log('Invalid data: Invalid email format or missing fields');
            return res.status(400).json({ message: 'Invalid data: Invalid email format or missing fields' });
        }

        //reading of user data
        const allUsers = await readJSON('utils/users.json');
        //checkin for existing user
        const userExists = allUsers.some(user => user.email === email);

        if (userExists) {
            const allReviews = await readJSON('utils/reviews.json');

            //finding the index of the review that needs to be deleted
            const reviewIndex = allReviews.findIndex(
                entry => entry.email === email && entry.reviewId === reviewId
            );

            //checking if review exist
            if (reviewIndex !== -1) {
                //removing of review
                const deletedReview = allReviews.splice(reviewIndex, 1)[0];

                try {
                    //rewriting the updated data back to the JSON file
                    await fs.writeFile('utils/reviews.json', JSON.stringify(allReviews), 'utf-8');
                    console.log('Review has been successfully deleted:', deletedReview);
                    res.status(200).json({ message: 'Review has been successfully deleted' });
                } catch (writeError) {
                    console.error('Error writing to file:', writeError);
                    res.status(500).json({ message: 'Error updating data in the file' });
                }
            } else {
                //if review not found
                console.log('Review not found for the user');
                res.status(404).json({ message: 'Review not found for the user' });
            }
        } else {
            console.log('User not found');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    readJSON, writeJSON, addReview, updateReview, deleteReview, viewReview, viewAllReviews,viewReviewbyRestaurant
};