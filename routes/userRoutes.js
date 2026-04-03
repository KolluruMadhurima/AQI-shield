const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, location, platform } = req.body;

    const user = new User({
      name,
      location,
      platform
    });

    await user.save();

    res.json({
      message: "User Registered",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;