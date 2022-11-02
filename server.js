const db = require("./app/models");
const express = require("express"); 
const app = express();
const controller = require("./app/controllers/post.controller");
const http = require('http');
const hostname='127.0.0.1';
const port=8000;
'use strict';

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const main = async () => {
	const Post1 = await controller.createPost({
		title: "Post#1",
		description: "Post#1 Description",
	});
	const Post2 = await controller.createPost({
		title: "Post#2",
		description: "Post#2 Description",
	});

	const Comment1 = await controller.createComment(Post1.id, {
		name: "kuma",
		postId: 1,
	})

	const posts = await controller.findAll();

	console.log(">> All posts", JSON.stringify(posts, null, 2));
	return posts;
};

db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
	main();
	console.log("Drop and re-sync db.");
});

app.get("/", function(request, response) {
	controller.findAll().then(function(posts) {
		// finds all entries in the users table
		response.send(posts); // sends users back to the page
	});
});

app.get("/post/:id", function(request, response) {
	const {id} = request.params;
	controller.findPostById(id).then(function(post) {
		// finds all entries in the users table
		response.send(post); // sends users back to the page
	});
});

// create a new entry in the posts table
app.post("/new", urlencodedParser, function(request, response) {
	db.posts.create({ title: request.body.post });
	response.redirect("/");
});

// Listen on port 8080
var listener = app.listen(8000, function() {
	console.log("Listening on port " + listener.address().port);
});


/*const server = http.createServer();
server.on('request', async (req, res) => {
	const data = await main();
	if(req.url.startsWith("/")){
		res.end(JSON.stringify(data));
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});*/

