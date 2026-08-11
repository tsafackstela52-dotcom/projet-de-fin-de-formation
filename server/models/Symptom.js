// ==================================================
// MODELE MONGOOSE - SYMPTOM
// ==================================================

const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  symptomId: {
    type: String,
    required: true,
    unique: true,
  },

  keywords: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Symptom", symptomSchema);
