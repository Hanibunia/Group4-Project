var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));


const { register, login, updateEmail } = require('./utils/UserUtil')
const { addReview, viewReview , viewAllReviews, updateReview, deleteReview } = require('./utils/ReviewUtil')

app.post('/register', register);
app.post('/addReview', addReview); // Endpoint for adding reviews
// app.get('/viewReview/:userEmail', viewReview); // Endpoint for viewing reviews
// app.get('/viewAllReviews', viewAllReviews);
app.put('/updateEmail', updateEmail);
app.put('/updateReview', updateReview);
app.delete('/deleteReview', deleteReview);

app.post('/login', login);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})
app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`);
});