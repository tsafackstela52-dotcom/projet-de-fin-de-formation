// ==================================================
// CONTROLEUR PUBLIC - IDENTIFICATION DE PILULES
// ==================================================

const Pill = require("../models/Pill");
const Drug = require("../models/Drug");

// Recherche par criteres (forme, couleur, texte inscrit)
const searchPills = async (req, res) => {
  try {
    const { forme, couleur, imprint } = req.query;

    const filtre = {};
    if (forme) filtre.forme = new RegExp(forme, "i");
    if (couleur) filtre.couleur = new RegExp(couleur, "i");
    if (imprint) filtre.imprint = new RegExp(imprint, "i");

    const pills = await Pill.find(filtre);

    // On enrichit chaque resultat avec le nom du medicament lie
    const results = await Promise.all(
      pills.map(async (pill) => {
        const drug = await Drug.findOne({ drugId: pill.drugId });
        return {
          pillId: pill.pillId,
          imprint: pill.imprint,
          forme: pill.forme,
          couleur: pill.couleur,
          dosageInscrit: pill.dosageInscrit,
          drugId: pill.drugId,
          drugName: drug ? drug.name : "Inconnu",
        };
      }),
    );

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const getPillOptions = async (req, res) => {
  try {
    const formes = await Pill.distinct("forme");
    const couleurs = await Pill.distinct("couleur");
    res.json({ formes, couleurs });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = { searchPills, getPillOptions };
