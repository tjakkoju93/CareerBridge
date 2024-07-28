const express = require("express");

const userRouter = express.Router();

const {
  createUser,
  loginuser,
  updateUser,
  getUser,
  deleteUser,
  getEmpByID,
} = require("../controller/userController");

const authUser = require("../middleware/authmiddleware");

const { rules, userValidation } = require("../validations/userValidation");

//Login and signup for both Employee and Employer
userRouter.post("/create_Emp", rules, userValidation, createUser);

userRouter.post("/login_Emp", loginuser);

//get Employee details
userRouter.get("/get_Emp", authUser("EMPLOYEE"), getUser);

//get Employer details
userRouter.get("/get_Emplyr", authUser("EMPLOYER"), getUser);

//get Employee by ID
userRouter.get("/get_Emp/:id", authUser("EMPLOYEE"), getEmpByID);

// get Employer by ID
userRouter.get("/get_Emplyr/:id", authUser("EMPLOYER"), getEmpByID);

//update Employee details
userRouter.patch("/update_Emp", authUser("EMPLOYEE"), updateUser);

//update Employer details
userRouter.patch("/update_Emplyr", authUser("EMPLOYER"), updateUser);

//delete user by ID
userRouter.delete("/delete_User/:id", deleteUser);

module.exports = userRouter;
