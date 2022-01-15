
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express(); //initalise a new express app

app.set("view engine", "ejs");
var posts = [];

app.use('/css/style.css',express.static(__dirname +'/css/style.css')); //linking CSS file to Node.JS Server

app.get("/", function (req, resp) { // this is getting the root directory when a user goes to this page
  const url = "https://tankpit.com/api/bb/?year=2015&month=05&day=27"
  var posts=[]; // resets posts arrary each time a user goes to the root webpage
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const bulletinPost = JSON.parse(data)
      console.log(bulletinPost.length-1) // getting the length of every post made by a user that day.
      for (var i=0; i <bulletinPost.length; i++){
        posts.push(bulletinPost[i].message, bulletinPost[i].tank_name)
      }
      resp.render("posts", {Post1: posts}); //render ejs page. ejs page uses html.
    });
  });
});


app.listen(3000, function(){
  console.log("server is running on port 3000.");
});
