const User = require("../models/User");
const { hashPassword } = require("../utils/passwordHasher");

const registerNewUser = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  try {
    await User.create({ ...req.body, password: hashedPassword });
    res.status(200).json(req.body);
  } catch (error) {
    res.status(403).json({ error: "Username already exists" });
  }
};

module.exports = {
  registerNewUser,
};
