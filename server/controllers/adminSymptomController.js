// ==================================================
// ADMIN - GESTION DES SYMPTOMES
// ==================================================

const Symptom = require("../models/Symptom");

const getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({}).sort({ symptomId: 1 });
    res.json({ symptoms });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const createSymptom = async (req, res) => {
  try {
    const { symptomId, keywords } = req.body;

    if (!symptomId || !keywords || keywords.length === 0) {
      return res
        .status(400)
        .json({
          message: "symptomId et au moins un mot-clé sont obligatoires",
        });
    }

    const existant = await Symptom.findOne({ symptomId });
    if (existant) {
      return res
        .status(409)
        .json({ message: "Un symptôme avec cet identifiant existe déjà" });
    }

    const symptom = new Symptom({ symptomId, keywords });
    await symptom.save();
    res.status(201).json({ message: "Symptôme créé", symptom });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findOneAndUpdate(
      { symptomId: req.params.id },
      req.body,
      { new: true },
    );

    if (!symptom) {
      return res.status(404).json({ message: "Symptôme introuvable" });
    }

    res.json({ message: "Symptôme mis à jour", symptom });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const deleteSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findOneAndDelete({
      symptomId: req.params.id,
    });

    if (!symptom) {
      return res.status(404).json({ message: "Symptôme introuvable" });
    }

    res.json({ message: "Symptôme supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = {
  getAllSymptoms,
  createSymptom,
  updateSymptom,
  deleteSymptom,
};
