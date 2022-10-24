const db = require("./app/models");
const express = require("express");
const controller = require("./app/controllers/post.controller");
const app = express();
const http = require('http');
const hostname='127.0.0.1';
const port=8000;
const Post = db.posts;
const Comment = db.comments;


'use strict';

var bodyParser = require("body-parser");


// Use bodyParser to parse application/x-www-form-urlencoded form data
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var posts = ["Ed Sheeran 10/25","K_UMA 11/13"]

function setup() {
  Post.sync({ force: true }) // Using 'force: true' for demo purposes. It drops the table users if it already exists and then creates a new one.
    .then(function() {
      // Add default users to the database
      for (var i = 0; i < posts.length; i++) {
        // loop through all users
        Post.create({ title: posts[i] }); // create a new entry in the users table
      }
    });
}

/*db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});
*/


// Send post data - used by client.js
app.get("/posts", function(request, response) {
  Post.findAll().then(function(posts) {
    // finds all entries in the posts table
    response.send(posts); // sends posts back to the page
  });
});

// create a new entry in the posts table
app.post("/new/post", urlencodedParser, function(request, response) {
  Post.create({ title: request.body.post });
  response.redirect("/");
});

// create a new entry in the comments table
app.post("/new/comment", urlencodedParser, function(request, response) {
	Comment.create({name: request.body.post});
	response.redirect("/");
});

// drops the table posts if it already exists and creates a new table with just the default posts
app.get("/reset", function(request, response) {
  setup();
  response.redirect("/");
});

// Serve the root url: http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile("./views/index.html", {root: '.'});
});

// Listen on port 8080
var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});

