// ==================================================
// ADMIN - GESTION DES MEDICAMENTS
// ==================================================

const Drug = require("../models/Drug");

const getAllDrugsAdmin = async (req, res) => {
  try {
    const drugs = await Drug.find({}).sort({ name: 1 });
    res.json({ drugs });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const createDrug = async (req, res) => {
  try {
    const { drugId, name, categorie } = req.body;

    if (!drugId || !name || !categorie) {
      return res
        .status(400)
        .json({ message: "drugId, name et categorie sont obligatoires" });
    }

    const existant = await Drug.findOne({ drugId });
    if (existant) {
      return res
        .status(409)
        .json({ message: "Un médicament avec cet identifiant existe déjà" });
    }

    const drug = new Drug(req.body);
    await drug.save();
    res.status(201).json({ message: "Médicament créé", drug });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateDrug = async (req, res) => {
  try {
    const drug = await Drug.findOneAndUpdate(
      { drugId: req.params.id },
      req.body,
      { new: true },
    );

    if (!drug) {
      return res.status(404).json({ message: "Médicament introuvable" });
    }

    res.json({ message: "Médicament mis à jour", drug });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const deleteDrug = async (req, res) => {
  try {
    const drug = await Drug.findOneAndDelete({ drugId: req.params.id });

    if (!drug) {
      return res.status(404).json({ message: "Médicament introuvable" });
    }

    res.json({ message: "Médicament supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = { getAllDrugsAdmin, createDrug, updateDrug, deleteDrug };
