// ==================================================
// CONTROLEUR PUBLIC - VERIFICATEUR D'INTERACTIONS
// ==================================================

const DrugInteraction = require("../models/DrugInteraction");
const Drug = require("../models/Drug");

// Verifie les interactions entre une liste de drugId fournie
const checkInteractions = async (req, res) => {
  try {
    const { drugIds } = req.body;

    if (!Array.isArray(drugIds) || drugIds.length < 2) {
      return res.status(400).json({
        message: "Fournissez au moins 2 médicaments à vérifier",
      });
    }

    // On cherche toute interaction ou les 2 medicaments
    // impliques font partie de la liste fournie
    const interactions = await DrugInteraction.find({
      $or: [{ drugIdA: { $in: drugIds }, drugIdB: { $in: drugIds } }],
    });

    // On filtre pour ne garder que les paires reellement
    // toutes les deux presentes dans la selection
    const found = interactions.filter(
      (int) => drugIds.includes(int.drugIdA) && drugIds.includes(int.drugIdB),
    );

    res.json({ interactions: found, count: found.length });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Liste des medicaments disponibles pour le selecteur
const getAvailableDrugs = async (req, res) => {
  try {
    const drugs = await Drug.find({}, "drugId name").sort({ name: 1 });
    res.json({ drugs });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = { checkInteractions, getAvailableDrugs };
