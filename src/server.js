require("dotenv").config()
const express = require("express")
const cors = require("cors")

const User = require("./users/model");

const port = process.env.PORT || 5001

const userRouter = require("./users/routes");

const app = express()
app.use(cors())

app.use(express.json())
app.use(userRouter);

const syncTables = () => {
    User.sync()
}

app.get("/health", (req, res) => {
    res.status(200).json({message: "api is working"})
})

app.listen(port, () => {
    syncTables()
    console.log(`server is running on port ${port}`)
})