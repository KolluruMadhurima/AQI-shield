const Claim = require("../models/Claim");
const { getAQI } = require("../services/aqiService");
const { checkTrigger } = require("../services/triggerService");

const createClaim = async (req, res) => {
  try {
    const { userId, location } = req.body;

    // ✅ 1. Basic validation
    if (!userId || !location) {
      return res.status(400).json({
        message: "Invalid request: userId and location required"
      });
    }

    // ✅ 2. Get AQI
    const aqi = getAQI(location);

    // ✅ 3. Fraud check (important for hackathon)
    if (aqi < 300) {
      return res.json({
        message: "Claim rejected - AQI not hazardous",
        aqi
      });
    }

    // ✅ 4. Trigger logic
    const trigger = checkTrigger(aqi);

    if (trigger.type === "SAFE") {
      return res.json({
        message: "No claim triggered",
        aqi
      });
    }

    // ✅ 5. Create claim
    const claim = new Claim({
      userId,
      aqi,
      amount: trigger.amount,
      status: "APPROVED"
    });

    await claim.save();

    // ✅ 6. Response
    res.json({
      message: "Claim Auto-Triggered",
      triggerType: trigger.type,
      aqi,
      payout: trigger.amount,
      claim
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createClaim };