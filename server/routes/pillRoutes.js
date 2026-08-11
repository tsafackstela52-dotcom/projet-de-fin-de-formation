const express = require("express");

const {
  searchPills,
  getPillOptions,
} = require("../controllers/pillController");

const router = express.Router();

router.get("/search", searchPills);
router.get("/options", getPillOptions);

module.exports = router;
