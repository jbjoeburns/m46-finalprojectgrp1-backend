const User = require("../users/model") 
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const saltRounds = process.env.SALT_ROUNDS

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({where: {username: req.body.username}})      

        if (req.user === null) {
            throw new Error ("Password or Username does not match")
        }
        const comparePassword = await bcrypt.compare(req.body.password, req.user.password)
        if(!comparePassword){
            throw new Error ("Password or Username does not match")
        } 
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const tokenCheck = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            throw new Error("No header or token passed in the request")
        }
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({where: {id: decodedToken.id}})
        if(!user){
            throw new Error("User is not authorised")
        }
        req.authUser = user
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

module.exports = {
    hashPass,
    comparePass,
    tokenCheck
}