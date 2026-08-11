const alerts = [
  {
    id: "difficulte_respirer",
    symptoms: ["difficulte_respirer"],
    level: "urgent",
    message:
      "Une difficulté importante à respirer peut nécessiter une prise en charge médicale urgente.",
    action:
      "Contactez rapidement les services d'urgence ou rendez-vous immédiatement dans un centre de santé.",
  },
  {
    id: "douleur_thoracique",
    symptoms: ["douleur_thoracique"],
    level: "urgent",
    message:
      "Une douleur importante à la poitrine peut nécessiter une évaluation médicale urgente.",
    action: "Consultez immédiatement un professionnel de santé.",
  },
  {
    id: "perte_connaissance",
    symptoms: ["perte_connaissance"],
    level: "urgent",
    message:
      "Une perte de connaissance nécessite une évaluation médicale rapide.",
    action: "Demandez rapidement une assistance médicale.",
  },
  {
    id: "raideur_nuque",
    symptoms: ["raideur_nuque"],
    level: "urgent",
    message:
      "Une raideur de la nuque associée à d'autres symptômes peut évoquer une méningite.",
    action: "Consultez immédiatement un centre de santé.",
  },
  {
    id: "convulsions",
    symptoms: ["convulsions"],
    level: "urgent",
    message: "Des convulsions nécessitent une évaluation médicale immédiate.",
    action: "Rendez-vous en urgence dans un centre de santé.",
  },
  {
    id: "confusion",
    symptoms: ["confusion"],
    level: "urgent",
    message:
      "Un état de confusion soudain peut être le signe d'une urgence médicale grave.",
    action: "Consultez immédiatement, surtout si l'état s'aggrave rapidement.",
  },
  {
    id: "coma",
    symptoms: ["coma"],
    level: "urgent",
    message: "Un état comateux est une urgence médicale absolue.",
    action: "Appelez immédiatement les services d'urgence.",
  },
  {
    id: "detresse_respiratoire_severe",
    symptoms: ["detresse_respiratoire_severe"],
    level: "urgent",
    message: "Une détresse respiratoire sévère met en jeu le pronostic vital.",
    action: "Appelez une ambulance immédiatement.",
  },
  {
    id: "saignement_abondant",
    symptoms: ["saignement_abondant"],
    level: "urgent",
    message: "Un saignement abondant nécessite une prise en charge en urgence.",
    action: "Rendez-vous immédiatement aux urgences.",
  },
  {
    id: "crachats_sang",
    symptoms: ["crachats_sang"],
    level: "urgent",
    message: "Cracher du sang peut indiquer une atteinte pulmonaire grave.",
    action: "Consultez rapidement un professionnel de santé.",
  },
  {
    id: "sang_dans_selles",
    symptoms: ["sang_dans_selles"],
    level: "urgent",
    message:
      "La présence de sang dans les selles nécessite une évaluation médicale rapide.",
    action: "Consultez dans les meilleurs délais.",
  },
  {
    id: "sang_urines",
    symptoms: ["sang_urines"],
    level: "urgent",
    message:
      "La présence de sang dans les urines nécessite un avis médical rapide.",
    action: "Consultez dans les meilleurs délais.",
  },
  {
    id: "troubles_vision",
    symptoms: ["troubles_vision"],
    level: "modere",
    message:
      "Des troubles de la vision soudains peuvent nécessiter une évaluation rapide.",
    action:
      "Consultez rapidement, surtout si associé à d'autres symptômes neurologiques.",
  },
  {
    id: "engourdissement",
    symptoms: ["engourdissement"],
    level: "modere",
    message:
      "Un engourdissement soudain d'un membre peut être un signe d'alerte neurologique.",
    action: "Consultez rapidement un professionnel de santé.",
  },
  {
    id: "deshydratation",
    symptoms: ["deshydratation"],
    level: "modere",
    message:
      "Des signes de déshydratation nécessitent une prise en charge rapide.",
    action:
      "Réhydratez-vous immédiatement et consultez si les signes persistent.",
  },
  {
    id: "jaunisse",
    symptoms: ["jaunisse"],
    level: "modere",
    message:
      "Une jaunisse peut indiquer une atteinte du foie nécessitant un bilan médical.",
    action: "Consultez rapidement pour un bilan hépatique.",
  },
  {
    id: "somnolence_anormale",
    symptoms: ["somnolence_anormale"],
    level: "modere",
    message:
      "Une somnolence anormale et persistante peut être un signe d'alerte.",
    action: "Consultez rapidement un professionnel de santé.",
  },
];

module.exports = alerts;
