const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  username: String,
  cartList: Array
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };