require("../db/dbConnection");
const emp_employer = require("../model/userModel");
const generateToken = require("../utils/tokenGen");

const createUser = async (req, res) => {
  const userDetails = req.body;

  try {
    await emp_employer.userSignup(userDetails);

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
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json("Invalid email or password");
  }
};

const getUser = async (req, res) => {
  const user_id = req.user._id;
  try {
    const response = await emp_employer.findOne({ _id: user_id });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const getEmpByID = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(req.user)
  const user_id = req.user._id;
  const role = req.user.role;
  // console.log(_id, role);
  if (!id) {
    throw Error("Enter a valid ID");
  } else if (user_id != id) {
    throw Error("User is not authorised");
  } else if (!role) {
    throw Error("No valid role found");
  }

  try {
    if (role == "EMPLOYEE") {
      const response = await emp_employer.findById({ _id: user_id });
      res.status(200).json(response);
    } else if (role == "EMPLOYER") {
      const response = await emp_employer.findById({ _id: user_id });
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
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
    res.status(400).json({ Error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    if (!id) {
      throw Error("Enter valid user details/id");
    }
    const response = await emp_employer.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ Error: err.message });
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
