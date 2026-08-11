const express = require("express");

const {
  createAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

const verifierToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifierToken, createAppointment);
router.get("/", verifierToken, getAppointments);

module.exports = router;
