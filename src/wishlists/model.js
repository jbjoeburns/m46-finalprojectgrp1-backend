const {DataTypes} = require("sequelize")
const connection = require("../db/connection")

const Wishlist = connection.define("Wishlist", {
    steamAppID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},)

module.exports = Wishlist