// ==================================================
// ADMIN - GESTION DES ARTICLES BIEN-ETRE
// ==================================================

const WellbeingArticle = require("../models/WellbeingArticle");

const getAllArticlesAdmin = async (req, res) => {
  try {
    const articles = await WellbeingArticle.find({}).sort({
      categorie: 1,
      title: 1,
    });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const createArticle = async (req, res) => {
  try {
    const { articleId, title, categorie } = req.body;

    if (!articleId || !title || !categorie) {
      return res
        .status(400)
        .json({ message: "articleId, title et categorie sont obligatoires" });
    }

    const existant = await WellbeingArticle.findOne({ articleId });
    if (existant) {
      return res
        .status(409)
        .json({ message: "Un article avec cet identifiant existe déjà" });
    }

    const article = new WellbeingArticle(req.body);
    await article.save();
    res.status(201).json({ message: "Article créé", article });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await WellbeingArticle.findOneAndUpdate(
      { articleId: req.params.id },
      req.body,
      { new: true },
    );

    if (!article) {
      return res.status(404).json({ message: "Article introuvable" });
    }

    res.json({ message: "Article mis à jour", article });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await WellbeingArticle.findOneAndDelete({
      articleId: req.params.id,
    });

    if (!article) {
      return res.status(404).json({ message: "Article introuvable" });
    }

    res.json({ message: "Article supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = {
  getAllArticlesAdmin,
  createArticle,
  updateArticle,
  deleteArticle,
};
