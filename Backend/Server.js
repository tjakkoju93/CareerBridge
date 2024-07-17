const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5400

//Middleware
app.use(express.json())

//DB Connection
require('./db/dbConnection')


//listening to port
app.listen(port ,()=>{
    console.log(`connected to port ${port}`)
}