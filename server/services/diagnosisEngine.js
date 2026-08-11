// ==================================================
// CALCUL DES RESULTATS AVEC PONDERATION (depuis MongoDB)
// ==================================================

const Condition = require("../models/Condition");

const calculateResults = async (detectedSymptoms) => {
  const conditionsList = await Condition.find({});

  const results = conditionsList.map((condition) => {
    const matchedSymptoms = condition.symptoms.filter((symptomObj) =>
      detectedSymptoms.includes(symptomObj.id),
    );

    const scoreObtenu = matchedSymptoms.reduce(
      (total, symptomObj) => total + symptomObj.weight,
      0,
    );

    const scoreMax = condition.symptoms.reduce(
      (total, symptomObj) => total + symptomObj.weight,
      0,
    );

    const percentage =
      scoreMax > 0 ? Math.round((scoreObtenu / scoreMax) * 100) : 0;

    return {
      id: condition.conditionId,
      name: condition.name,
      description: condition.description,
      score: scoreObtenu,
      percentage: percentage,
      matchedSymptoms: matchedSymptoms.map((s) => s.id),
      recommendation: condition.recommendation,
      whenToConsult: condition.whenToConsult,
      warning: condition.warning,
    };
  });

  results.sort((a, b) => b.percentage - a.percentage);

  return results;
};

const getConfidenceMessage = (results) => {
  const validResults = results.filter((result) => result.percentage > 0);

  if (validResults.length === 0) {
    return "Aucune piste claire n'a été identifiée à partir des symptômes décrits. Consultez un professionnel de santé pour un avis médical.";
  }

  const bestPercentage = validResults[0].percentage;

  const topConditions = validResults.filter(
    (result) => result.percentage === bestPercentage,
  );

  if (topConditions.length > 1) {
    return "Plusieurs pistes sont possibles, voici les plus probables. Seul un professionnel de santé peut poser un diagnostic précis.";
  }

  return "Voici la piste la plus probable selon les symptômes décrits. Ce résultat reste indicatif et ne remplace pas un avis médical.";
};

module.exports = {
  calculateResults,
  getConfidenceMessage,
};
