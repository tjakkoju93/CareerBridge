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

//API  for Employer to create a job
jobRouter.post("/create_Job", authUser("EMPLOYER"), createJob);

//API  for Employer to update an existing job
jobRouter.patch("/update_Job/:id", authUser("EMPLOYER"), updateJob);

//APT for an employee to view all the jobs posted
jobRouter.get("/getJobs_Emp", getJobDetails);

//APT for an employee to view the jobs posted by them
jobRouter.get("/getJobs_Emplyr", authUser("EMPLOYER"), getEmpJobDetails);

//APT for an employee to view apply the jobs posted
jobRouter.post("/apply_Jobs/:jobID", authUser("EMPLOYEE"), applyJobs);

//API for viewing jobs applied by employee
jobRouter.get("/jobsApplied_emp", authUser("EMPLOYEE"), jobsApplied);

//API for viewing jobs posted by respective employer with status applied
jobRouter.get("/jobsApplied_emplyr", authUser("EMPLOYER"), jobsApplied);

//API to delete job
jobRouter.delete("/delete_Job/:jobID", authUser("EMPLOYER"), deleteJob);

module.exports = jobRouter;
