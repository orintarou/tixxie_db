const db = require("./app/models");
const controller = require("./app/controllers/post.controller");
const http = require('http');
const hostname='127.0.0.1';
const port=8000;
'use strict';

const main = async () => {
	const Post1 = await controller.createPost({
		title: "Post#1",
		description: "Post#1 Description",
	});
	const Post2 = await controller.createPost({
		title: "Post#2",
		description: "Post#2 Description",
	});

	const posts = await controller.findAll();
	console.log(">> All posts", JSON.stringify(posts, null, 2));
	return posts;
};

db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});



const server = http.createServer();
server.on('request', async (req, res) => {
	const data = await main();
	if(req.url.startsWith("/")){
		res.end(JSON.stringify(data));
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

