// ==================================================
// MODELE MONGOOSE - APPOINTMENT (RENDEZ-VOUS)
// ==================================================

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  nom: {
    type: String,
    required: true,
  },

  telephone: {
    type: String,
    required: true,
  },

  hopital: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  motif: {
    type: String,
    required: true,
  },

  statut: {
    type: String,
    enum: ["en_attente", "confirme", "annule"],
    default: "en_attente",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
