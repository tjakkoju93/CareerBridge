const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5400

//Middleware
app.use(express.json());

//DB Connection
require('./db/dbConnection')

//model
require('./model/userModel')
require('./model/jobModel')


//required routes
const jobRouter = require("./routes/jobRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
// const otpRouter = require("./routes/otpRoutes.js")

//routes
app.use("/api/v1/jobs",jobRouter);
app.use("/api/v1/users",userRoutes);
// app.use("api/v1/otps",otpRouter);



//listening to port
app.listen(port ,()=>{
    console.log(`connected to port ${port}`)
}
)