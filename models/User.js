const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  platform: String
});

module.exports = mongoose.model("User", userSchema);