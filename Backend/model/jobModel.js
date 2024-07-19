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
  // companyId: {
  //   Type: number,
  //   Required: true,
  // },
  jobTechnologies: {
    type: String,
    required: true,
    enum: ["Java", "JavaScript", "Python", "ReactJs", "AngularJS", "FullStack"],
  },
  jobExperienceRequired: {
    type: String,
    required: true,
    enum: ["0 - 2", "3 - 5", "6 - 8", "10"],
  },
  jobLocation: {
    type: String,
    enum: ["Hyderabad", "Pune", "Banglore", "Mumbai", "Delhi", "Chennai"],
    required: true,
  },
  jobGraduate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: "English",
  },
  jobNoticePeriod: {
    type: Number,
    required: true,
  },
  duplicateJobID: {
    type: String,
    default:null
  },
  user_id:{
    type:String,
    required:true
  }
});

const jobModel = new mongoose.model("jobModel", jobSchema);

module.exports = jobModel;
