// ==================================================
// CONTROLEUR - HISTORIQUE DES ANALYSES
// ==================================================
//
// Ces routes sont protegees par authMiddleware :
// req.userId est deja disponible (utilisateur connecte).

const Analysis = require("../models/Analysis");

// ==================================================
// SAUVEGARDER UNE ANALYSE
// ==================================================

const saveAnalysis = async (req, res) => {
  try {
    const { description, symptoms, results, confidenceMessage, alerts } =
      req.body;

    if (!description) {
      return res.status(400).json({
        message: "La description est obligatoire",
      });
    }

    const analysis = new Analysis({
      userId: req.userId,
      description,
      symptoms,
      results,
      confidenceMessage,
      alerts,
    });

    await analysis.save();

    res.status(201).json({
      message: "Analyse enregistrée",
      analysis,
    });
  } catch (error) {
    console.error("Erreur dans saveAnalysis :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

// ==================================================
// RECUPERER L'HISTORIQUE DE L'UTILISATEUR CONNECTE
// ==================================================

const getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json({
      message: "Historique récupéré",
      history,
    });
  } catch (error) {
    console.error("Erreur dans getHistory :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

module.exports = {
  saveAnalysis,
  getHistory,
};
