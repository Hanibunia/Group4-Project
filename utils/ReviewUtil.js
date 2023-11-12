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

        // Enhanced input validation
        if (!userEmail || !reviewText || !rating) {
            return res.status(400).json({ message: 'Invalid data: Missing fields' });
        }

        const allUsers = await readJSON('utils/users.json');
        const userExists = allUsers.some(user => user.email === userEmail);

        if (userExists) {
            const review = { userEmail, reviewText, rating };
            const allReviews = await readJSON('utils/reviews.json');
            allReviews.push(review);

            await fs.writeFile('utils/reviews.json', JSON.stringify(allReviews), 'utf8');

            res.status(201).json(allReviews.filter(entry => entry.userEmail === userEmail));
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

console.log("test")




module.exports = {
    readJSON, writeJSON, addReview
};