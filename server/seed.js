// ==================================================
// SCRIPT DE MIGRATION - FICHIERS STATIQUES -> MONGODB
// ==================================================
//
// A executer UNE SEULE FOIS (ou a chaque fois que vous
// voulez reinitialiser la base depuis les fichiers) :
//
//   node seed.js
//
// Lit data/symptoms.js, data/conditions.js, data/questions.js
// et les insere dans MongoDB via les modeles Mongoose.

const mongoose = require("mongoose");

const Symptom = require("./models/Symptom");
const Condition = require("./models/Condition");
const Question = require("./models/Question");

const symptomsData = require("./data/symptoms");
const conditionsData = require("./data/conditions");
const questionsData = require("./data/questions");

const MONGO_URI = "mongodb://127.0.0.1:27017/medical_assistant";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");

    // ==================================================
    // SYMPTOMES
    // ==================================================

    await Symptom.deleteMany({});

    const symptomsDocs = symptomsData.map((s) => ({
      symptomId: s.id,
      keywords: s.keywords,
    }));

    await Symptom.insertMany(symptomsDocs);
    console.log(`${symptomsDocs.length} symptômes migrés`);

    // ==================================================
    // CONDITIONS (MALADIES)
    // ==================================================

    await Condition.deleteMany({});

    const conditionsDocs = conditionsData.map((c) => ({
      conditionId: c.id,
      name: c.name,
      description: c.description,
      symptoms: c.symptoms,
      recommendation: c.recommendation,
      whenToConsult: c.whenToConsult,
      warning: c.warning,
    }));

    await Condition.insertMany(conditionsDocs);
    console.log(`${conditionsDocs.length} conditions migrées`);

    // ==================================================
    // QUESTIONS
    // ==================================================

    await Question.deleteMany({});

    const questionsDocs = questionsData.map((q) => ({
      questionId: q.id,
      question: q.question,
      symptom: q.symptom,
      conditions: q.conditions,
    }));

    await Question.insertMany(questionsDocs);
    console.log(`${questionsDocs.length} questions migrées`);

    console.log("Migration terminée avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la migration :", error);
    process.exit(1);
  }
}

seed();
