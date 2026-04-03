const express = require("express");
const router = express.Router();
const { selectPolicy } = require("../controllers/policyController");

router.post("/select", selectPolicy);

module.exports = router;