// ==================================================
// CONTROLEUR PUBLIC - BIEN-ETRE
// ==================================================

const WellbeingArticle = require("../models/WellbeingArticle");

const getAllArticles = async (req, res) => {
  try {
    const { categorie } = req.query;
    const filtre = categorie ? { categorie } : {};
    const articles = await WellbeingArticle.find(filtre).sort({ title: 1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await WellbeingArticle.findOne({
      articleId: req.params.id,
    });

    if (!article) {
      return res.status(404).json({ message: "Article introuvable" });
    }

    res.json({ article });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = { getAllArticles, getArticleById };
