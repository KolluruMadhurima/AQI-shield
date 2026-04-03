function calculatePremium(plan, aqi) {
  let basePremium = 0;

  if (plan === "Basic") basePremium = 20;
  if (plan === "Standard") basePremium = 35;
  if (plan === "Premium") basePremium = 50;

  let finalPremium = basePremium;

  if (aqi > 400) finalPremium += 10;
  else if (aqi > 300) finalPremium += 5;
  else finalPremium -= 2;

  return { basePremium, finalPremium };
}

module.exports = { calculatePremium };