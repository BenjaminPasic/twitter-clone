const jwt = require("jsonwebtoken");

const tokenVerification = async (req, res, next) => {
  const token = req.headers.auth;
  try {
    await jwt.verify(token, "tempKey");
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = tokenVerification;
