const express = require("express");
const router = express.Router();
const { addNewPost, getPosts } = require("../controllers/postController");
const tokenVerification = require("../middleware/tokenVerification");

router.post("/addNewPost", tokenVerification, addNewPost);

router.get("/getPosts", tokenVerification, getPosts);

module.exports = router;
