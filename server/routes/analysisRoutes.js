const express = require("express");

const {
  startAnalysis,
  answerQuestion,
} = require("../controllers/analysisController");

const router = express.Router();

router.post("/start", startAnalysis);

router.post("/answer", answerQuestion);

module.exports = router;
