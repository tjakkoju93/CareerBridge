require("../db/dbConnection");
const emp_employer = require("../model/userModel");
const generateToken = require("../utils/tokenGen");

const createUser = async (req, res) => {
  const userDetails = req.body;
  const status = "applied";
  try {
    const userData = await emp_employer.userSignup(userDetails);
    const token = await generateToken(userData._id);
    const { email, role } = userData;

    res.status(201).json({ email, role, token });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await emp_employer.userLogin(email, password);
    const token = await generateToken(userData._id);
    const { role } = userData;
    res.status(201).json({ email, role, token });
  } catch (err) {
    res.status(400).json("Invalid email or password");
  }
};

module.exports = {
  createUser,
  loginuser,
};
