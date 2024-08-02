const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userValidation = require("../validations/userValidation");

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: [30, "Name cannot be more than 30 characters"],
    },
    lastName: {
      type: String,
      required: true,
      maxlength: [30, "Name cannot be more than 30 characters"],
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    currentCompany: {
      type: String,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    role: {
      type: String,
      enum: ["EMPLOYEE", "EMPLOYER", "ADMIN"],
      required: true,
    },
    companyType: {
      type: String,
    },
    currentTechnologies: {
      type: String,
      default: null,
    },
    currentExperience: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["TELUGU", "HINDI", "ENGLISH"],
      default: null,
    },
    noticePeriod: {
      type: Number,
      default: 0,
    },
    otp: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

employeeSchema.statics.userSignup = async (userDetails) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    password,
    currentCompany,
    role,
    companyType,
    currentTechnologies,
    currentExperience,
    address,
    language,
    noticePeriod,
  } = userDetails;

  const exists = await emp_employer.findOne({ email });

  if (exists) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const response = await emp_employer.create({
    firstName,
    lastName,
    email,
    mobile,
    password: hash,
    currentCompany,
    role,
    companyType,
    currentTechnologies,
    currentExperience,
    address,
    language,
    noticePeriod,
  });
  return response;
};

employeeSchema.statics.userLogin = async (email, password) => {
  const user = await emp_employer.findOne({ email: email });
  if (!user) {
    throw Error("Enter a valid mail address");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const emp_employer = new mongoose.model("emp_employer", employeeSchema);

module.exports = emp_employer;
