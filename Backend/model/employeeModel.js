const mongoose = require ('mongoose')

const employeeScchema =  new mongoose.Schema({
    fullName :{
        type:String,
        required:true,
        trim:true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    employeerId:{
        type:Number,
        required:true
    },
    doj:{
        type:Date,
        required:true
    },
    role:{
        type:Date,
        enum:[employee,employeer],
        required:true
    },
    

})