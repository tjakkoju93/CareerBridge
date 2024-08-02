const jobModel = require("../model/jobModel");
require("../db/dbConnection");
const { v4: uuidv4 } = require("uuid");

const createJob = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  const job_Id = uuidv4();
  if (!emp_id || !role) {
    return res.status(401).json({message :"Authorization token required"});
  }
  if (role == "EMPLOYEE") {
    return res.status(403).json({message : "Only employers can create the job"});
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
      employerID,
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
      jobID: job_Id,
      employerID: emp_id,
    });
    const response = await newData.save();
    return res.status(201).json(response);
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
};

const updateJob = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  if (!emp_id || !role) {
    return res.status(401).json({message :"Authorization token required"});
  }
  if (role == "EMPLOYEE") {
    return res.status(403).json({message :"Only employers can create the job"});
  }

  try {
    const { jobID } = req.params;
    const data = req.body;
    const response = await jobModel.findOneAndUpdate(
      { jobID: jobID, employerID: emp_id },
      data,
      {
        new: true,
      }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getJobDetails = async (req, res) => {
  try {
    const response = await jobModel.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const getEmpJobDetails = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;

  if (!emp_id || !role) {
    return res.status(401).json({message :"Authorization token required"});
  }
  if (role == "EMPLOYER") {
    try {
      const response = await jobModel.find({ employerID: emp_id });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
};

const applyJobs = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  const { jobID } = req.params;
  const data = await jobModel.findOne({ jobID: jobID });

  if (!emp_id || !role) {
    return res.status(401).json({message :"Authorization token required"});
  } else if (role == "EMPLOYER") {
    return res.status(403).json({message :"Employer cannot apply for job"});
  } else if (!jobID) {
    return res.status(404).json({message :"Select a valid job"});
  } else if (data.jobStatus == "Applied") {
    if (data.employeeID && data.employeeID.length > 0) {
      for (i = 0; i < data.employeeID.length; i++) {
        if (data.employeeID[i].employeeID == emp_id) {
          return res.status(401).json({message :"User already applied for job"});
        }
      }
    }
  }

  try {
    const response = await jobModel.findOneAndUpdate(
      { jobID: jobID },
      {
        jobStatus: "Applied",
        $push: { employeeID: { employeeID: emp_id } },
      },
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
  const role = req.user.role;
  if (!emp_id || !role) {
    return res.status(401).json({message :"Authorization token required"});
  }

  try {
    if (role == "EMPLOYEE") {
      const data = await jobModel.findOne({ "employeeID.employeeID": emp_id });
      if (data.employeeID && data.employeeID.length > 0) {
        for (i = 0; i < data.employeeID.length; i++) {
          if (data.employeeID[i].employeeID == emp_id) {
            const response = await jobModel.find({
              jobStatus: "Applied",
            });
            const empID = data.employeeID[i].employeeID;
            return res.status(200).json([...response, { employeeID: empID }]);
          }
        }
      }
    }
    if (role == "EMPLOYER") {
      const response = await jobModel.find({
        jobStatus: "Applied",
        employerID: emp_id,
      });
      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(500).json({ Error: err.msg });
  }
};

const deleteJob = async (req, res) => {
  const role = req.user.role;
  const id = req.user._id;
  const jobID = req.params.jobID;
  console.log(role, id, jobID);

  if (!id || !role) {
    return res.status(401).json({message :"Authorization token required"});
  } else if (role == "EMPLOYEE") {
    return res.status(403).json({message :"Employee cannot delete a job"});
  } else if (!jobID) {
    return res.status(404).json({message :"Enter a valid job id"});
  }
  try {
    const data = await jobModel.findOne({ jobID: jobID });
    if (id != data.employerID || jobID != data.jobID) {
      return res.status(401).json({message :"User doesnt have permission to delete the job"});
    }
    const response = await jobModel.findOneAndDelete({ jobID: jobID });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

module.exports = {
  createJob,
  updateJob,
  getJobDetails,
  applyJobs,
  jobsApplied,
  getEmpJobDetails,
  deleteJob,
};
