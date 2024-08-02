const express = require("express");

const jobRouter = express.Router();

const {
  createJob,
  updateJob,
  getJobDetails,
  applyJobs,
  jobsApplied,
  getEmpJobDetails,
  deleteJob,
} = require("../controller/jobController");

//importing middleware
const authUser = require("../middleware/authmiddleware");

//---------------------------------- Employer Routes ----------------------

jobRouter.post("/create_Job", authUser("EMPLOYER"), createJob);
jobRouter.patch("/update_Job/:jobID", authUser("EMPLOYER"), updateJob);
jobRouter.get("/getJobs_Emplyr", authUser("EMPLOYER"), getEmpJobDetails);
jobRouter.get("/jobsApplied_emplyr", authUser("EMPLOYER"), jobsApplied);
jobRouter.delete("/delete_Job/:jobID", authUser("EMPLOYER"), deleteJob);

//---------------------------------- Employee Routes ----------------------

jobRouter.get("/getJobs_Emp", getJobDetails);
jobRouter.post("/apply_Jobs/:jobID", authUser("EMPLOYEE"), applyJobs);
jobRouter.get("/jobsApplied_emp", authUser("EMPLOYEE"), jobsApplied);

module.exports = jobRouter;
