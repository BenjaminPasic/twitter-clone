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

const decodeToken = async (token) => {
  try {
    const data = await jwt.verify(token, "tempKey");
    return { user_id: data.user_id, username: data.username };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createToken, checkToken, decodeToken };
