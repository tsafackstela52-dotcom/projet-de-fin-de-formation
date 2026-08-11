const express = require("express");

const {
  checkInteractions,
  getAvailableDrugs,
} = require("../controllers/interactionController");

const router = express.Router();

router.post("/check", checkInteractions);
router.get("/drugs", getAvailableDrugs);

module.exports = router;
