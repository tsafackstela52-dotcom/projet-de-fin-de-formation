// ==================================================
// MODELE MONGOOSE - DRUG (MEDICAMENT / COMPLEMENT)
// ==================================================
//
// Contenu INFORMATIF uniquement - pas de posologie
// precise stockee (voir note dans le controleur).

const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  drugId: {
    type: String,
    required: true,
    unique: true,
  },

  name: { type: String, required: true },
  categorie: { type: String, required: true }, // "Médicament" ou "Complément"
  classe: { type: String, default: "" },
  description: { type: String, default: "" },
  usages: { type: [String], default: [] },
  effetsSecondaires: { type: [String], default: [] },
  precautions: { type: [String], default: [] },
  interactionsNotables: { type: [String], default: [] },
  quandConsulter: { type: String, default: "" },
});

module.exports = mongoose.model("Drug", drugSchema);
