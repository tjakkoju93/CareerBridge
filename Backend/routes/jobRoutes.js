const express = require("express");

const jobRouter = express.Router();

const { createJob ,updateJob,getJobDetails ,applyJobs,jobsApplied,getEmpJobDetails} =require('../controller/jobController')

//importing middleware
const authUser = require('../middleware/authmiddleware')

jobRouter.post("/createJob",authUser('Employer'),createJob);

jobRouter.patch("/updateJob/:id",authUser('Employer'),updateJob);

jobRouter.get('/getJobs',getJobDetails);
jobRouter.get('/getJobsEmp',authUser('Employer'),getEmpJobDetails);

jobRouter.post('/applyJobs',authUser('Employee'),applyJobs)

jobRouter.get('/jobsApplied',authUser('Employee'),jobsApplied)
jobRouter.get('/jobsApplied/emp',authUser('Employer'),jobsApplied)


module.exports = jobRouter;
