// ==================================================
// ROUTES ADMIN - TOUTES PROTEGEES
// (authMiddleware + adminMiddleware)
// ==================================================

const express = require("express");

const verifierToken = require("../middleware/authMiddleware");
const verifierAdmin = require("../middleware/adminMiddleware");

const {
  getAllConditions,
  createCondition,
  updateCondition,
  deleteCondition,
} = require("../controllers/adminConditionController");

const {
  getAllSymptoms,
  createSymptom,
  updateSymptom,
  deleteSymptom,
} = require("../controllers/adminSymptomController");

const {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/adminQuestionController");

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/adminUserController");

const {
  getAllDrugsAdmin,
  createDrug,
  updateDrug,
  deleteDrug,
} = require("../controllers/adminDrugController");

const {
  getAllPillsAdmin,
  createPill,
  updatePill,
  deletePill,
} = require("../controllers/adminPillController");

const {
  getAllInteractionsAdmin,
  createInteraction,
  updateInteraction,
  deleteInteraction,
} = require("../controllers/adminInteractionController");

const {
  getAllArticlesAdmin,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/adminWellbeingController");

const router = express.Router();

router.use(verifierToken, verifierAdmin);

// Maladies
router.get("/conditions", getAllConditions);
router.post("/conditions", createCondition);
router.put("/conditions/:id", updateCondition);
router.delete("/conditions/:id", deleteCondition);

// Symptomes
router.get("/symptoms", getAllSymptoms);
router.post("/symptoms", createSymptom);
router.put("/symptoms/:id", updateSymptom);
router.delete("/symptoms/:id", deleteSymptom);

// Questions
router.get("/questions", getAllQuestions);
router.post("/questions", createQuestion);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);

// Utilisateurs
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

// Medicaments
router.get("/drugs", getAllDrugsAdmin);
router.post("/drugs", createDrug);
router.put("/drugs/:id", updateDrug);
router.delete("/drugs/:id", deleteDrug);

// Pilules
router.get("/pills", getAllPillsAdmin);
router.post("/pills", createPill);
router.put("/pills/:id", updatePill);
router.delete("/pills/:id", deletePill);

// Interactions
router.get("/interactions", getAllInteractionsAdmin);
router.post("/interactions", createInteraction);
router.put("/interactions/:id", updateInteraction);
router.delete("/interactions/:id", deleteInteraction);

// Articles bien-etre
router.get("/wellbeing", getAllArticlesAdmin);
router.post("/wellbeing", createArticle);
router.put("/wellbeing/:id", updateArticle);
router.delete("/wellbeing/:id", deleteArticle);

module.exports = router;
