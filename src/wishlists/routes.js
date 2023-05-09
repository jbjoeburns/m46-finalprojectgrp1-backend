const { Router } = require("express")

const wishlistRouter = Router()

const {addWishlist, deleteWishlist, getWishlist} = require("./controllers") 
const {tokenCheck} = require("../middleware")

wishlistRouter.post("/wishlists/addwishlist", tokenCheck, addWishlist)

wishlistRouter.delete("/wishlists/deletewishlist", tokenCheck, deleteWishlist)

wishlistRouter.get("/wishlists/getwishlist", tokenCheck, getWishlist)


module.exports = wishlistRouter