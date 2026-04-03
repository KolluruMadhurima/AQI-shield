require("dotenv").config({ path: ".env" });
console.log("ENV VALUE:", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin@cluster0.zmmjjyx.mongodb.net/aqiShield")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("AQI Shield API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const policyRoutes = require("./routes/policyRoutes");
app.use("/api/policy", policyRoutes);

const claimRoutes = require("./routes/claimRoutes");
app.use("/api/claim", claimRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);