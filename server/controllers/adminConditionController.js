// ==================================================
// ADMIN - GESTION DES MALADIES (CONDITIONS)
// ==================================================

const Condition = require("../models/Condition");

const getAllConditions = async (req, res) => {
  try {
    const conditions = await Condition.find({}).sort({ name: 1 });
    res.json({ conditions });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const createCondition = async (req, res) => {
  try {
    const {
      conditionId,
      name,
      description,
      symptoms,
      recommendation,
      whenToConsult,
      warning,
    } = req.body;

    if (!conditionId || !name) {
      return res
        .status(400)
        .json({ message: "conditionId et name sont obligatoires" });
    }

    const existante = await Condition.findOne({ conditionId });
    if (existante) {
      return res
        .status(409)
        .json({ message: "Une maladie avec cet identifiant existe déjà" });
    }

    const condition = new Condition({
      conditionId,
      name,
      description,
      symptoms,
      recommendation,
      whenToConsult,
      warning,
    });

    await condition.save();
    res.status(201).json({ message: "Maladie créée", condition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateCondition = async (req, res) => {
  try {
    const condition = await Condition.findOneAndUpdate(
      { conditionId: req.params.id },
      req.body,
      { new: true },
    );

    if (!condition) {
      return res.status(404).json({ message: "Maladie introuvable" });
    }

    res.json({ message: "Maladie mise à jour", condition });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const deleteCondition = async (req, res) => {
  try {
    const condition = await Condition.findOneAndDelete({
      conditionId: req.params.id,
    });

    if (!condition) {
      return res.status(404).json({ message: "Maladie introuvable" });
    }

    res.json({ message: "Maladie supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = {
  getAllConditions,
  createCondition,
  updateCondition,
  deleteCondition,
};
