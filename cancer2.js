var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
var User = require("./userModel.js");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/custommethoddb");

// Routes

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function (req, res) {
    // Create a new user using req.body

    var user = new User(req.body);
    user.setFullName();
    user.lastUpdatedDate();

    User.create(user)
        .then(function (dbUser) {
            // If saved successfully, send the the new User document to the client
            res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurs, send the error to the client
            res.json(err);
        });
});

var cheerio = require("cheerio");
var request = require("request");

// Make a request call to grab the HTML body from the site of your choice
request("http://www.dailymail.co.uk/ushome/index.html", function (error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("h2.story-heading").each(function (i, element) {

        var link = $(element).children().attr("href");
        var title = $(element).children().text();
        console.log(link);
    });

	// Start the server
	// app.listen(PORT, function () {
	// 	console.log("App running on port " + PORT + "!");
    // });
});