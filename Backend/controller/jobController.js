const jobModel = require("../model/jobModel");
require("../db/dbConnection");
const User = require("../model/userModel");

const createJob = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  if (!emp_id) {
    throw Error("Authorization token required");
  }
  if (role == "Employee") {
    throw Error("Only employers can create the job");
  }
  try {
    const {
      jobcompanyName,
      jobRole,
      jobTechnologies,
      jobExperienceRequired,
      jobLocation,
      jobGraduate,
      language,
      jobNoticePeriod,
      jobID,
    } = req.body;

    const newData = new jobModel({
      jobcompanyName,
      jobRole,
      jobTechnologies,
      jobExperienceRequired,
      jobLocation,
      jobGraduate,
      language,
      jobNoticePeriod,
      jobID,
      emp_id,
    });
    newData.jobID = newData._id;
    const response = await newData.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const updateJob = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  if (!emp_id) {
    throw Error("Authorization token required");
  }
  if (role == "Employee") {
    throw Error("Only employers can create the job");
  }

  try {
    const id = req.params.id;
    const data = req.body;
    const response = await jobModel.findByIdAndUpdate(
      { _id: id, emp_id: emp_id },
      data,
      {
        new: true,
      }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const getJobDetails = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  if (!emp_id) {
    throw Error("Authorization token required");
  }
  if (!role) {
    throw Error("Enter valid role");
  }
  if (role == "Employee") {
    try {
      const response = await jobModel.find();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
  if (role == "Employer") {
    try {
      const response = await jobModel.find({ emp_id: emp_id });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
};

const applyJobs = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  const { jobID } = req.body;
  const data = await jobModel.findOne({ jobID: jobID }).select("jobStatus");
  if (!emp_id) {
    throw Error("Authorization token required");
  } else if (role == "Employer") {
    throw Error("Employer cannot apply for job");
  } else if (!jobID) {
    throw Error("Select a valid job");
  } else if (data.jobStatus == "Applied") {
    throw Error("You have already applied for job");
  }

  try {
    const response = await jobModel.findByIdAndUpdate(
      jobID,
      { jobStatus: "Applied" },
      {
        new: true,
      }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const jobsApplied = async (req, res) => {
  const emp_id = req.user._id;
  const { jobID } = req.body;
  const { _id, jobStatus } = await jobModel
    .findOne({ jobID: jobID })
    .select("jobStatus");
  if (!emp_id) {
    throw Error("Authorization token required");
  } else if (jobStatus != "Applied") {
    throw Error("No jobs are applied");
  }
  try {
    const response = await jobModel.find({ jobStatus: "Applied" });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.msg });
  }
};

module.exports = {
  createJob,
  updateJob,
  getJobDetails,
  applyJobs,
  jobsApplied,
};
