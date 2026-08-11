// ==================================================
// SCRIPT DE MIGRATION - INTERACTIONS -> MONGODB
// ==================================================
//
// A executer UNE SEULE FOIS :
//   node seedInteractions.js

const mongoose = require("mongoose");

const DrugInteraction = require("./models/DrugInteraction");
const interactionsData = require("./interactionsSeedData");

const MONGO_URI = "mongodb://127.0.0.1:27017/medical_assistant";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");

    await DrugInteraction.deleteMany({});
    await DrugInteraction.insertMany(interactionsData);

    console.log(`${interactionsData.length} interactions migrées`);
    console.log("Migration terminée avec succès !");

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la migration :", error);
    process.exit(1);
  }
}

seed();
