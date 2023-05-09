const Wishlist = require("./model")

const addWishlist = async(req, res) => {
	try {
		const wishlists = await Wishlist.create({
			steamAppID: req.body.steamAppID,
            UserId: req.authUser.dataValues.id
		})
		res.status(201).json({
			message: "success",
			wishlists: {UserId: currentUserId, steamAppID: req.body.steamAppID}})
	}
	catch (error) {
		res.status(501).json({message: "error", error: error})
	}
}

const deleteWishlist = async (req, res) => {
	try {
		const wishlists = await Wishlist.destroy({
			where: {
				id: req.authUser.dataValues.id,
			}
		})
		console.log(todos)
		if (wishlists == 0) {
			res.status(404).json({message: "item not found"})
		}
		else {
			res.status(204).json({message:"success"})
		}
	}
	catch (error) {
		res.status(501).json({message: "error", error: error})
	}
}

const getWishlist = async (req, res) => {
	console.log(currentID)
	try {
		const wishlists = await Data.findAll({
			where: {UserId : req.authUser.dataValues.id}
		});
		res.status(201).json({message:"success",wishlists:wishlists})
	
	}
	catch (error) {
		console.log(error)
	}
}

module.exports = {addWishlist, deleteWishlist, getWishlist}