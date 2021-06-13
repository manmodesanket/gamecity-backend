const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = { Auth };