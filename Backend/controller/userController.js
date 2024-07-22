require("../db/dbConnection");
const emp_employer = require("../model/userModel");
const generateToken = require("../utils/tokenGen");

const createUser = async (req, res) => {
  const userDetails = req.body;

  try {
    const userData = await emp_employer.userSignup(userDetails);
    // const token = await generateToken(userData._id,userData.role);
    // const { email, role } = userData;

    res
      .status(201)
      .json("User is registered Successfully ,Please login to access portal");
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await emp_employer.userLogin(email, password);
    const token = await generateToken(userData._id, userData.role); //change made
    // const { role } = userData;
    res.status(201).json({token });
  } catch (err) {
    res.status(400).json("Invalid email or password");
  }
};

const updateUser = async(req,res) =>{
  const emp_id = req.user._id;
  try{
    // const /

  }catch(err){
    res.status(400).json({Error:err.message})
  }
}

module.exports = {
  createUser,
  loginuser,
  updateUser
};
