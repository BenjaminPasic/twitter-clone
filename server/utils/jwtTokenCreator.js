const jwt = require("jsonwebtoken");

const createToken = async (data) => {
  try {
    const token = await jwt.sign(data, "tempKey", { expiresIn: "1d" });
    return token;
  } catch (error) {
    console.log("Token creation error: ", error);
  }
};

const checkToken = async (token) => {
  try {
    await jwt.verify(token, "tempKey");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { createToken, checkToken };
