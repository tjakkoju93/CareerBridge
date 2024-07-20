const express = require("express");

const jobRouter = express.Router();

const { createJob ,updateJob,getJobDetails ,applyJobs,jobsApplied} =require('../controller/jobController')

//importing middleware
const authUser = require('../middleware/authmiddleware')

jobRouter.post("/createJob",authUser('Employer'),createJob);

jobRouter.patch("/updateJob/:id",authUser('Employer'),updateJob);

jobRouter.get('/getJobs',authUser('Employee'),getJobDetails);
jobRouter.get('/getJobsEmp',authUser('Employer'),getJobDetails);

jobRouter.post('/applyJobs',authUser('Employee'),applyJobs)

jobRouter.get('/jobsApplied',authUser('Employee'),jobsApplied)



module.exports = jobRouter;
