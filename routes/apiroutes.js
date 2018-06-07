// Including packages for scraping
var cheerio = require("cheerio");
var request = require("request");

module.exports = function (app) {
 // Route for scraping the latest posts
 
  app.get("/api/scrape", function (req, res) {

    // Defining data object that I will fill from scraping the page
    let objects = [];
    let data = {
      title: [],
      link: []
    };
    // Make a request call to grab the HTML body from the site of your choice
    request("https://medium.freecodecamp.org/", function (error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      var $ = cheerio.load(html);

      // Select these elements from the html and do something for each one
      $("div.section-inner").each(function (i, element) {
        // Get title for each post
        data.title.push($(element).find("h3").text());


      });

      // Select more elements from the html and do something for each one
      $("div.postArticle-readMore").each(function (i, element) {
        // Get links for each post
        data.link.push($(element).find("a").attr("href"));
      });
      // Organizing the data into several objects instead of two seperate arrays
      for (let i = 0; i < data.title.length; i++) {
        objects.push({
          title: data.title[i],
          link: data.link[i]
        })
      }
      // Responding to client with data
      res.json(objects);
    });

  });
};