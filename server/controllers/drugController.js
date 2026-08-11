// ==================================================
// CONTROLEUR PUBLIC - MEDICAMENTS & COMPLEMENTS
// ==================================================

const Drug = require("../models/Drug");

const getAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.find({}).sort({ name: 1 });
    res.json({ drugs });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const getDrugById = async (req, res) => {
  try {
    const drug = await Drug.findOne({ drugId: req.params.id });

    if (!drug) {
      return res.status(404).json({ message: "Médicament introuvable" });
    }

    res.json({ drug });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = { getAllDrugs, getDrugById };
