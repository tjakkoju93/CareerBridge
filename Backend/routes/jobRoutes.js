const express = require("express");

const jobRouter = express.Router();

const { createJob ,updateJob,getJobDdetails } =require('../controller/jobController')

//importing middleware
const authUser = require('../middleware/authmiddleware')
jobRouter.use(authUser);

jobRouter.get("/", () => {});

jobRouter.post("/createJob", createJob);

jobRouter.patch("/updateJob/:id",updateJob);

jobRouter.get('/getJobDdetails',getJobDdetails)

module.exports = jobRouter;
