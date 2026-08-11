// ==================================================
// CONTROLEUR - RENDEZ-VOUS
// ==================================================

const Appointment = require("../models/Appointment");

// ==================================================
// CREER UN RENDEZ-VOUS
// ==================================================

const createAppointment = async (req, res) => {
  try {
    const { nom, telephone, hopital, date, motif } = req.body;

    if (!nom || !telephone || !hopital || !date || !motif) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const appointment = new Appointment({
      userId: req.userId,
      nom,
      telephone,
      hopital,
      date,
      motif,
    });

    await appointment.save();

    res.status(201).json({
      message: "Rendez-vous enregistré",
      appointment,
    });
  } catch (error) {
    console.error("Erreur dans createAppointment :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

// ==================================================
// RECUPERER LES RENDEZ-VOUS DE L'UTILISATEUR CONNECTE
// ==================================================

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.userId,
    }).sort({ date: 1 });

    res.json({
      message: "Rendez-vous récupérés",
      appointments,
    });
  } catch (error) {
    console.error("Erreur dans getAppointments :", error);

    res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
