const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  jobcompanyName: {
    type: String,
    required: true,
    Maxlength: [50],
  },
  jobRole: {
    type: String,
    required: true,
    Maxlength: [50],
  },
  jobStatus: {
    type: String,
    enum: ["APPLIED", "NOT APPLIED", "APPROVED", "REJECTED"],
    required: true,
    default: "NOT APPLIED",
  },
  jobTechnologies: {
    type: String,
    required: true,
    enum: ["JAVA", "JAVASCRIPT", "PYTHON", "REACTJS", "ANGULARJS", "FULLSTACK"],
  },
  jobExperienceRequired: {
    type: String,
    required: true,
    enum: ["0 - 2", "3 - 5", "6 - 8", "> 10"],
  },
  jobLocation: {
    type: String,
    enum: ["HYDERABAD", "PUNE", "BANGLORE", "MUMBAI", "DELHI", "CHENNAI"],
    required: true,
  },
  jobGraduate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: "ENGLISH",
  },
  jobNoticePeriod: {
    type: Number,
    required: true,
  },
  jobID: {
    type: String,
    default: null,
  },
  employerID:{
    type: String,
  },
  employeeID:[
    {
      type: new mongoose.Schema({
        employeeID: String,
      }),
      default: [],
    }
  ],

},{timestamps:true});

const jobModel = new mongoose.model("jobModel", jobSchema);

module.exports = jobModel;
