// ==================================================
// MIDDLEWARE - VERIFICATION DU TOKEN JWT
// ==================================================
//
// Verifie que la requete contient un token valide
// (envoye dans le header "Authorization: Bearer xxx").
// Si valide, ajoute req.userId pour les controleurs
// suivants. Sinon, renvoie une erreur 401.

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "vitalis_secret_dev_uniquement";

const verifierToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentification requise",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalide ou expiré",
    });
  }
};

module.exports = verifierToken;
