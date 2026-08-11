// ==================================================
// ADMIN - GESTION DES UTILISATEURS
// ==================================================

const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-motDePasse").sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, fields: "-motDePasse" },
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ message: "Rôle mis à jour", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };
