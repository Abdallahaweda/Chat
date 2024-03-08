require("dotenv").config();

const userModel = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const validator = require("validator");

let createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return JWT.sign({ _id }, jwtkey, { expiresIn: "3d" });
};
let registerUser = async (req, res) => {
  try {
    let { name, email, username, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json("User with the given email already exists");

    if (!name || !email || !username || !password)
      return res.status(400).json("All fields are required");

    if (!validator.isEmail(email))
      return res.status(400).json("Email is not valid");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("Password must be a strong password");

    user = new userModel({ name, email, username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    let token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, username, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

let loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    // if (!email || !password)
    //   return res.status(400).json("All fields are required");

    if (!user) return res.status(400).json("Invalid email...");

    let isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(400).json("Invalid  password...");

    let token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email,
      username: user.username,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

let findUser = async (req, res) => {
  let userId = req.params.userId;
  try {
    let user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

let getUsers = async (req, res) => {
  try {
    let users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = { registerUser, loginUser, findUser, getUsers };
