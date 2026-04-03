const express = require("express");
const router = express.Router();
const { createClaim } = require("../controllers/claimController");

router.post("/auto", createClaim);

module.exports = router;