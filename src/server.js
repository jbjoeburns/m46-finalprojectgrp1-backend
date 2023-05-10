require("dotenv").config()
const express = require("express")
const cors = require("cors")

const User = require("./users/model");
const Wishlist = require("./wishlists/model");

const port = process.env.PORT || 5001

const userRouter = require("./users/routes");
const wishlistRouter = require("./wishlists/routes");

const app = express()
app.use(cors())

app.use(express.json())

const syncTables = () => {
    User.hasMany(Wishlist)
    Wishlist.belongsTo(User)
    Wishlist.sync({alter: true})
    User.sync()
}

app.use(userRouter);
app.use(wishlistRouter);

app.get("/health", (req, res) => {
    res.status(200).json({message: "api is working"})
})

app.listen(port, () => {
    syncTables()
    console.log(`server is running on port ${port}`)
})
