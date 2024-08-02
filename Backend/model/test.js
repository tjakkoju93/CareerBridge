const mongoose = require("mongoose");

const userProfile = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    default: null,
  },
  technologies: {
    type: String,
    required: true,
    enum: ["JAVA", "JAVASCRIPT", "PYTHON", "REACTJS", "ANGULARJS", "FULLSTACK"],
  },
  experience: {
    type: String,
    required: true,
    enum: ["0 - 2", "3 - 5", "6 - 8", "> 10"],
  },
  location: {
    type: String,
    enum: ["HYDERABAD", "PUNE", "BANGLORE", "MUMBAI", "DELHI", "CHENNAI"],
    required: true,
  },
  graduate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: "English",
  },
  noticePeriod: {
    type: Number,
    required: true,
  },
});
