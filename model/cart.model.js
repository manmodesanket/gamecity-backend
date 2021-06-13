const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  username: String,
  cartList: [Number]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };