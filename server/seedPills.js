// ==================================================
// SCRIPT DE MIGRATION - PILULES -> MONGODB
// ==================================================
//
// A executer UNE SEULE FOIS :
//   node seedPills.js

const mongoose = require("mongoose");

const Pill = require("./models/Pill");
const pillsData = require("./pillsSeedData");

const MONGO_URI = "mongodb://127.0.0.1:27017/medical_assistant";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");

    await Pill.deleteMany({});
    await Pill.insertMany(pillsData);

    console.log(`${pillsData.length} pilules migrées`);
    console.log("Migration terminée avec succès !");

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la migration :", error);
    process.exit(1);
  }
}

seed();
