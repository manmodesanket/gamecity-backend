const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  publisher: String,
  rating: Number,
  price: Number,
  platform: Number,
  category: Number,
  stock: Number,
  newRelease: Boolean,
  trending: Boolean
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product }