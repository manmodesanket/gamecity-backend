const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  username: String,
  cartList: [Object]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };