// ==================================================
// SCRIPT - CREER LE COMPTE ADMINISTRATEUR
// ==================================================
//
// A executer UNE SEULE FOIS :
//   node createAdmin.js
//
// Cree un compte avec le role "admin", avec les
// identifiants definis ci-dessous. Modifiez-les avant
// d'executer le script.

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const MONGO_URI = "mongodb+srv://stela:aIeN9vygvP8oxjxm@stela.jpxlz6u.mongodb.net/?appName=stela";

// ==================================================
// MODIFIEZ CES IDENTIFIANTS AVANT D'EXECUTER
// ==================================================

const ADMIN_NOM = "Administrateur Vitalis";
const ADMIN_EMAIL = "admin@vitalis.cm";
const ADMIN_MOT_DE_PASSE = "ChangezMoi123!";

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");

    const existant = await User.findOne({ email: ADMIN_EMAIL });

    if (existant) {
      existant.role = "admin";
      await existant.save();
      console.log(`Le compte ${ADMIN_EMAIL} existait déjà — passé en admin.`);
      process.exit(0);
    }

    const motDePasseHash = await bcrypt.hash(ADMIN_MOT_DE_PASSE, 10);

    const admin = new User({
      nom: ADMIN_NOM,
      email: ADMIN_EMAIL,
      motDePasse: motDePasseHash,
      role: "admin",
    });

    await admin.save();

    console.log("Compte administrateur créé avec succès !");
    console.log(`Email : ${ADMIN_EMAIL}`);
    console.log(`Mot de passe : ${ADMIN_MOT_DE_PASSE}`);
    console.log(
      "Pensez à changer ce mot de passe après la première connexion.",
    );

    process.exit(0);
  } catch (error) {
    console.error("Erreur :", error);
    process.exit(1);
  }
}

createAdmin();
// 24oztgikjOsd4BUG
// https://justefrontend.vercel.app/assistant