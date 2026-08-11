// ==================================================
// DONNEES DE DEPART - ARTICLES BIEN-ETRE
// ==================================================

const wellbeingData = [
  // SOMMEIL
  {
    articleId: "sommeil_routine",
    title: "Adopter une routine de sommeil régulière",
    categorie: "sommeil",
    resume:
      "Se coucher et se lever à heures fixes améliore durablement la qualité du sommeil.",
    conseils: [
      "Se coucher et se lever à des heures similaires chaque jour, week-end inclus",
      "Éviter les écrans dans l'heure précédant le coucher",
      "Garder la chambre fraîche, sombre et calme",
      "Éviter la caféine en fin de journée",
    ],
  },
  {
    articleId: "sommeil_qualite",
    title: "Améliorer la qualité de son sommeil",
    categorie: "sommeil",
    resume:
      "Quelques ajustements simples peuvent nettement améliorer un sommeil léger ou agité.",
    conseils: [
      "Limiter les siestes à 20-30 minutes en début d'après-midi",
      "Pratiquer une activité relaxante avant le coucher (lecture, respiration)",
      "Éviter les repas lourds tard le soir",
      "Réserver le lit au sommeil, éviter d'y travailler",
    ],
  },
  {
    articleId: "sommeil_enfant",
    title: "Favoriser un bon sommeil chez l'enfant",
    categorie: "sommeil",
    resume: "Le sommeil de l'enfant a des besoins spécifiques selon son âge.",
    conseils: [
      "Maintenir des horaires de coucher réguliers",
      "Installer un rituel calme avant le coucher (histoire, câlin)",
      "Limiter les écrans en soirée",
      "Adapter la durée de sommeil à l'âge de l'enfant",
    ],
  },

  // NUTRITION
  {
    articleId: "nutrition_equilibre",
    title: "Les bases d'une alimentation équilibrée",
    categorie: "nutrition",
    resume:
      "Varier les groupes alimentaires reste le principe le plus simple et efficace.",
    conseils: [
      "Privilégier les fruits et légumes à chaque repas",
      "Choisir des céréales complètes quand possible",
      "Limiter les aliments ultra-transformés et le sucre ajouté",
      "Boire suffisamment d'eau tout au long de la journée",
    ],
  },
  {
    articleId: "nutrition_hydratation",
    title: "L'importance de l'hydratation",
    categorie: "nutrition",
    resume:
      "Une bonne hydratation soutient l'énergie, la concentration et la santé générale.",
    conseils: [
      "Boire régulièrement tout au long de la journée, pas seulement quand on a soif",
      "Augmenter l'apport en cas de forte chaleur ou d'activité physique",
      "L'eau reste la meilleure source d'hydratation au quotidien",
      "Surveiller la couleur des urines comme indicateur simple",
    ],
  },
  {
    articleId: "nutrition_grossesse",
    title: "Alimentation pendant la grossesse",
    categorie: "nutrition",
    resume: "Certains besoins nutritionnels augmentent pendant la grossesse.",
    conseils: [
      "Augmenter les apports en fer et en acide folique (avis médical recommandé)",
      "Bien cuire viandes et œufs pour limiter les risques infectieux",
      "Fractionner les repas en cas de nausées",
      "Suivi médical régulier recommandé tout au long de la grossesse",
    ],
  },

  // STRESS
  {
    articleId: "stress_respiration",
    title: "Techniques de respiration contre le stress",
    categorie: "stress",
    resume:
      "La respiration contrôlée est un outil simple et accessible pour calmer le stress.",
    conseils: [
      "Respirer lentement en gonflant le ventre plutôt que la poitrine",
      "Essayer la respiration 4-4-4 : inspirer 4s, retenir 4s, expirer 4s",
      "Pratiquer quelques minutes par jour, pas seulement en cas de stress aigu",
      "Combiner avec un moment calme, sans distraction",
    ],
  },
  {
    articleId: "stress_quotidien",
    title: "Gérer le stress au quotidien",
    categorie: "stress",
    resume:
      "De petites habitudes régulières aident à mieux gérer les tensions du quotidien.",
    conseils: [
      "Identifier les principales sources de stress pour mieux les anticiper",
      "Prévoir des pauses régulières dans la journée",
      "Maintenir des liens sociaux et en parler à des proches",
      "Pratiquer une activité physique régulière, même modérée",
    ],
  },
  {
    articleId: "stress_sommeil_lien",
    title: "Le lien entre stress et sommeil",
    categorie: "stress",
    resume:
      "Stress et sommeil s'influencent mutuellement — agir sur l'un aide souvent l'autre.",
    conseils: [
      "Éviter de ruminer les soucis juste avant le coucher",
      "Noter ses pensées sur un carnet peut aider à les évacuer",
      "Une activité relaxante en soirée réduit le stress et facilite l'endormissement",
      "Consulter si le stress devient envahissant ou persistant",
    ],
  },

  // ACTIVITE PHYSIQUE
  {
    articleId: "activite_regularite",
    title: "L'importance de la régularité",
    categorie: "activite_physique",
    resume:
      "Une activité physique régulière, même modérée, vaut mieux qu'un effort intense occasionnel.",
    conseils: [
      "Viser une activité physique régulière plusieurs fois par semaine",
      "La marche rapide est une excellente option accessible à tous",
      "Commencer progressivement en cas de reprise après une longue pause",
      "Choisir une activité qu'on apprécie pour tenir dans la durée",
    ],
  },
  {
    articleId: "activite_debutant",
    title: "Reprendre une activité physique en douceur",
    categorie: "activite_physique",
    resume:
      "Bien démarrer permet d'éviter les blessures et de garder la motivation.",
    conseils: [
      "Commencer par des séances courtes et augmenter progressivement",
      "S'échauffer avant l'effort et s'étirer après",
      "Écouter les signaux de son corps, ne pas ignorer la douleur",
      "Avis médical recommandé en cas de reprise après une longue interruption ou un problème de santé",
    ],
  },
  {
    articleId: "activite_maison",
    title: "Bouger au quotidien sans matériel",
    categorie: "activite_physique",
    resume:
      "L'activité physique ne nécessite pas toujours de salle de sport ou d'équipement.",
    conseils: [
      "Privilégier les escaliers à l'ascenseur quand possible",
      "Marcher ou faire du vélo pour les courts trajets",
      "Intégrer des pauses actives lors des journées assises",
      "Des exercices au poids du corps suffisent pour commencer",
    ],
  },
];

module.exports = wellbeingData;
