// ==================================================
// DETECTION DES SYMPTOMES (depuis MongoDB)
// ==================================================

const Symptom = require("../models/Symptom");

const { normalizeText, phraseContainsKeyword } = require("./normalizer");

// ==================================================
// DETECTER LES SYMPTOMES DANS UN TEXTE
// ==================================================

const detectSymptoms = async (description) => {
  const symptomsList = await Symptom.find({});

  const normalizedText = normalizeText(description);

  const detected = [];

  symptomsList.forEach((symptom) => {
    const found = symptom.keywords.some((keyword) =>
      phraseContainsKeyword(normalizedText, keyword),
    );

    if (found) {
      detected.push(symptom.symptomId);
    }
  });

  return detected;
};

module.exports = {
  detectSymptoms,
};
