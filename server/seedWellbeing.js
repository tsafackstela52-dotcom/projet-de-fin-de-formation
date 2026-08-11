// ==================================================
// SCRIPT DE MIGRATION - BIEN-ETRE -> MONGODB
// ==================================================
//
// A executer UNE SEULE FOIS :
//   node seedWellbeing.js

const mongoose = require("mongoose");

const WellbeingArticle = require("./models/WellbeingArticle");
const wellbeingData = require("./wellbeingSeedData");

const MONGO_URI = "mongodb://127.0.0.1:27017/medical_assistant";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");

    await WellbeingArticle.deleteMany({});
    await WellbeingArticle.insertMany(wellbeingData);

    console.log(`${wellbeingData.length} articles migrés`);
    console.log("Migration terminée avec succès !");

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la migration :", error);
    process.exit(1);
  }
}

seed();
