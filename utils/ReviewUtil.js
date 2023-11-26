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


// async function viewReview(req, res) {
//     try {
//         const userEmail = req.params.userEmail;

//         if (!userEmail) {
//             return res.status(400).json({ message: 'Invalid data: Missing user email' });
//         }

//         const allReviews = await readJSON('utils/reviews.json');
//         const userReviews = allReviews.filter(entry => entry.userEmail === userEmail);

//         if (userReviews.length > 0) {
//             res.status(200).json(userReviews);
//         } else {
//             res.status(404).json({ message: 'No reviews found for the user' });
//         }
//     } catch (error) {
//         console.error('An error occurred:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }


// }


// async function viewAllReviews(req, res) {
//     try {
//         // Read all reviews from the file
//         const allReviews = await readJSON('utils/reviews.json');

//         // Check if there are any reviews
//         if (allReviews.length > 0) {
//             res.status(200).json(allReviews);
//         } else {
//             res.status(404).json({ message: 'No reviews found' });
//         }
//     } catch (error) {
//         console.error('An error occurred:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

async function addReview(req, res) {
    try {
        const email = req.body.email;
        const { reviewText, rating } = req.body;

        // Enhanced input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || isNaN(rating) || rating < 1 || rating > 5 || !reviewText || reviewText.length > 500) {
            return res.status(400).json({ message: 'Invalid data: Invalid email format or missing fields' });
        }

        const allUsers = await readJSON('utils/users.json');
        const userExists = allUsers.some(user => user.email === email);

        if (userExists) {
            const reviewId = uuidv4(); // Generate a unique identifier
            const review = new Review(reviewId, email, reviewText, rating);
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
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



async function updateReview(req, res) {
    try {
        console.log('Before reading JSON file');
        const email = req.body.email;
        const { reviewId, reviewText, rating } = req.body;

        // Enhanced input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !reviewId || !emailRegex.test(email) || isNaN(rating) || rating < 1 || rating > 5 || reviewText.length > 500) {
            console.log('Invalid data: Missing fields');
            return res.status(400).json({ message: 'Invalid data: Missing fields' });
        }

        const allReviews = await readJSON('utils/reviews.json');
        console.log('After reading JSON file', allReviews);

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
            console.log('After writing updated data to JSON file', allReviews);

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
        const email = req.body.email;
        const { reviewId } = req.body;

        // Enhanced input validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || !reviewId) {
            return res.status(400).json({ message: 'Invalid data: Invalid email format or missing fields' });
        }

        const allUsers = await readJSON('utils/users.json');
        const userExists = allUsers.some(user => user.email === email);

        if (userExists) {
            const allReviews = await readJSON('utils/reviews.json');

            // Find the index of the review to be deleted based on user email and reviewId
            const reviewIndex = allReviews.findIndex(
                entry => entry.email === email && entry.reviewId === reviewId
            );

            // Check if the review is found
            if (reviewIndex !== -1) {
                // Remove the review from the array
                const deletedReview = allReviews.splice(reviewIndex, 1)[0];

                // Rewrite the updated data back to the JSON file
                await writeJSON(allReviews, 'utils/reviews.json');

                res.status(200).json('Review has been successfully deleted');
            } else {
                res.status(404).json({ message: 'Review not found for the user' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    readJSON, writeJSON, addReview, updateReview
};