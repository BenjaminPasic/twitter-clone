const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyToken,
  getUserIdByToken,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verifyToken", verifyToken);

router.get("/getUserIdByToken", getUserIdByToken);

module.exports = router;
