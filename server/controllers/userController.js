const User = require("../models/User");
const { hashPassword, comparePasswords } = require("../utils/passwordHasher");
const {
  createToken,
  checkToken,
  decodeToken,
} = require("../utils/jwtTokenCreator");

const registerUser = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  try {
    await User.create({ ...req.body, password: hashedPassword });
    res.status(200).json(req.body);
  } catch (error) {
    res.status(403).json({ error: "Username already exists" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username }, raw: true });
    if (!user) throw "Invalid username";
    const match = await comparePasswords(password, user.password);
    if (!match) throw "Invalid password";
    const token = await createToken({ user_id: user.id });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

const verifyToken = async (req, res) => {
  const token = req.headers.auth;
  const valid = await checkToken(token);
  if (valid) {
    res.status(200).json({ isValid: valid });
  } else {
    res.json({ isValid: valid });
  }
};

const getUserIdByToken = async (req, res) => {
  const token = req.headers.auth;
  const valid = await checkToken(token);
  if (valid) {
    const { user_id } = await decodeToken(token);
    res.status(200).json({ user_id });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  getUserIdByToken,
};
