// ==================================================
// MODELE MONGOOSE - ANALYSIS
// ==================================================
//
// Represente une analyse de symptomes sauvegardee,
// liee a un compte utilisateur (userId).

const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  symptoms: {
    type: [String],
    default: [],
  },

  results: {
    type: Array,
    default: [],
  },

  confidenceMessage: {
    type: String,
    default: "",
  },

  alerts: {
    type: Array,
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Analysis", analysisSchema);
