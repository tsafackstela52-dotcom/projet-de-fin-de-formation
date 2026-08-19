const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const historyRoutes = require("./routes/historyRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const wellbeingRoutes = require("./routes/wellbeingRoutes");
const interactionRoutes = require("./routes/interactionRoutes");
const pillRoutes = require("./routes/pillRoutes");
const drugRoutes = require("./routes/drugRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Utilisation du PORT dynamique de Render ou 5000 en local
const PORT = process.env.PORT || 5000;

// ==================================================
// CONNEXION MONGODB
// ==================================================
// Récupère l'URL cloud en production ou fallback en local
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/medical_assistant";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error.message);
  });

// Middlewares
app.use(
  cors({
    origin: [
      "https://front-end-theta-three-58.vercel.app", // ⚠️ Sans le slash '/' à la fin !
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
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
  console.log(`Serveur lancé sur le port ${PORT}`);
});
