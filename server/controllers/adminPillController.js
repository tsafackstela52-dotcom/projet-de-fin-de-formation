// ==================================================
// ADMIN - GESTION DES PILULES
// ==================================================

const Pill = require("../models/Pill");

const getAllPillsAdmin = async (req, res) => {
  try {
    const pills = await Pill.find({}).sort({ pillId: 1 });
    res.json({ pills });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const createPill = async (req, res) => {
  try {
    const { pillId, drugId, forme, couleur } = req.body;

    if (!pillId || !drugId || !forme || !couleur) {
      return res
        .status(400)
        .json({
          message: "pillId, drugId, forme et couleur sont obligatoires",
        });
    }

    const existant = await Pill.findOne({ pillId });
    if (existant) {
      return res
        .status(409)
        .json({ message: "Une pilule avec cet identifiant existe déjà" });
    }

    const pill = new Pill(req.body);
    await pill.save();
    res.status(201).json({ message: "Pilule créée", pill });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updatePill = async (req, res) => {
  try {
    const pill = await Pill.findOneAndUpdate(
      { pillId: req.params.id },
      req.body,
      { new: true },
    );

    if (!pill) {
      return res.status(404).json({ message: "Pilule introuvable" });
    }

    res.json({ message: "Pilule mise à jour", pill });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const deletePill = async (req, res) => {
  try {
    const pill = await Pill.findOneAndDelete({ pillId: req.params.id });

    if (!pill) {
      return res.status(404).json({ message: "Pilule introuvable" });
    }

    res.json({ message: "Pilule supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = { getAllPillsAdmin, createPill, updatePill, deletePill };
