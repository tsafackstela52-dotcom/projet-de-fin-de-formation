const express = require("express");

const { getAllDrugs, getDrugById } = require("../controllers/drugController");

const router = express.Router();

router.get("/", getAllDrugs);
router.get("/:id", getDrugById);

module.exports = router;
