const User = require("../models/User");
const { hashPassword, comparePasswords } = require("../utils/passwordHasher");

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
    res.status(200).json({ token: "abc123" });
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
