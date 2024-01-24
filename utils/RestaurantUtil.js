// utils/RestaurantUtil.js
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const { viewReview } = require('./ReviewUtil');

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
async function viewRestaurant(req, res) {
    try {
        const allRestaurants = await readJSON('utils/Restaurant.json');
        res.status(200).json(allRestaurants);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function viewRestaurantById(req, res) {
    try {
        const allRestaurants = await readJSON('utils/Restaurant.json');
        const restaurantId = req.params.restaurantId; // Assuming the ID is provided as a parameter in the request

        // Find the restaurant with the specified ID
        const selectedRestaurant = allRestaurants.find(restaurant => restaurant.restaurantId == restaurantId);

        if (selectedRestaurant) {
            res.status(200).json(selectedRestaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {viewRestaurant, viewRestaurantById };
