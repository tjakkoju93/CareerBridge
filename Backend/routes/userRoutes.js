const express = require('express')

const userRouter = express.Router()

const { createUser,loginuser,updateUser } = require('../controller/userController')
// const authUser = require('../middleware/authmiddleware')


userRouter.post ('/createEmp',createUser)

userRouter.post('/loginEmp',loginuser)

userRouter.patch('./updateEmp',updateUser)
userRouter.patch('./update',updateUser)


module.exports = userRouter