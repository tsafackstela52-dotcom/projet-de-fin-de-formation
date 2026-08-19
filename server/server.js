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
// CONNEXION MONGODB (via config/db.js)
// ==================================================
const connectDB = require("./config/db");

// Démarre la connexion à la base puis l'application
connectDB()
  .then(() => {
    console.log("Démarrage du serveur après connexion DB réussie...");

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Impossible de démarrer le serveur: erreur de connexion DB", err.message);
    process.exit(1);
  });

// Middlewares
app.use(
  cors({
    origin: [
      "https://front-end-theta-three-58.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175", // ← ajoute le port réellement utilisé
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

// Note: l'appel à `app.listen` est effectué après connexion DB
