// ==================================================
// MODELE MONGOOSE - WELLBEING ARTICLE
// ==================================================

const mongoose = require("mongoose");

const wellbeingArticleSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
    unique: true,
  },

  title: { type: String, required: true },
  categorie: {
    type: String,
    enum: ["sommeil", "nutrition", "stress", "activite_physique"],
    required: true,
  },
  resume: { type: String, default: "" },
  conseils: { type: [String], default: [] },
});

module.exports = mongoose.model("WellbeingArticle", wellbeingArticleSchema);
