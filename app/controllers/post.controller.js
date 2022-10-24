const db=require("../models");
const Post = db.posts;
const Comment = db.comments;

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

exports.findPostById = (postId) => {
  return Post.findByPk(postId, { include: ["comments"] })
    .then((post) => {
      return post;
    })
    .catch((err) => {
      console.log(">> Error while finding post: ", err);
    });
};

exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["post"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};


exports.findAll = () => {
  return Post.findAll({
    include: ["comments"],
  }).then((posts) => {
    return posts;
  });
};
