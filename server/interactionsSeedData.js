// ==================================================
// DONNEES DE DEPART - INTERACTIONS MEDICAMENTEUSES
// ==================================================
//
// Base curee d'interactions COURANTES et bien etablies
// entre les medicaments deja references dans Drug.
// Non exhaustive - utilisee une seule fois par
// seedInteractions.js.

const interactionsData = [
  {
    interactionId: "int_ibuprofene_aspirine",
    drugIdA: "ibuprofene",
    drugIdB: "aspirine",
    gravite: "moderee",
    description:
      "L'association de deux anti-inflammatoires augmente le risque d'effets indésirables digestifs (irritation, saignement).",
    conduite:
      "Éviter l'association sauf avis médical contraire. Ne pas prendre les deux en même temps sans consultation.",
  },
  {
    interactionId: "int_metformine_insuline",
    drugIdA: "metformine",
    drugIdB: "insuline",
    gravite: "moderee",
    description:
      "L'association peut augmenter le risque d'hypoglycémie (baisse excessive du sucre dans le sang).",
    conduite:
      "Association parfois volontaire sous suivi médical strict — surveillance de la glycémie recommandée.",
  },
  {
    interactionId: "int_enalapril_ibuprofene",
    drugIdA: "enalapril",
    drugIdB: "ibuprofene",
    gravite: "moderee",
    description:
      "Les anti-inflammatoires peuvent réduire l'efficacité des médicaments contre l'hypertension et affecter la fonction rénale.",
    conduite:
      "Usage ponctuel généralement toléré ; usage prolongé à éviter sans avis médical.",
  },
  {
    interactionId: "int_ciprofloxacine_fer",
    drugIdA: "ciprofloxacine",
    drugIdB: "fer",
    gravite: "mineure",
    description:
      "Le fer peut réduire l'absorption de la ciprofloxacine si pris en même temps.",
    conduite: "Espacer la prise des deux d'au moins 2 heures.",
  },
  {
    interactionId: "int_omeprazole_fer",
    drugIdA: "omeprazole",
    drugIdB: "fer",
    gravite: "mineure",
    description:
      "La réduction d'acidité gastrique par l'oméprazole peut diminuer l'absorption du fer.",
    conduite:
      "Prise à distance recommandée ; surveiller l'efficacité du traitement en fer si association prolongée.",
  },
  {
    interactionId: "int_aspirine_enalapril",
    drugIdA: "aspirine",
    drugIdB: "enalapril",
    gravite: "mineure",
    description:
      "À forte dose, l'aspirine peut réduire l'effet antihypertenseur de l'énalapril.",
    conduite:
      "Aux doses antiagrégantes faibles (prévention cardiovasculaire), l'interaction est généralement mineure.",
  },
  {
    interactionId: "int_metronidazole_aspirine",
    drugIdA: "metronidazole",
    drugIdB: "aspirine",
    gravite: "mineure",
    description:
      "Risque légèrement accru d'effets sur la coagulation en cas d'association prolongée.",
    conduite:
      "Surveillance recommandée en cas de traitement prolongé associant les deux.",
  },
  {
    interactionId: "int_domperidone_ciprofloxacine",
    drugIdA: "domperidone",
    drugIdB: "ciprofloxacine",
    gravite: "majeure",
    description:
      "Association pouvant affecter le rythme cardiaque (allongement de l'intervalle QT). Combinaison à éviter.",
    conduite:
      "Éviter cette association ; consulter un médecin pour une alternative.",
  },
  {
    interactionId: "int_salbutamol_enalapril",
    drugIdA: "salbutamol",
    drugIdB: "enalapril",
    gravite: "mineure",
    description:
      "Interaction généralement mineure ; le salbutamol peut légèrement modifier la réponse tensionnelle.",
    conduite:
      "Association habituellement bien tolérée sous suivi médical standard.",
  },
  {
    interactionId: "int_quinine_enalapril",
    drugIdA: "quinine",
    drugIdB: "enalapril",
    gravite: "moderee",
    description:
      "La quinine peut affecter le rythme cardiaque ; l'association avec certains traitements cardiovasculaires nécessite une surveillance.",
    conduite:
      "Traitement par quinine généralement supervisé en milieu médical — signaler tout traitement en cours.",
  },
];

module.exports = interactionsData;
