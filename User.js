const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  rank: Number,
  username: String,
  owner: String,
  followers: Number,
  occupation: String
});

const User = mongoose.model('User', userSchema)

module.exports = User;