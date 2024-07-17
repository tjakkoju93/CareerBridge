const mongoose = require("mongoose");

const employeeScchema = new mongoose.Schema({
  nameOfCompany: {
    Type: string,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  companyid: {
    Type: number,
    Required: true,
  },
  firstName: {
    Type: string,
    Required: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  lastName: {
    Type: string,
    Required: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  email: {
    Type: string,
    Required: true,
  },
  password: {
    Type: string,
    Required: true,
  },
  role: {
    Type: string,
    Enum: [Employee, Employer],
    Required: true,
  },
  Technologies: {
    Type: string,
  },

  Experience: {
    Type: string,
  },
  Location: {
    Type: string,
    Enum: [Hydedrabad, Pune, Banglore, Mumbai, Delhi],
  },
  GraduateYear: {
    Type: Year,
  },
  Language: {
    Type: string,
    Enum: [Telugu, hHindi, English],
  },
  NoticePeriod: {
    Type: Number,
  },
});
