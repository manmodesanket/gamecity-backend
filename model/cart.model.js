const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  username: String,
  cartList: [String]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };