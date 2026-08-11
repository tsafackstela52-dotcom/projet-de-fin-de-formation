// ==================================================
// MODELE MONGOOSE - PILL (IDENTIFICATION)
// ==================================================
//
// Outil pedagogique de recherche par caracteristiques
// physiques - ne remplace pas une identification
// pharmaceutique certifiee.

const mongoose = require("mongoose");

const pillSchema = new mongoose.Schema({
  pillId: {
    type: String,
    required: true,
    unique: true,
  },

  drugId: {
    type: String,
    required: true, // reference vers Drug.drugId
  },

  imprint: { type: String, default: "" }, // texte inscrit sur la pilule
  forme: { type: String, required: true }, // ronde, ovale, oblongue...
  couleur: { type: String, required: true },
  dosageInscrit: { type: String, default: "" }, // ex: "500 mg" - info d'identification uniquement
});

module.exports = mongoose.model("Pill", pillSchema);
