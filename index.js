var express = require('express');
var bodyParser = require("body-parser");
const fs = require('fs')
const path =require('path')
var app = express();
const morgan = require('morgan');

const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{
    flags:'a'
})
app.use(morgan('tiny'));


const { register, login, updateEmail } = require('./utils/UserUtil')
const { addReview, viewReview , viewAllReviews, updateReview, deleteReview,viewReviewbyRestaurant } = require('./utils/ReviewUtil')
const { viewRestaurant,viewRestaurantById } = require('./utils/RestaurantUtil'); // Update the path

app.get('/viewRestaurant', viewRestaurant);
app.get('/viewRestaurantById/:restaurantId', viewRestaurantById);
app.get('/viewReviewbyRestaurant/:restaurantId', viewReviewbyRestaurant);

app.post('/register', register);
app.post('/addReview', addReview);
app.get('/viewReview/:userEmail', viewReview); // Endpoint for viewing reviews
app.get('/viewAllReviews', viewAllReviews);
app.put('/updateEmail', updateEmail);
app.put('/updateReview', updateReview);
app.delete('/deleteReview', deleteReview);

app.post('/login', login);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})
const server = app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`);
});

module.exports = { app, server }