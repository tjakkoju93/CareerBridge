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


//routes
app.use("/api/v1/jobs",jobRouter)
app.use("/api/v1/users",userRoutes)



//listening to port
app.listen(port ,()=>{
    console.log(`connected to port ${port}`)
}
)