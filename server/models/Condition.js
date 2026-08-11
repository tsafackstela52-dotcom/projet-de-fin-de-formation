// ==================================================
// MODELE MONGOOSE - CONDITION (MALADIE)
// ==================================================

const mongoose = require("mongoose");

const conditionSymptomSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    weight: { type: Number, required: true },
  },
  { _id: false },
);

const conditionSchema = new mongoose.Schema({
  conditionId: {
    type: String,
    required: true,
    unique: true,
  },

  name: { type: String, required: true },
  description: { type: String, default: "" },
  symptoms: { type: [conditionSymptomSchema], default: [] },
  recommendation: { type: String, default: "" },
  whenToConsult: { type: String, default: "" },
  warning: { type: String, default: "" },
});

module.exports = mongoose.model("Condition", conditionSchema);
