const Question = require("../models/Question");

const { detectSymptoms } = require("../services/symptomDetector");
const {
  calculateResults,
  getConfidenceMessage,
} = require("../services/diagnosisEngine");
const { findAlerts } = require("../services/alertEngine");
const { findNextQuestion } = require("../services/questionEngine");

// ==================================================
// ANALYSE INITIALE
// ==================================================

const startAnalysis = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        message: "La description est obligatoire",
      });
    }

    const detectedSymptoms = await detectSymptoms(description);

    const answeredQuestions = [];

    const alerts = findAlerts(detectedSymptoms);

    const results = await calculateResults(detectedSymptoms);

    const confidenceMessage = getConfidenceMessage(results);

    const nextQuestion = await findNextQuestion(
      detectedSymptoms,
      results,
      answeredQuestions,
    );

    res.json({
      message: "Analyse effectuée",
      description: description,
      symptoms: detectedSymptoms,
      alerts: alerts,
      results: results,
      confidenceMessage: confidenceMessage,
      nextQuestion: nextQuestion,
      answeredQuestions: answeredQuestions,
    });
  } catch (error) {
    console.error("Erreur dans startAnalysis :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

// ==================================================
// RÉPONDRE À UNE QUESTION
// ==================================================

const answerQuestion = async (req, res) => {
  try {
    const { symptoms, questionId, answer, answeredQuestions } = req.body;

    if (!questionId || answer === undefined) {
      return res.status(400).json({
        message: "La question et la réponse sont obligatoires",
      });
    }

    // Rechercher la question dans MongoDB
    const question = await Question.findOne({ questionId });

    if (!question) {
      const questionsDisponibles = await Question.find({}, "questionId");

      return res.status(404).json({
        message: "Question introuvable",
        questionId: questionId,
        questionsDisponibles: questionsDisponibles.map((q) => q.questionId),
      });
    }

    const updatedSymptoms = [...(symptoms || [])];
    const updatedAnsweredQuestions = [...(answeredQuestions || [])];

    if (!updatedAnsweredQuestions.includes(questionId)) {
      updatedAnsweredQuestions.push(questionId);
    }

    if (answer === true && !updatedSymptoms.includes(question.symptom)) {
      updatedSymptoms.push(question.symptom);
    }

    const alerts = findAlerts(updatedSymptoms);

    const results = await calculateResults(updatedSymptoms);

    const confidenceMessage = getConfidenceMessage(results);

    const nextQuestion = await findNextQuestion(
      updatedSymptoms,
      results,
      updatedAnsweredQuestions,
    );

    res.json({
      message: "Réponse enregistrée",
      alerts: alerts,
      symptoms: updatedSymptoms,
      results: results,
      confidenceMessage: confidenceMessage,
      nextQuestion: nextQuestion,
      answeredQuestions: updatedAnsweredQuestions,
    });
  } catch (error) {
    console.error("Erreur dans answerQuestion :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

module.exports = {
  startAnalysis,
  answerQuestion,
};
