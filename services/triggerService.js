function checkTrigger(aqi) {
  if (aqi > 400) return { type: "FULL", amount: 700 };
  if (aqi > 350) return { type: "PARTIAL", amount: 400 };
  if (aqi > 300) return { type: "ALERT", amount: 0 };
  return { type: "SAFE", amount: 0 };
}

module.exports = { checkTrigger };