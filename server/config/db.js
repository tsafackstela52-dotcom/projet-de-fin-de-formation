require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("Variable d'environnement MONGO_URI introuvable. Le serveur ne démarrera pas en mode local.");
    throw new Error("MONGO_URI non défini. Veuillez définir la variable MONGO_URI dans le fichier .env");
  }
  try {
    // Mongoose v6+ gère correctement les options par défaut ;
    // les options obsolètes provoquaient une erreur.
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connecté à :", MONGO_URI);

    mongoose.connection.on("connected", () => console.log("Mongoose: connecté à la base de données"));
    mongoose.connection.on("error", (err) => console.error("Mongoose: erreur de connexion ->", err));
    mongoose.connection.on("disconnected", () => console.warn("Mongoose: déconnecté de la base de données"));
  } catch (err) {
    console.error("Erreur lors de la connexion à MongoDB:", err.message);
    throw err;
  }
};

module.exports = connectDB;
