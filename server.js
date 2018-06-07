var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/custommethoddb");

// Routes
require("./routes/apiroutes.js")(app);
// Route to post our form submission to mongoDB via mongoose

// Make a request call to grab the HTML body from the site of your choice
	// Select each element in the HTML body from which you want information.
	// NOTE: Cheerio selectors function similarly to jQuery's selectors,
	// but be sure to visit the package's npm page to see how it works
	// Start the server
	app.listen(PORT, function () {
		console.log("App running on port " + PORT + "!");
	});
