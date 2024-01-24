// models/Restaurant.js
const { v4: uuidv4 } = require('uuid');

class Restaurant {
    constructor(name, description, imageUrl) {
        this.restaurantId = uuidv4();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

module.exports = { Restaurant };
