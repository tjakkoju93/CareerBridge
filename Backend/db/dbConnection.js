const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://localhost:27017/EmployeeEmployeer')
.then(()=>{
    console.log("connected to database successfully")
})
.catch((error)=>{
    console.log({error  :error.message})
})