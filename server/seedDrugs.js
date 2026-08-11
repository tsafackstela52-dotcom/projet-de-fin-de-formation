// ==================================================
// SCRIPT DE MIGRATION - MEDICAMENTS -> MONGODB
// ==================================================
//
// A executer UNE SEULE FOIS :
//   node seedDrugs.js

const mongoose = require("mongoose");

const Drug = require("./models/Drug");
const drugsData = require("./drugsSeedData");

const MONGO_URI = "mongodb://127.0.0.1:27017/medical_assistant";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");

    await Drug.deleteMany({});
    await Drug.insertMany(drugsData);

    console.log(`${drugsData.length} médicaments/compléments migrés`);
    console.log("Migration terminée avec succès !");

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la migration :", error);
    process.exit(1);
  }
}

seed();
