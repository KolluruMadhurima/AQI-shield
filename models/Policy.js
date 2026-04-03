const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  userId: String,
  plan: String,
  basePremium: Number,
  finalPremium: Number
});

module.exports = mongoose.model("Policy", policySchema);