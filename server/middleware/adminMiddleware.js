// ==================================================
// MIDDLEWARE - VERIFICATION DU ROLE ADMIN
// ==================================================
//
// A utiliser APRES authMiddleware (qui fournit req.userId).
// Verifie en base que cet utilisateur a bien le role "admin".

const User = require("../models/User");

const verifierAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Accès réservé aux administrateurs",
      });
    }

    next();
  } catch (error) {
    console.error("Erreur dans verifierAdmin :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

module.exports = verifierAdmin;
