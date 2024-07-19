const jobModel = require("../model/jobModel");
require('../db/dbConnection')

const createJob = async (req, res) => {
  const user_id = req.user._id
  if(!user_id){
    throw Error ("Authorization token required")
  }
  try {
    const data = req.body;
    // const response = await jobModel.create(data);
    const newData =new jobModel({data,user_id}) 
    const response = newData.save();
    response.duplicateJobID = response._id;
    await response.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const updateJob = async (req, res) => {
  const uers_id = req.user._id
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await jobModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const getJobDdetails = async (req,res)=>{
  try{
    console.log("inside get job details")

  }catch(err){
    res.status(400).json({Error:err.message})
  }

}

module.exports = {
  createJob,
  updateJob,
  getJobDdetails,
};
