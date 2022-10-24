const db=require("../models");
const Post = db.posts;
const Comment = db.comments;

//Create Post
exports.createPost = (post) => {
  return Post.create({
    title: post.title,
    description: post.description,
  })
    .then((post) => {
      console.log(">> Created post: " + JSON.stringify(post, null, 4));
      return post;
    })
    .catch((err) => {
      console.log(">> Error while creating post: ", err);
    });
};

//Create Comment
exports.createComment = (postId, comment) => {
  return Comment.create({
    name: comment.name,
    text: comment.text,
    postId: postId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};

//Search for Post
exports.findPostById = (postId) => {
  return Post.findByPk(postId, { include: ["comments"] })
    .then((post) => {
      return post;
    })
    .catch((err) => {
      console.log(">> Error while finding post: ", err);
    });
};

//Search for Comment
exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["post"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};

//Return All Posts Including Comments
exports.findAll = () => {
  return Post.findAll({
    include: ["comments"],
  }).then((posts) => {
    return posts;
  });
};
