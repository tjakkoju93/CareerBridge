const express = require("express");
const userRouter = express.Router();

//---------------------------- Imports ---------------------------------

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
const { verifyOtp } = require("../controller/otpGenController");
const {
  emailVerification,
  passwordReset,
} = require("../controller/passwordController");

// ------------------------ User Login and Signup ------------------------

userRouter.post("/create_Emp", rules, userValidation, createUser);
userRouter.post("/login_Emp", loginuser);

//---------------------------------- Employee Routes ----------------------

userRouter.get("/get_Emp", authUser("EMPLOYEE"), getUser);
userRouter.get("/get_Emp/:id", authUser("EMPLOYEE"), getEmpByID);
userRouter.patch("/update_Emp", authUser("EMPLOYEE"), updateUser);
userRouter.patch("/verifyUser_Emp", authUser("EMPLOYEE"), verifyOtp);
userRouter.patch("/passwordReset_Emp", authUser("EMPLOYEE"), passwordReset);

//---------------------------------- Employee Routes ----------------------

userRouter.get("/get_Emplyr", authUser("EMPLOYER"), getUser);
userRouter.get("/get_Emplyr/:id", authUser("EMPLOYER"), getEmpByID);
userRouter.patch("/update_Emplyr", authUser("EMPLOYER"), updateUser);
userRouter.patch("/verifyUser_Emplyr", authUser("EMPLOYER"), verifyOtp);
userRouter.patch("/passwordReset_Emplyr", authUser("EMPLOYER"), passwordReset);

//---------------------------------- Delete User ----------------------------

userRouter.delete("/delete_User/:id", deleteUser);

//---------------------------------- Password Reset ----------------------------

userRouter.patch("/emailVerification", emailVerification);


module.exports = userRouter;
