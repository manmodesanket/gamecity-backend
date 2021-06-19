const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  username: String,
  wishlist: [String]
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = { Wishlist };