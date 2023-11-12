const { Review  } = require('../models/Review');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        const allUsers = JSON.parse(data);
        console.log("Loaded users from file:", allUsers); // Add this line for debugging
        return allUsers;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}

async function addReview(req, res) {
    try {
        const userEmail = req.body.userEmail;
        const { reviewText, rating } = req.body;

        const review = { userEmail, reviewText, rating }; // Creating review object

        const allUsers = await readJSON('utils/users.json');
        console.log("All Users:", allUsers);

        const user = allUsers.find(user => user.email === userEmail);

        if (user) {
            if (!user.reviews) {
                user.reviews = []; // Create reviews array if it doesn't exist
            }
            user.reviews.push(review);

            // Transforming the data to contain only necessary fields
            const reviewsData = user.reviews.map(review => ({
                userEmail: review.userEmail,
                reviewText: review.reviewText,
                rating: review.rating
            }));

            await fs.writeFile('utils/reviews.json', JSON.stringify(reviewsData), 'utf8');
            res.status(201).json(reviewsData); // Sending back the modified reviews data
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    readJSON, writeJSON, addReview
};