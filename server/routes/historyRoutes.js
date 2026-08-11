const express = require("express");

const {
  saveAnalysis,
  getHistory,
} = require("../controllers/historyController");

const verifierToken = require("../middleware/authMiddleware");

const router = express.Router();

// Routes protegees : necessitent d'etre connecte
router.post("/", verifierToken, saveAnalysis);
router.get("/", verifierToken, getHistory);

module.exports = router;
