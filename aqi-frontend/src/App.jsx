import { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [policy, setPolicy] = useState(null);
  const [claim, setClaim] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    platform: "",
    plan: "Standard"
  });

  // REGISTER
  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setUser(data.user);
  };

  // POLICY
  const handlePolicy = async () => {
    const res = await fetch("http://localhost:5000/api/policy/select", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user._id,
        plan: form.plan,
        location: form.location
      })
    });

    const data = await res.json();
    setPolicy(data);
  };

  // CLAIM
  const handleClaim = async () => {
    const res = await fetch("http://localhost:5000/api/claim/auto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user._id,
        location: form.location
      })
    });

    const data = await res.json();
    setClaim(data);
  };

  // AQI color logic
  const getAQIColor = (aqi) => {
    if (!aqi) return "#94a3b8";
    if (aqi > 400) return "#ef4444";
    if (aqi > 350) return "#f97316";
    if (aqi > 300) return "#facc15";
    return "#22c55e";
  };

  return (
    <div className="app">
      <h1>AQI Shield Dashboard</h1>

      <div className="grid">

        {/* REGISTER */}
        <div className="card">
          <h2>Register Worker</h2>

          <input placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input placeholder="Location"
            onChange={(e) => setForm({ ...form, location: e.target.value })} />

          <input placeholder="Platform (Swiggy/Zomato)"
            onChange={(e) => setForm({ ...form, platform: e.target.value })} />

          <button onClick={handleRegister}>Register</button>

          {user._id && <p className="success">✔ Registered</p>}
        </div>

        {/* POLICY */}
        <div className="card">
          <h2>Select Policy</h2>

          <select onChange={(e) => setForm({ ...form, plan: e.target.value })}>
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>

          <button onClick={handlePolicy} disabled={!user._id}>
            Calculate Premium
          </button>

          {policy && (
            <div className="result-box">
              <p style={{ color: getAQIColor(policy.aqi) }}>
                AQI: {policy.aqi}
              </p>
              <p>Premium: ₹{policy.finalPremium}</p>
            </div>
          )}
        </div>

        {/* CLAIM */}
        <div className="card">
          <h2>Auto Claim</h2>

          <button onClick={handleClaim} disabled={!user._id}>
            Trigger Claim
          </button>

          {claim && (
            <div className="result-box">
              <p>{claim.message}</p>
              <p style={{ color: getAQIColor(claim.aqi) }}>
                AQI: {claim.aqi}
              </p>

              {claim.payout > 0 && (
                <p className="payout">₹{claim.payout} credited</p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;