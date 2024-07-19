const express = require('express')

const userRouter = express.Router()

const { createUser,loginuser } = require('../controller/userController')


userRouter.post ('/createEmp',createUser)

userRouter.post('/loginEmp',loginuser)


module.exports = userRouter