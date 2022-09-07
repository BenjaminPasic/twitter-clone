const dbConnection = require("../config/dbConnection");
const Post = require("../models/Post");

const addNewPost = async (req, res) => {
  try {
    const insertedPost = await Post.create(req.body);
    res.status(200).json(insertedPost.dataValues);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getPosts = async (req, res) => {
  try {
    const [posts, meta] = await dbConnection.query(
      "SELECT * FROM users JOIN posts ON users.id = posts.user_id",
      { raw: true }
    );
    res.status(200).json(posts);
  } catch (error) {}
};

module.exports = {
  addNewPost,
  getPosts,
};
