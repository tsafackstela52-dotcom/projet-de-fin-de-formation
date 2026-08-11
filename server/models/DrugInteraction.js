// ==================================================
// MODELE MONGOOSE - DRUG INTERACTION
// ==================================================
//
// Base curee d'interactions courantes - pas exhaustive.
// Chaque entree relie deux medicaments (drugId de Drug)
// et decrit le risque en langage clair.

const mongoose = require("mongoose");

const drugInteractionSchema = new mongoose.Schema({
  interactionId: {
    type: String,
    required: true,
    unique: true,
  },

  drugIdA: { type: String, required: true },
  drugIdB: { type: String, required: true },

  gravite: {
    type: String,
    enum: ["mineure", "moderee", "majeure"],
    required: true,
  },

  description: { type: String, required: true },
  conduite: { type: String, default: "" },
});

module.exports = mongoose.model("DrugInteraction", drugInteractionSchema);