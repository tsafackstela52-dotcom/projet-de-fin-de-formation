// ==================================================
// CONTROLEUR - AUTHENTIFICATION
// ==================================================

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "vitalis_secret_dev_uniquement";

// ==================================================
// INSCRIPTION
// ==================================================

const inscription = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    if (!nom || !email || !motDePasse) {
      return res.status(400).json({
        message: "Nom, email et mot de passe sont obligatoires",
      });
    }

    if (motDePasse.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    const emailExiste = await User.findOne({ email: email.toLowerCase() });

    if (emailExiste) {
      return res.status(409).json({
        message: "Un compte existe déjà avec cet email",
      });
    }

    const motDePasseHash = await bcrypt.hash(motDePasse, 10);

    // Note : le formulaire d'inscription public ne cree
    // JAMAIS de compte admin - toujours "user" par defaut
    // (voir le champ "role" dans le modele User).
    const user = new User({
      nom,
      email: email.toLowerCase(),
      motDePasse: motDePasseHash,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Compte créé avec succès",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur dans inscription :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

// ==================================================
// CONNEXION
// ==================================================

const connexion = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({
        message: "Email et mot de passe sont obligatoires",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, user.motDePasse);

    if (!motDePasseValide) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur dans connexion :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

module.exports = {
  inscription,
  connexion,
};
