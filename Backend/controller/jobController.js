const jobModel = require("../model/jobModel");
require("../db/dbConnection");
const { v4: uuidv4 } = require("uuid");

const createJob = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  const job_Id = uuidv4();
  if (!emp_id || !role) {
    throw Error("Authorization token required");
  }
  if (role == "EMPLOYEE") {
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
    res.status(201).json(response);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const updateJob = async (req, res) => {
  const emp_id = req.user._id;
  const role = req.user.role;
  if (!emp_id || !role) {
    throw Error("Authorization token required");
  }
  if (role == "EMPLOYEE") {
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
    throw Error("Authorization token required");
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
    throw Error("Authorization token required");
  } else if (role == "EMPLOYER") {
    throw Error("Employer cannot apply for job");
  } else if (!jobID) {
    throw Error("Select a valid job");
  } else if (data.jobStatus == "Applied") {
    if (data.employeeID && data.employeeID.length > 0) {
      for (i = 0; i < data.employeeID.length; i++) {
        if (data.employeeID[i].employeeID == emp_id) {
          console.log(data.employeeID[i].employeeID)
          res.status(401).json("User already applied for job");
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
    throw Error("Authorization token required");
  }

  try {
    if (role == "EMPLOYEE") {
      const data = await jobModel.findOne({"employeeID.employeeID":emp_id});
      if (data.employeeID && data.employeeID.length > 0) {
        for (i = 0; i < data.employeeID.length; i++) {
          if (data.employeeID[i].employeeID == emp_id) {
            const response = await jobModel.find({
              jobStatus: "Applied",
            });
            const empID = data.employeeID[i].employeeID;
            res.status(200).json([...response, { employeeID: empID }]);
          }
        }
      }
    }
    if (role == "EMPLOYER") {
      const response = await jobModel.find({
        jobStatus: "Applied",
        employerID: emp_id,
      });
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ Error: err.msg });
  }
};

const deleteJob = async (req, res) => {
  const role = req.user.role;
  const id = req.user._id;
  const jobID = req.params.jobID;
  console.log(role, id, jobID);

  if (!id || !role) {
    throw Error("Authorization token required");
  }
  if (!id) {
    throw Error("Authorization token required");
  } else if (role == "EMPLOYEE") {
    throw Error("Employee cannot delete a job");
  } else if (!jobID) {
    throw Error("Enter a valid job id");
  }
  try {
    const data = await jobModel.findOne({ jobID: jobID });
    if (id != data.employerID || jobID != data.jobID) {
      throw Error("User doesnt have permission to delete the job");
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
