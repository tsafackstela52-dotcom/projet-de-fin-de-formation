const alertsList = require("../data/alerts.js");

// ==================================================
// CHERCHER LES ALERTES
// ==================================================

const findAlerts = (detectedSymptoms) => {
  const alerts = [];

  alertsList.forEach((alert) => {
    /*
     * Le fichier alerts.js doit contenir
     * un tableau "symptoms".
     *
     * Exemple :
     *
     * symptoms: [
     *   "difficulte_respirer"
     * ]
     */

    const found =
      alert.symptoms &&
      alert.symptoms.some((symptom) => detectedSymptoms.includes(symptom));

    if (found) {
      alerts.push(alert);
    }
  });

  return alerts;
};

module.exports = {
  findAlerts,
};
