const { Router } = require("express")

const userRouter = Router()

const {registerUser,getAllUsers, updateUser, deleteUser, login } = require("./controllers") 
const { hashPass, comparePass, tokenCheck } = require("../middleware")

userRouter.post("/users/register", hashPass, registerUser)

userRouter.post("/users/login", comparePass, login)

userRouter.get("/users/getusers", tokenCheck, getAllUsers) 

userRouter.get("/users/authcheck", tokenCheck, login)

userRouter.put("/users/updateuser", tokenCheck, updateUser)

userRouter.delete("/users/deleteuser", tokenCheck, deleteUser)


module.exports = userRouter