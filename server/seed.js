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
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");

const Symptom = require("./models/Symptom");
const Condition = require("./models/Condition");
const Question = require("./models/Question");
const User = require("./models/User");

const symptomsData = require("./data/symptoms");
const conditionsData = require("./data/conditions");
const questionsData = require("./data/questions");

const MONGO_URI = "mongodb://127.0.0.1:27017/medical_assistant";

async function seed() {
  try {
    await connectDB();

      // ==================================================
      // SYMPTOMES (upsert)
      // ==================================================
      let created = 0;
      for (const s of symptomsData) {
        const res = await Symptom.updateOne(
          { symptomId: s.id },
          { $set: { symptomId: s.id, keywords: s.keywords } },
          { upsert: true },
        );
        if (res.upsertedCount && res.upsertedCount > 0) created++;
      }
      console.log(`${created} symptômes créés ou mis à jour`);

      // ==================================================
      // CONDITIONS (upsert)
      // ==================================================
      created = 0;
      for (const c of conditionsData) {
        const doc = {
          conditionId: c.id,
          name: c.name,
          description: c.description,
          symptoms: c.symptoms,
          recommendation: c.recommendation,
          whenToConsult: c.whenToConsult,
          warning: c.warning,
        };
        const res = await Condition.updateOne({ conditionId: c.id }, { $set: doc }, { upsert: true });
        if (res.upsertedCount && res.upsertedCount > 0) created++;
      }
      console.log(`${created} conditions créées ou mises à jour`);

      // ==================================================
      // QUESTIONS (upsert)
      // ==================================================
      created = 0;
      for (const q of questionsData) {
        const doc = {
          questionId: q.id,
          question: q.question,
          symptom: q.symptom,
          conditions: q.conditions,
        };
        const res = await Question.updateOne({ questionId: q.id }, { $set: doc }, { upsert: true });
        if (res.upsertedCount && res.upsertedCount > 0) created++;
      }
      console.log(`${created} questions créées ou mises à jour`);

    // ==================================================
    // DEMO USERS
    // ==================================================

    const demoUsers = [
      {
        nom: "Demo Admin",
        email: "admin@localhost.academy",
        motDePasse: "Admin@123",
        role: "admin",
      },
      {
        nom: "Demo Student",
        email: "user@localhost.academy",
        motDePasse: "User@123",
        role: "user",
      },
    ];

    // Users: hash motDePasse and upsert
    for (const u of demoUsers) {
      const hash = await bcrypt.hash(u.motDePasse, 10);
      const doc = { nom: u.nom, email: u.email, motDePasse: hash, role: u.role };
      const res = await User.updateOne({ email: u.email }, { $set: doc }, { upsert: true });
      if (res.upsertedCount && res.upsertedCount > 0) {
        console.log(`Created user: ${u.email}`);
      } else if (res.modifiedCount && res.modifiedCount > 0) {
        console.log(`Updated user: ${u.email}`);
      } else {
        console.log(`No change for user: ${u.email}`);
      }
    }

    console.log("Migration terminée avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la migration :", error);
    process.exit(1);
  }
}

seed();
