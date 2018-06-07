$( "#saved" ).click(function() {
    // GET AJAX call
    $.get("/api/scrape", function (data, status) {
      console.log(data);
    });
    console.log("herro this is working?")
  });