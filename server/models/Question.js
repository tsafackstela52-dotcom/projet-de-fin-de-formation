// ==================================================
// MODELE MONGOOSE - QUESTION
// ==================================================

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
    unique: true,
  },

  question: { type: String, required: true },
  symptom: { type: String, required: true },
  conditions: { type: [String], default: [] },
});

module.exports = mongoose.model("Question", questionSchema);
