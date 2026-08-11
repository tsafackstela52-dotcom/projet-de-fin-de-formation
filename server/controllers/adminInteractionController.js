// ==================================================
// ADMIN - GESTION DES INTERACTIONS
// ==================================================

const DrugInteraction = require("../models/DrugInteraction");

const getAllInteractionsAdmin = async (req, res) => {
  try {
    const interactions = await DrugInteraction.find({}).sort({
      interactionId: 1,
    });
    res.json({ interactions });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const createInteraction = async (req, res) => {
  try {
    const { interactionId, drugIdA, drugIdB, gravite, description } = req.body;

    if (!interactionId || !drugIdA || !drugIdB || !gravite || !description) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const existante = await DrugInteraction.findOne({ interactionId });
    if (existante) {
      return res
        .status(409)
        .json({ message: "Une interaction avec cet identifiant existe déjà" });
    }

    const interaction = new DrugInteraction(req.body);
    await interaction.save();
    res.status(201).json({ message: "Interaction créée", interaction });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateInteraction = async (req, res) => {
  try {
    const interaction = await DrugInteraction.findOneAndUpdate(
      { interactionId: req.params.id },
      req.body,
      { new: true },
    );

    if (!interaction) {
      return res.status(404).json({ message: "Interaction introuvable" });
    }

    res.json({ message: "Interaction mise à jour", interaction });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const deleteInteraction = async (req, res) => {
  try {
    const interaction = await DrugInteraction.findOneAndDelete({
      interactionId: req.params.id,
    });

    if (!interaction) {
      return res.status(404).json({ message: "Interaction introuvable" });
    }

    res.json({ message: "Interaction supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = {
  getAllInteractionsAdmin,
  createInteraction,
  updateInteraction,
  deleteInteraction,
};
