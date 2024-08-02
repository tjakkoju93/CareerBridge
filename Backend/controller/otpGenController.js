const nodemailer = require("nodemailer");
require("dotenv").config();
const emp_employer = require("../model/userModel");
const generateToken = require("../utils/tokenGen");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, //app password
  },
});

const genOTP = (req, res) => {
  return Math.ceil(Math.random() * 100000);
};

const sendMail = (otp, email) => {
  transporter.sendMail(
    {
      from: '"Tejaswini Jakkoju" <jtejaswini@careerpedia.co>',
      to: email,
      subject: "Email Verification",
      html: `Your verification code is ${otp}`,
    },
    (err, val) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        return res.status(400).json({ message: val.response });
      }
    }
  );
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const id = req.user._id;
  const user = await emp_employer.findOne({ _id: id });
  if (!user.email || !id || !otp) {
    return res
      .status(400)
      .json({ message: "User is not authorised or OTP is required" });
  }
  if (otp != user.otp) {
    return res
      .status(400)
      .json({ message: "Invalid otp , please re-enter the valid otp" });
  }
  user.isVerified = true;
  user.otp = null;
  user.save();
  return res.status(200).json({ message: "Email verification successful" });
};

const otpModule = (user) => {
  const otp = genOTP();
  sendMail(otp, user.email);
  user.otp = otp;
  user.save();
  const token = generateToken(user._id, user.role);
  return token;
};

module.exports = { genOTP, sendMail, verifyOtp, otpModule };
