const Policy = require("../models/Policy");
const { calculatePremium } = require("../services/premiumService");
const { getAQI } = require("../services/aqiService");

const selectPolicy = async (req, res) => {
  try {
    const { userId, plan, location } = req.body;

    const aqi = getAQI(location);

    const { basePremium, finalPremium } = calculatePremium(plan, aqi);

    const policy = new Policy({
      userId,
      plan,
      basePremium,
      finalPremium
    });

    await policy.save();

    res.json({
      message: "Policy Selected",
      aqi,
      basePremium,
      finalPremium,
      policy
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { selectPolicy };