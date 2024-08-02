const emp_employer = require("../model/userModel");
const { otpModule } = require("./otpGenController");
const bcrypt = require("bcrypt");

const emailVerification = async (req, res) => {
  const { email } = req.body;
  const user = await emp_employer.findOne({ email });
  if (!email || !user) {
    return res
      .status(400)
      .json({ message: "Enter a valid email / user not found" });
  }
  const token = otpModule(user);
  res.status(200).json({
    message: "OTP send to your mail , please verify",
    token,
  });
};

const passwordReset = async (req, res) => {
  const id = req.user._id;
  const user = await emp_employer.findOne({ _id: id });
  const newPassword = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  user.password = hash;
  user.save();
  return res.status(200).json({message : "Password reset / update successful"})
};

module.exports = { emailVerification, passwordReset };
