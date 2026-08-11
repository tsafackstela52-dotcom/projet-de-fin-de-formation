// ==================================================
// DONNEES DE DEPART POUR LA MIGRATION - MEDICAMENTS
// ==================================================
//
// Fichier utilise UNE SEULE FOIS par seedDrugs.js pour
// remplir MongoDB. Une fois migre, la gestion se fait
// depuis /admin/medicaments (comme pour les maladies).

const drugsData = [
  {
    drugId: "paracetamol",
    name: "Paracétamol",
    categorie: "Médicament",
    classe: "Antalgique / Antipyrétique",
    description:
      "Utilisé pour soulager la douleur légère à modérée et faire baisser la fièvre. L'un des médicaments les plus utilisés au monde.",
    usages: [
      "Fièvre",
      "Maux de tête",
      "Douleurs musculaires",
      "Douleurs légères à modérées",
    ],
    effetsSecondaires: [
      "Rares aux doses recommandées",
      "Réactions allergiques possibles (rares)",
    ],
    precautions: [
      "Ne jamais dépasser la dose maximale journalière",
      "Attention en cas de maladie du foie",
      "Vérifier qu'aucun autre médicament pris ne contient déjà du paracétamol",
    ],
    interactionsNotables: ["Alcool (risque accru pour le foie)"],
    quandConsulter:
      "Si la fièvre ou la douleur persiste plus de 3 jours, ou en cas de surdosage suspecté.",
  },
  {
    drugId: "ibuprofene",
    name: "Ibuprofène",
    categorie: "Médicament",
    classe: "Anti-inflammatoire non stéroïdien (AINS)",
    description:
      "Utilisé pour réduire la douleur, l'inflammation et la fièvre.",
    usages: [
      "Douleurs inflammatoires",
      "Fièvre",
      "Douleurs musculaires et articulaires",
      "Migraines",
    ],
    effetsSecondaires: [
      "Troubles digestifs",
      "Brûlures d'estomac",
      "Maux de tête",
    ],
    precautions: [
      "À prendre pendant les repas pour limiter l'irritation digestive",
      "Déconseillé en cas d'ulcère gastrique",
      "Éviter en fin de grossesse",
    ],
    interactionsNotables: [
      "Autres AINS",
      "Anticoagulants",
      "Certains médicaments pour l'hypertension",
    ],
    quandConsulter:
      "En cas de douleurs abdominales sévères, de sang dans les selles, ou d'allergie connue aux AINS.",
  },
  {
    drugId: "amoxicilline",
    name: "Amoxicilline",
    categorie: "Médicament",
    classe: "Antibiotique (famille des pénicillines)",
    description:
      "Antibiotique à large spectre utilisé pour traiter diverses infections bactériennes. Nécessite une prescription médicale.",
    usages: [
      "Infections respiratoires",
      "Infections urinaires",
      "Certaines infections ORL",
    ],
    effetsSecondaires: [
      "Troubles digestifs",
      "Éruptions cutanées",
      "Réactions allergiques",
    ],
    precautions: [
      "Toujours terminer le traitement complet prescrit, même si les symptômes s'améliorent",
      "Signaler toute allergie connue à la pénicilline avant de commencer",
    ],
    interactionsNotables: ["Certains contraceptifs oraux (efficacité réduite)"],
    quandConsulter:
      "En cas d'éruption cutanée, de difficulté à respirer, ou de gonflement du visage après la prise.",
  },
  {
    drugId: "artemether_lumefantrine",
    name: "Artéméther-Luméfantrine",
    categorie: "Médicament",
    classe: "Antipaludique (combinaison thérapeutique à base d'artémisinine)",
    description:
      "Traitement de première ligne contre le paludisme simple, recommandé par l'OMS dans de nombreux pays africains dont le Cameroun.",
    usages: ["Paludisme simple à Plasmodium falciparum"],
    effetsSecondaires: ["Nausées", "Maux de tête", "Vertiges", "Fatigue"],
    precautions: [
      "À prendre avec de la nourriture pour une meilleure absorption",
      "Traitement à suivre en totalité même en cas d'amélioration rapide",
      "Confirmation du diagnostic par test recommandée avant traitement",
    ],
    interactionsNotables: [
      "Certains antirétroviraux",
      "Certains médicaments cardiaques",
    ],
    quandConsulter:
      "Si les symptômes s'aggravent malgré le traitement, ou en cas de signes de paludisme grave (confusion, convulsions).",
  },
  {
    drugId: "serum_oral_rehydratation",
    name: "Sérum de réhydratation orale (SRO)",
    categorie: "Médicament",
    classe: "Solution de réhydratation",
    description:
      "Mélange d'eau, de sels et de sucre utilisé pour prévenir ou traiter la déshydratation, notamment lors de diarrhées ou vomissements.",
    usages: [
      "Déshydratation liée à la diarrhée",
      "Déshydratation liée aux vomissements",
      "Choléra (en complément)",
    ],
    effetsSecondaires: ["Généralement bien toléré"],
    precautions: [
      "Préparer avec de l'eau potable propre",
      "Respecter les proportions indiquées sur le sachet",
      "Ne pas remplacer par une solution maison sans dosage précis en cas de déshydratation sévère",
    ],
    interactionsNotables: [],
    quandConsulter:
      "Si la déshydratation semble sévère (bouche très sèche, absence d'urine, léthargie) — consultation urgente.",
  },
  {
    drugId: "metronidazole",
    name: "Métronidazole",
    categorie: "Médicament",
    classe: "Antibiotique / Antiparasitaire",
    description:
      "Utilisé contre certaines infections bactériennes et parasitaires, notamment digestives.",
    usages: [
      "Certaines infections digestives",
      "Certaines infections parasitaires",
    ],
    effetsSecondaires: ["Goût métallique en bouche", "Nausées", "Maux de tête"],
    precautions: [
      "Éviter totalement l'alcool pendant le traitement et 48h après",
      "Prescription médicale nécessaire",
    ],
    interactionsNotables: ["Alcool (réaction sévère)", "Anticoagulants"],
    quandConsulter:
      "En cas de réaction cutanée ou de symptômes neurologiques inhabituels pendant le traitement.",
  },
  {
    drugId: "ciprofloxacine",
    name: "Ciprofloxacine",
    categorie: "Médicament",
    classe: "Antibiotique (famille des fluoroquinolones)",
    description:
      "Antibiotique utilisé pour certaines infections bactériennes, notamment urinaires et digestives.",
    usages: ["Infections urinaires", "Certaines infections digestives"],
    effetsSecondaires: [
      "Troubles digestifs",
      "Douleurs tendineuses (rares)",
      "Sensibilité au soleil",
    ],
    precautions: [
      "Éviter une exposition solaire excessive pendant le traitement",
      "Signaler toute douleur tendineuse inhabituelle",
      "Prescription médicale nécessaire",
    ],
    interactionsNotables: [
      "Produits laitiers (absorption réduite)",
      "Anti-acides",
    ],
    quandConsulter:
      "En cas de douleur ou gonflement d'un tendon pendant ou après le traitement.",
  },
  {
    drugId: "omeprazole",
    name: "Oméprazole",
    categorie: "Médicament",
    classe: "Inhibiteur de la pompe à protons",
    description:
      "Réduit la production d'acide dans l'estomac. Utilisé pour les brûlures d'estomac et les ulcères.",
    usages: [
      "Brûlures d'estomac",
      "Reflux gastro-œsophagien",
      "Ulcère gastrique",
    ],
    effetsSecondaires: ["Maux de tête", "Troubles digestifs légers"],
    precautions: ["Usage prolongé à discuter avec un médecin"],
    interactionsNotables: ["Certains anticoagulants"],
    quandConsulter:
      "Si les brûlures persistent malgré le traitement, ou en cas de perte de poids inexpliquée associée.",
  },
  {
    drugId: "metformine",
    name: "Metformine",
    categorie: "Médicament",
    classe: "Antidiabétique oral",
    description:
      "Médicament de référence pour le diabète de type 2, aide à réguler la glycémie.",
    usages: ["Diabète de type 2"],
    effetsSecondaires: [
      "Troubles digestifs (surtout en début de traitement)",
      "Goût métallique",
    ],
    precautions: [
      "Prescription et suivi médical obligatoires",
      "Surveillance de la fonction rénale recommandée",
    ],
    interactionsNotables: [
      "Alcool en excès",
      "Produits de contraste iodés (examens médicaux)",
    ],
    quandConsulter:
      "En cas de troubles digestifs sévères et persistants, ou de signes d'hypoglycémie.",
  },
  {
    drugId: "insuline",
    name: "Insuline",
    categorie: "Médicament",
    classe: "Hormone antidiabétique",
    description:
      "Hormone utilisée pour réguler la glycémie, indispensable dans le diabète de type 1 et parfois nécessaire dans le diabète de type 2.",
    usages: [
      "Diabète de type 1",
      "Diabète de type 2 non contrôlé par d'autres traitements",
    ],
    effetsSecondaires: [
      "Hypoglycémie si mal dosée",
      "Réactions au point d'injection",
    ],
    precautions: [
      "Dosage strictement individualisé par un médecin",
      "Conservation au réfrigérateur généralement requise",
      "Ne jamais ajuster la dose sans avis médical",
    ],
    interactionsNotables: ["Alcool", "Certains autres traitements du diabète"],
    quandConsulter:
      "En cas de signes d'hypoglycémie (tremblements, sueurs, confusion) ou d'hyperglycémie persistante.",
  },
  {
    drugId: "enalapril",
    name: "Énalapril",
    categorie: "Médicament",
    classe: "Inhibiteur de l'enzyme de conversion (IEC)",
    description:
      "Utilisé pour traiter l'hypertension artérielle et certaines insuffisances cardiaques.",
    usages: ["Hypertension artérielle", "Insuffisance cardiaque"],
    effetsSecondaires: ["Toux sèche persistante", "Vertiges", "Fatigue"],
    precautions: [
      "Suivi de la tension artérielle recommandé",
      "Déconseillé pendant la grossesse",
    ],
    interactionsNotables: ["Suppléments de potassium", "Certains diurétiques"],
    quandConsulter:
      "En cas de toux persistante gênante ou de vertiges importants au changement de position.",
  },
  {
    drugId: "aspirine",
    name: "Aspirine (acide acétylsalicylique)",
    categorie: "Médicament",
    classe: "Antalgique / Anti-inflammatoire / Antiagrégant plaquettaire",
    description:
      "Utilisée à faible dose pour la prévention cardiovasculaire, ou à dose plus élevée contre la douleur et la fièvre.",
    usages: [
      "Douleurs légères à modérées",
      "Fièvre",
      "Prévention cardiovasculaire (usage spécifique)",
    ],
    effetsSecondaires: ["Irritation digestive", "Risque de saignement accru"],
    precautions: [
      "Déconseillée chez l'enfant (risque de syndrome de Reye)",
      "Prudence en cas d'ulcère ou de trouble de la coagulation",
    ],
    interactionsNotables: ["Anticoagulants", "Autres AINS"],
    quandConsulter:
      "En cas de saignement inhabituel ou de douleurs digestives importantes.",
  },
  {
    drugId: "vitamine_c",
    name: "Vitamine C",
    categorie: "Complément",
    classe: "Vitamine",
    description:
      "Contribue au fonctionnement normal du système immunitaire et à la réduction de la fatigue.",
    usages: [
      "Soutien du système immunitaire",
      "Fatigue",
      "Carence en vitamine C",
    ],
    effetsSecondaires: ["Troubles digestifs à très forte dose"],
    precautions: [
      "Prudence en cas d'antécédents de calculs rénaux à très forte dose",
    ],
    interactionsNotables: [],
    quandConsulter:
      "En cas de fatigue persistante malgré la supplémentation — rechercher une autre cause.",
  },
  {
    drugId: "fer",
    name: "Fer (supplémentation)",
    categorie: "Complément",
    classe: "Oligo-élément",
    description:
      "Utilisé pour prévenir ou traiter l'anémie par carence en fer, fréquente notamment chez la femme enceinte.",
    usages: ["Anémie par carence en fer", "Prévention pendant la grossesse"],
    effetsSecondaires: ["Constipation", "Selles foncées", "Troubles digestifs"],
    precautions: [
      "Prise à distance du thé et du café (réduisent l'absorption)",
      "Dosage à adapter selon un bilan sanguin",
    ],
    interactionsNotables: ["Certains antibiotiques", "Anti-acides"],
    quandConsulter:
      "Avant de commencer, pour confirmer la carence par une prise de sang.",
  },
  {
    drugId: "zinc",
    name: "Zinc (supplémentation)",
    categorie: "Complément",
    classe: "Oligo-élément",
    description:
      "Joue un rôle dans l'immunité et est recommandé par l'OMS en complément du traitement de la diarrhée chez l'enfant.",
    usages: [
      "Soutien immunitaire",
      "Complément du traitement de la diarrhée infantile",
    ],
    effetsSecondaires: ["Nausées à forte dose"],
    precautions: ["Respecter les doses recommandées selon l'âge"],
    interactionsNotables: [
      "Certains antibiotiques (absorption réduite si pris ensemble)",
    ],
    quandConsulter: "Avant supplémentation prolongée chez le jeune enfant.",
  },
  {
    drugId: "chloroquine",
    name: "Chloroquine",
    categorie: "Médicament",
    classe: "Antipaludique",
    description:
      "Ancien traitement antipaludique, de moins en moins utilisé en raison de résistances croissantes du parasite dans plusieurs régions.",
    usages: ["Paludisme (selon sensibilité locale du parasite)"],
    effetsSecondaires: [
      "Troubles digestifs",
      "Maux de tête",
      "Troubles visuels (usage prolongé)",
    ],
    precautions: [
      "Efficacité variable selon les résistances régionales — suivre les recommandations locales",
      "Prescription médicale recommandée",
    ],
    interactionsNotables: ["Certains médicaments cardiaques"],
    quandConsulter:
      "Si les symptômes du paludisme persistent malgré le traitement.",
  },
  {
    drugId: "quinine",
    name: "Quinine",
    categorie: "Médicament",
    classe: "Antipaludique",
    description:
      "Utilisée notamment dans les formes de paludisme grave ou résistant, souvent en milieu hospitalier.",
    usages: ["Paludisme grave", "Paludisme résistant à d'autres traitements"],
    effetsSecondaires: [
      "Bourdonnements d'oreille",
      "Troubles visuels",
      "Nausées",
    ],
    precautions: ["Traitement généralement supervisé en milieu médical"],
    interactionsNotables: ["Certains médicaments cardiaques", "Anticoagulants"],
    quandConsulter:
      "Ce traitement nécessite une supervision médicale — ne pas s'auto-administrer.",
  },
  {
    drugId: "loperamide",
    name: "Lopéramide",
    categorie: "Médicament",
    classe: "Antidiarrhéique",
    description:
      "Ralentit le transit intestinal pour soulager la diarrhée aiguë chez l'adulte.",
    usages: ["Diarrhée aiguë non compliquée"],
    effetsSecondaires: ["Constipation", "Ballonnements"],
    precautions: [
      "Déconseillé en cas de fièvre élevée ou de sang dans les selles",
      "Déconseillé chez le jeune enfant sans avis médical",
    ],
    interactionsNotables: [],
    quandConsulter:
      "Si la diarrhée persiste plus de 2 jours, ou s'accompagne de fièvre ou de sang.",
  },
  {
    drugId: "domperidone",
    name: "Dompéridone",
    categorie: "Médicament",
    classe: "Antiémétique (anti-nauséeux)",
    description: "Utilisée pour soulager les nausées et vomissements.",
    usages: ["Nausées", "Vomissements"],
    effetsSecondaires: ["Maux de tête", "Bouche sèche"],
    precautions: [
      "Prudence en cas de troubles cardiaques connus",
      "Usage de courte durée recommandé",
    ],
    interactionsNotables: [
      "Certains médicaments cardiaques",
      "Certains antifongiques",
    ],
    quandConsulter:
      "Si les vomissements persistent plus de 48h ou empêchent toute hydratation.",
  },
  {
    drugId: "salbutamol",
    name: "Salbutamol (inhalateur)",
    categorie: "Médicament",
    classe: "Bronchodilatateur",
    description:
      "Utilisé pour soulager rapidement les crises d'asthme en dilatant les bronches.",
    usages: ["Crise d'asthme", "Gêne respiratoire liée à l'asthme"],
    effetsSecondaires: ["Tremblements légers", "Palpitations", "Maux de tête"],
    precautions: [
      "Toujours garder l'inhalateur à portée de main en cas d'asthme connu",
      "Vérifier la technique d'inhalation avec un professionnel de santé",
    ],
    interactionsNotables: ["Certains bêta-bloquants"],
    quandConsulter:
      "Si les crises deviennent plus fréquentes ou ne répondent plus au traitement habituel.",
  },
];

module.exports = drugsData;
