require("../db/dbConnection");
const emp_employer = require("../model/userModel");
const generateToken = require("../utils/tokenGen");
const { otpModule } = require("./otpGenController");

const createUser = async (req, res) => {
  const userDetails = req.body;

  try {
    const user = await emp_employer.userSignup(userDetails);
    const token = otpModule(user);
    res.status(201).json({
      message: "User is registered Successfully ,Please login to access portal",
      token,
    });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await emp_employer.userLogin(email, password);
    const token = await generateToken(userData._id, userData.role); //change made
    return res.status(201).json({message : token });
  } catch (err) {
    return res.status(400).json({message :"Invalid email or password"});
  }
};

const getUser = async (req, res) => {
  const user_id = req.user._id;
  try {
    const response = await emp_employer.findOne({ _id: user_id });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ Error: err.message });
  }
};

const getEmpByID = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;
  const role = req.user.role;
  if (!id) {
    return res.status(401).json({message :"Enter a valid ID"});
  } else if (user_id != id) {
    return res.status(401).json({message :"User is not authorised"});
  } else if (!role) {
    return res.status(401).json({message :"No valid role found"});
  }

  try {
    if (role == "EMPLOYEE") {
      const response = await emp_employer.findById({ _id: user_id });
      return res.status(200).json(response);
    } else if (role == "EMPLOYER") {
      const response = await emp_employer.findById({ _id: user_id });
      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(400).json({ Error: err.message });
  }
};

const updateUser = async (req, res) => {
  const user_id = req.user._id;
  const role = req.user.role;

  try {
    if (role == "EMPLOYER") {
      const response = await emp_employer.findByIdAndUpdate(
        { _id: user_id },
        req.body,
        { new: true }
      );
      res.status(201).json(response);
    } else if (role == "EMPLOYEE") {
      const response = await emp_employer.findByIdAndUpdate(
        { _id: user_id },
        req.body,
        { new: true }
      );
      res.status(201).json(response);
    }
  } catch (err) {
    return res.status(400).json({ Error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(401).json({message :"Enter valid user details/id"});
    }
    const response = await emp_employer.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    return res.status(201).json(response);
  } catch (err) {
    return res.status(400).json({ Error: err.message });
  }
};

module.exports = {
  createUser,
  loginuser,
  updateUser,
  getUser,
  deleteUser,
  getEmpByID,
};
