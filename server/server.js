const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const historyRoutes = require("./routes/historyRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes")
const app = express();
const wellbeingRoutes = require("./routes/wellbeingRoutes");
const interactionRoutes = require("./routes/interactionRoutes");
const pillRoutes = require("./routes/pillRoutes");
const drugRoutes = require("./routes/drugRoutes")
const adminRoutes = require("./routes/adminRoutes");
const PORT = 5000;

// ==================================================
// CONNEXION MONGODB
// ==================================================

const MONGO_URI = "mongodb://127.0.0.1:27017/medical_assistant";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error.message);
  });

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/analysis", analysisRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wellbeing", wellbeingRoutes);
app.use("/api/drugs", drugRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pills", pillRoutes);
app.use("/api/interactions", interactionRoutes);
// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "Medical Assistant API fonctionne",
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
