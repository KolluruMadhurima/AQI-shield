const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  userId: String,
  aqi: Number,
  amount: Number,
  status: String
});

module.exports = mongoose.model("Claim", claimSchema);