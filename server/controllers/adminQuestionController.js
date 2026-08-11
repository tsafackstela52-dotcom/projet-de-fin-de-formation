// ==================================================
// ADMIN - GESTION DES QUESTIONS
// ==================================================

const Question = require("../models/Question");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).sort({ questionId: 1 });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const createQuestion = async (req, res) => {
  try {
    const { questionId, question, symptom, conditions } = req.body;

    if (!questionId || !question || !symptom) {
      return res
        .status(400)
        .json({ message: "questionId, question et symptom sont obligatoires" });
    }

    const existante = await Question.findOne({ questionId });
    if (existante) {
      return res
        .status(409)
        .json({ message: "Une question avec cet identifiant existe déjà" });
    }

    const nouvelleQuestion = new Question({
      questionId,
      question,
      symptom,
      conditions,
    });
    await nouvelleQuestion.save();
    res
      .status(201)
      .json({ message: "Question créée", question: nouvelleQuestion });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { questionId: req.params.id },
      req.body,
      { new: true },
    );

    if (!question) {
      return res.status(404).json({ message: "Question introuvable" });
    }

    res.json({ message: "Question mise à jour", question });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({
      questionId: req.params.id,
    });

    if (!question) {
      return res.status(404).json({ message: "Question introuvable" });
    }

    res.json({ message: "Question supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
