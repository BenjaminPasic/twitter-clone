const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyToken,
  getUserInfoByToken,
} = require("../controllers/userController");
const tokenVerification = require("../middleware/tokenVerification");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verifyToken", tokenVerification, verifyToken);

router.get("/getUserInfoByToken", getUserInfoByToken);

module.exports = router;
