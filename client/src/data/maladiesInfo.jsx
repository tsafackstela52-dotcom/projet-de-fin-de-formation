// ==================================================
// FICHES MALADIES (contenu informatif détaillé)
// ==================================================
//
// Ce fichier vit côté FRONTEND. Il complète data/conditions.js
// (utilisé côté backend pour le calcul de probabilité) avec du
// contenu éditorial : définition, causes, facteurs de risque,
// prévention, traitements courants, situations d'urgence.
//
// Les `id` correspondent exactement à ceux de conditions.js,
// pour permettre de lier un résultat de diagnostic à sa fiche.
//
// Utilisé par : pages/Maladies.jsx (recherche/liste),
// pages/MaladieDetail.jsx (fiche complète)

const maladiesInfo = {
  paludisme: {
    name: "Paludisme (Malaria)",
    definition:
      "Maladie parasitaire transmise par la piqûre de moustiques Anopheles infectés, causée par des parasites du genre Plasmodium. C'est l'une des principales causes de mortalité au Cameroun.",
    causes: [
      "Piqûre d'un moustique Anopheles femelle porteur du parasite Plasmodium",
      "Risque accru en saison des pluies et dans les zones à eau stagnante",
    ],
    symptoms: [
      "Fièvre",
      "Frissons",
      "Maux de tête",
      "Vomissements",
      "Douleurs musculaires",
      "Fatigue",
    ],
    riskFactors: [
      "Vivre dans une zone endémique sans moustiquaire",
      "Enfants de moins de 5 ans et femmes enceintes",
      "Absence de traitement préventif",
    ],
    prevention: [
      "Dormir sous une moustiquaire imprégnée",
      "Éliminer les eaux stagnantes autour du domicile",
      "Utiliser des répulsifs anti-moustiques",
    ],
    treatments: [
      "Combinaisons thérapeutiques à base d'artémisinine (CTA)",
      "Traitement sous supervision médicale, surtout pour les formes graves",
    ],
    urgentSituations:
      "Fièvre très élevée, convulsions, confusion, difficulté à respirer ou incapacité à s'alimenter — consultation en urgence.",
  },

  vih_sida: {
    name: "VIH/SIDA",
    definition:
      "Infection virale chronique qui attaque le système immunitaire. Sans traitement, elle évolue vers le stade SIDA, marqué par une vulnérabilité accrue aux infections opportunistes.",
    causes: [
      "Transmission sexuelle non protégée",
      "Contact avec du sang contaminé (transfusion, objets tranchants partagés)",
      "Transmission de la mère à l'enfant pendant la grossesse ou l'allaitement",
    ],
    symptoms: [
      "Fièvre",
      "Perte de poids",
      "Sueurs nocturnes",
      "Ganglions gonflés",
      "Fatigue",
      "Diarrhée",
    ],
    riskFactors: [
      "Rapports sexuels non protégés avec partenaires multiples",
      "Partage de matériel d'injection",
      "Absence de dépistage régulier",
    ],
    prevention: [
      "Utilisation systématique du préservatif",
      "Dépistage régulier et dépistage du partenaire",
      "Traitement préventif pré-exposition (PrEP) si à risque élevé",
    ],
    treatments: [
      "Traitement antirétroviral (ARV) à vie, permettant une charge virale indétectable",
      "Suivi médical régulier",
    ],
    urgentSituations:
      "Infections opportunistes sévères, perte de poids rapide et inexpliquée, fièvre persistante — consultation rapide recommandée.",
  },

  cholera: {
    name: "Choléra",
    definition:
      "Infection intestinale aiguë causée par la bactérie Vibrio cholerae, transmise par l'eau ou les aliments contaminés. Peut provoquer une déshydratation sévère en quelques heures.",
    causes: [
      "Ingestion d'eau ou d'aliments contaminés par la bactérie",
      "Mauvaises conditions d'hygiène et d'assainissement",
    ],
    symptoms: [
      "Diarrhée aqueuse abondante",
      "Vomissements",
      "Déshydratation",
      "Douleur abdominale",
    ],
    riskFactors: [
      "Accès limité à l'eau potable",
      "Zones de forte densité de population avec assainissement précaire",
      "Épidémies en cours dans la région",
    ],
    prevention: [
      "Boire uniquement de l'eau traitée ou bouillie",
      "Se laver les mains régulièrement",
      "Vaccination dans les zones à haut risque",
    ],
    treatments: [
      "Réhydratation orale (SRO) immédiate",
      "Réhydratation intraveineuse dans les cas sévères",
      "Antibiotiques dans certains cas",
    ],
    urgentSituations:
      "Diarrhée abondante avec signes de déshydratation sévère (bouche sèche, soif intense, faiblesse) — urgence médicale immédiate.",
  },

  fievre_typhoide: {
    name: "Fièvre typhoïde",
    definition:
      "Infection bactérienne systémique causée par Salmonella Typhi, transmise par l'eau ou les aliments contaminés par des matières fécales.",
    causes: [
      "Ingestion d'eau ou d'aliments contaminés",
      "Mauvaise hygiène alimentaire",
    ],
    symptoms: [
      "Fièvre prolongée",
      "Douleur abdominale",
      "Maux de tête",
      "Perte d'appétit",
      "Constipation ou diarrhée",
    ],
    riskFactors: [
      "Accès limité à l'eau potable",
      "Voyage en zone endémique",
      "Contact avec une personne infectée",
    ],
    prevention: [
      "Vaccination disponible",
      "Boire de l'eau traitée",
      "Bien cuire les aliments",
    ],
    treatments: [
      "Antibiothérapie adaptée (selon antibiogramme si possible)",
      "Réhydratation et repos",
    ],
    urgentSituations:
      "Fièvre prolongée de plus de 3 jours, douleur abdominale intense, ou signes de complication intestinale — consultation rapide.",
  },

  fievre_jaune: {
    name: "Fièvre jaune",
    definition:
      "Maladie virale hémorragique transmise par des moustiques infectés, évitable par vaccination. Peut évoluer vers une atteinte hépatique grave.",
    causes: ["Piqûre de moustique infecté par le virus amaril"],
    symptoms: [
      "Fièvre",
      "Jaunisse",
      "Douleurs musculaires",
      "Maux de tête",
      "Vomissements",
    ],
    riskFactors: [
      "Absence de vaccination",
      "Résidence ou voyage en zone endémique",
    ],
    prevention: [
      "Vaccination (dose unique, protection à vie)",
      "Protection contre les piqûres de moustiques",
    ],
    treatments: [
      "Pas de traitement antiviral spécifique — prise en charge symptomatique",
      "Hospitalisation pour les formes graves",
    ],
    urgentSituations:
      "Jaunisse associée à des saignements ou une fièvre élevée — hospitalisation immédiate, maladie à déclaration obligatoire.",
  },

  rougeole: {
    name: "Rougeole",
    definition:
      "Maladie virale extrêmement contagieuse touchant principalement les enfants non vaccinés, se manifestant par une éruption cutanée caractéristique.",
    causes: [
      "Virus de la rougeole, transmis par voie respiratoire (toux, éternuements)",
    ],
    symptoms: [
      "Fièvre",
      "Éruption cutanée",
      "Toux",
      "Nez qui coule",
      "Malaise général",
    ],
    riskFactors: [
      "Absence de vaccination",
      "Contact étroit avec une personne infectée",
      "Jeune âge",
    ],
    prevention: ["Vaccination (ROR)", "Isolement des personnes infectées"],
    treatments: [
      "Pas de traitement antiviral spécifique — repos, hydratation, antipyrétiques",
      "Supplémentation en vitamine A parfois recommandée",
    ],
    urgentSituations:
      "Difficulté à respirer, forte fièvre persistante, ou signes de complication (pneumonie, atteinte neurologique) — consultation urgente.",
  },

  meningite: {
    name: "Méningite",
    definition:
      "Inflammation grave des membranes entourant le cerveau et la moelle épinière, le plus souvent d'origine bactérienne ou virale. Urgence médicale absolue.",
    causes: [
      "Infection bactérienne (méningocoque, pneumocoque)",
      "Infection virale",
    ],
    symptoms: [
      "Fièvre",
      "Raideur de la nuque",
      "Maux de tête intenses",
      "Vomissements",
      "Confusion",
      "Convulsions",
    ],
    riskFactors: [
      "Épidémies saisonnières (ceinture méningitique africaine)",
      "Absence de vaccination",
      "Promiscuité",
    ],
    prevention: [
      "Vaccination disponible selon le type",
      "Éviter la promiscuité en période épidémique",
    ],
    treatments: [
      "Antibiothérapie en urgence pour les formes bactériennes",
      "Hospitalisation systématique",
    ],
    urgentSituations:
      "Tout signe évocateur (fièvre + raideur de nuque + maux de tête) est une urgence absolue — consultation immédiate sans délai.",
  },

  tuberculose: {
    name: "Tuberculose",
    definition:
      "Infection bactérienne chronique causée par Mycobacterium tuberculosis, touchant principalement les poumons. Se transmet par voie aérienne.",
    causes: [
      "Inhalation de bacilles tuberculeux via la toux d'une personne infectée",
    ],
    symptoms: [
      "Toux persistante (plus de 2 semaines)",
      "Crachats de sang",
      "Perte de poids",
      "Sueurs nocturnes",
      "Fatigue",
    ],
    riskFactors: [
      "Contact prolongé avec une personne infectée",
      "Immunodépression (VIH notamment)",
      "Conditions de vie précaires, promiscuité",
    ],
    prevention: [
      "Vaccination BCG (protège surtout les formes graves de l'enfant)",
      "Dépistage et traitement rapide des cas actifs",
    ],
    treatments: [
      "Traitement antituberculeux de 6 mois minimum, à suivre jusqu'au bout",
      "Suivi médical régulier pour éviter les résistances",
    ],
    urgentSituations:
      "Toux persistante de plus de 2 semaines avec crachats sanglants — consultation rapide pour dépistage.",
  },

  dysenterie: {
    name: "Dysenterie (shigellose)",
    definition:
      "Infection intestinale bactérienne provoquant une diarrhée sanglante, causée par des bactéries du genre Shigella.",
    causes: [
      "Ingestion d'eau ou d'aliments contaminés",
      "Contact avec une personne infectée",
    ],
    symptoms: [
      "Diarrhée avec sang",
      "Douleur abdominale",
      "Fièvre",
      "Vomissements",
    ],
    riskFactors: ["Mauvaise hygiène", "Accès limité à l'eau potable"],
    prevention: [
      "Lavage des mains",
      "Eau potable traitée",
      "Bonne hygiène alimentaire",
    ],
    treatments: [
      "Réhydratation",
      "Antibiotiques dans les cas sévères ou prolongés",
    ],
    urgentSituations:
      "Sang abondant dans les selles, fièvre élevée ou signes de déshydratation — consultation rapide.",
  },

  gastro_enterite: {
    name: "Gastro-entérite aiguë",
    definition:
      "Inflammation du tube digestif, le plus souvent d'origine virale ou alimentaire, provoquant diarrhée et vomissements.",
    causes: [
      "Virus (rotavirus, norovirus)",
      "Intoxication alimentaire",
      "Bactéries",
    ],
    symptoms: [
      "Diarrhée",
      "Vomissements",
      "Nausées",
      "Douleur abdominale",
      "Fièvre légère",
    ],
    riskFactors: [
      "Aliments mal conservés ou mal cuits",
      "Contact avec une personne infectée",
    ],
    prevention: ["Hygiène alimentaire rigoureuse", "Lavage des mains"],
    treatments: [
      "Réhydratation orale",
      "Alimentation légère progressive",
      "Repos",
    ],
    urgentSituations:
      "Déshydratation marquée, incapacité à s'hydrater, ou symptômes persistant plus de 3 jours — consultation recommandée.",
  },

  filariose_lymphatique: {
    name: "Filariose lymphatique",
    definition:
      "Maladie parasitaire chronique transmise par des moustiques, provoquant à terme des gonflements importants des membres (éléphantiasis) si non traitée.",
    causes: ["Piqûre de moustique porteur de larves de filaires"],
    symptoms: [
      "Gonflement de la peau",
      "Jambes gonflées",
      "Douleurs articulaires",
      "Fièvre",
    ],
    riskFactors: [
      "Résidence prolongée en zone endémique",
      "Piqûres répétées de moustiques infectés",
    ],
    prevention: [
      "Protection contre les piqûres de moustiques",
      "Traitement de masse dans les zones endémiques",
    ],
    treatments: [
      "Traitement antiparasitaire spécifique",
      "Soins de la peau et prise en charge du gonflement",
    ],
    urgentSituations:
      "Gonflement important et persistant d'un membre — consultation spécialisée pour éviter l'aggravation.",
  },

  onchocercose: {
    name: "Onchocercose (cécité des rivières)",
    definition:
      "Maladie parasitaire transmise par la piqûre de simulies (mouches noires) vivant près des cours d'eau rapides, pouvant entraîner une cécité si non traitée.",
    causes: ["Piqûre de simulie porteuse du parasite Onchocerca volvulus"],
    symptoms: [
      "Démangeaisons intenses",
      "Éruption cutanée",
      "Troubles de la vision",
      "Plaques rouges sur la peau",
    ],
    riskFactors: [
      "Résidence près de cours d'eau à courant rapide",
      "Zones endémiques d'Afrique de l'Ouest et Centrale",
    ],
    prevention: [
      "Traitement de masse préventif dans les zones endémiques",
      "Protection contre les piqûres",
    ],
    treatments: [
      "Traitement antiparasitaire (ivermectine), répété périodiquement",
    ],
    urgentSituations:
      "Troubles visuels progressifs — consultation ophtalmologique rapide pour éviter une perte de vision irréversible.",
  },

  bilharziose: {
    name: "Bilharziose (schistosomiase)",
    definition:
      "Maladie parasitaire causée par des vers plats transmis par contact avec de l'eau douce contaminée par certains escargots hôtes intermédiaires.",
    causes: [
      "Contact cutané avec de l'eau douce contaminée (baignade, lessive, pêche)",
    ],
    symptoms: [
      "Sang dans les urines",
      "Douleur au bas-ventre",
      "Fatigue",
      "Démangeaisons",
    ],
    riskFactors: [
      "Baignade ou activités dans des eaux douces stagnantes",
      "Résidence en zone endémique",
    ],
    prevention: [
      "Éviter le contact avec les eaux douces suspectes",
      "Traitement de masse préventif",
    ],
    treatments: ["Traitement antiparasitaire (praziquantel)"],
    urgentSituations:
      "Sang visible dans les urines ou douleur pelvienne persistante — consultation pour dépistage et traitement.",
  },

  hepatite: {
    name: "Hépatite virale",
    definition:
      "Inflammation du foie causée par différents virus (A, B, C notamment), pouvant évoluer vers une forme chronique selon le type.",
    causes: [
      "Hépatite A : eau/aliments contaminés",
      "Hépatite B/C : sang contaminé, rapports non protégés, transmission mère-enfant",
    ],
    symptoms: [
      "Jaunisse",
      "Fatigue",
      "Perte d'appétit",
      "Douleur abdominale",
      "Urines foncées",
    ],
    riskFactors: [
      "Rapports non protégés",
      "Partage de matériel d'injection",
      "Eau non traitée (hépatite A)",
    ],
    prevention: [
      "Vaccination (hépatites A et B)",
      "Eau potable traitée",
      "Rapports protégés",
    ],
    treatments: [
      "Hépatite A : traitement symptomatique, guérison spontanée",
      "Hépatite B/C : traitement antiviral spécifique selon le cas",
    ],
    urgentSituations:
      "Jaunisse marquée avec confusion ou saignements — consultation urgente pour évaluer la fonction hépatique.",
  },

  trypanosomiase: {
    name: "Trypanosomiase (maladie du sommeil)",
    definition:
      "Maladie parasitaire transmise par la mouche tsé-tsé, pouvant atteindre le système nerveux central si non traitée à temps.",
    causes: ["Piqûre de mouche tsé-tsé infectée"],
    symptoms: [
      "Fièvre",
      "Ganglions gonflés",
      "Somnolence anormale",
      "Confusion",
      "Maux de tête",
    ],
    riskFactors: [
      "Résidence ou activités en zones rurales infestées par la mouche tsé-tsé",
    ],
    prevention: [
      "Protection contre les piqûres",
      "Lutte contre les vecteurs (pièges à mouches)",
    ],
    treatments: [
      "Traitement antiparasitaire spécifique, adapté au stade de la maladie",
    ],
    urgentSituations:
      "Somnolence anormale et troubles neurologiques progressifs — consultation spécialisée urgente.",
  },

  grippe: {
    name: "Grippe",
    definition:
      "Infection virale respiratoire saisonnière, généralement bénigne mais pouvant se compliquer chez les personnes fragiles.",
    causes: ["Virus influenza, transmission par voie respiratoire"],
    symptoms: [
      "Fièvre",
      "Toux",
      "Douleurs musculaires",
      "Mal de gorge",
      "Fatigue",
    ],
    riskFactors: [
      "Contact avec une personne infectée",
      "Âge avancé",
      "Immunodépression",
    ],
    prevention: [
      "Vaccination annuelle",
      "Lavage des mains",
      "Éviter les contacts rapprochés en période d'épidémie",
    ],
    treatments: [
      "Repos, hydratation, antipyrétiques",
      "Antiviraux dans certains cas à risque",
    ],
    urgentSituations:
      "Difficulté à respirer, fièvre très élevée persistante, ou aggravation chez une personne fragile — consultation recommandée.",
  },

  pneumonie: {
    name: "Pneumonie",
    definition:
      "Infection pulmonaire aiguë, bactérienne ou virale, pouvant être grave chez les enfants et les personnes âgées.",
    causes: ["Bactéries (pneumocoque notamment)", "Virus"],
    symptoms: [
      "Fièvre",
      "Toux grasse",
      "Douleur thoracique",
      "Difficulté à respirer",
      "Respiration rapide",
    ],
    riskFactors: [
      "Jeune âge ou âge avancé",
      "Maladies chroniques sous-jacentes",
      "Tabagisme",
    ],
    prevention: ["Vaccination (pneumocoque, grippe)", "Éviter le tabagisme"],
    treatments: [
      "Antibiothérapie pour les formes bactériennes",
      "Hospitalisation si signes de gravité",
    ],
    urgentSituations:
      "Difficulté marquée à respirer, respiration très rapide, ou coloration bleutée des lèvres — urgence médicale.",
  },

  covid19: {
    name: "COVID-19",
    definition:
      "Maladie infectieuse respiratoire causée par le SARS-CoV-2, à transmission principalement respiratoire.",
    causes: ["Virus SARS-CoV-2, transmission par gouttelettes respiratoires"],
    symptoms: [
      "Fièvre",
      "Toux sèche",
      "Perte de l'odorat",
      "Perte du goût",
      "Fatigue",
      "Difficulté à respirer",
    ],
    riskFactors: [
      "Contact rapproché avec une personne infectée",
      "Absence de vaccination",
      "Comorbidités",
    ],
    prevention: [
      "Vaccination",
      "Port du masque en période de circulation active",
      "Aération des espaces clos",
    ],
    treatments: [
      "Traitement symptomatique pour les formes légères",
      "Prise en charge hospitalière pour les formes sévères",
    ],
    urgentSituations:
      "Difficulté à respirer, saturation en oxygène basse, ou confusion — consultation urgente.",
  },

  hypertension: {
    name: "Hypertension artérielle",
    definition:
      "Élévation chronique de la pression artérielle, souvent silencieuse, mais facteur de risque majeur de complications cardiovasculaires.",
    causes: [
      "Facteurs génétiques",
      "Alimentation riche en sel",
      "Sédentarité",
      "Stress chronique",
    ],
    symptoms: [
      "Maux de tête",
      "Vertiges",
      "Palpitations",
      "Troubles de la vision",
    ],
    riskFactors: [
      "Surpoids",
      "Consommation excessive de sel",
      "Antécédents familiaux",
      "Âge avancé",
    ],
    prevention: [
      "Réduction du sel",
      "Activité physique régulière",
      "Contrôle du poids",
      "Suivi médical régulier",
    ],
    treatments: ["Traitement antihypertenseur", "Mesures hygiéno-diététiques"],
    urgentSituations:
      "Maux de tête sévères avec troubles visuels ou douleur thoracique — consultation en urgence (risque de crise hypertensive).",
  },

  diabete: {
    name: "Diabète",
    definition:
      "Maladie métabolique chronique caractérisée par un taux de sucre élevé dans le sang, de type 1 (auto-immun) ou type 2 (lié au mode de vie).",
    causes: [
      "Type 1 : réaction auto-immune",
      "Type 2 : surpoids, sédentarité, prédisposition génétique",
    ],
    symptoms: [
      "Soif excessive",
      "Envie fréquente d'uriner",
      "Perte de poids",
      "Fatigue",
      "Troubles de la vision",
    ],
    riskFactors: [
      "Surpoids",
      "Antécédents familiaux",
      "Sédentarité",
      "Âge avancé",
    ],
    prevention: [
      "Alimentation équilibrée",
      "Activité physique régulière",
      "Contrôle du poids",
    ],
    treatments: [
      "Insuline (type 1)",
      "Antidiabétiques oraux et mesures hygiéno-diététiques (type 2)",
    ],
    urgentSituations:
      "Perte de poids rapide inexpliquée, confusion, ou soif extrême avec fatigue intense — consultation rapide.",
  },

  avc: {
    name: "Accident vasculaire cérébral (AVC)",
    definition:
      "Interruption soudaine de la circulation sanguine dans le cerveau, par obstruction (ischémique) ou rupture d'un vaisseau (hémorragique). Urgence absolue.",
    causes: [
      "Caillot sanguin obstruant une artère cérébrale",
      "Rupture d'un vaisseau sanguin cérébral",
    ],
    symptoms: [
      "Engourdissement soudain",
      "Confusion",
      "Troubles de la vision",
      "Perte de connaissance",
      "Vertiges",
    ],
    riskFactors: [
      "Hypertension non contrôlée",
      "Diabète",
      "Tabagisme",
      "Âge avancé",
    ],
    prevention: [
      "Contrôle de la tension artérielle",
      "Arrêt du tabac",
      "Activité physique régulière",
    ],
    treatments: [
      "Prise en charge hospitalière en urgence",
      "Rééducation post-AVC selon les séquelles",
    ],
    urgentSituations:
      "Tout signe soudain (faiblesse d'un côté du corps, trouble de la parole, trouble de la vision) est une urgence absolue — appeler les secours immédiatement.",
  },

  insuffisance_cardiaque: {
    name: "Insuffisance cardiaque",
    definition:
      "Incapacité du cœur à pomper le sang de manière suffisante pour répondre aux besoins de l'organisme.",
    causes: [
      "Hypertension non traitée",
      "Maladie coronarienne",
      "Anomalies cardiaques",
    ],
    symptoms: [
      "Difficulté à respirer",
      "Jambes gonflées",
      "Fatigue",
      "Palpitations",
      "Douleur thoracique à l'effort",
    ],
    riskFactors: [
      "Hypertension",
      "Diabète",
      "Antécédents cardiaques",
      "Âge avancé",
    ],
    prevention: [
      "Contrôle de la tension artérielle",
      "Activité physique adaptée",
      "Suivi cardiologique régulier",
    ],
    treatments: [
      "Traitement médicamenteux (diurétiques, autres selon le cas)",
      "Suivi cardiologique rapproché",
    ],
    urgentSituations:
      "Essoufflement sévère au repos ou gonflement rapide des jambes — consultation urgente.",
  },

  asthme: {
    name: "Asthme",
    definition:
      "Maladie inflammatoire chronique des voies respiratoires, provoquant des épisodes de gêne respiratoire (crises).",
    causes: [
      "Prédisposition génétique",
      "Allergènes environnementaux",
      "Pollution, fumée de tabac",
    ],
    symptoms: [
      "Respiration sifflante",
      "Difficulté à respirer",
      "Toux sèche",
      "Douleur thoracique",
    ],
    riskFactors: [
      "Antécédents familiaux d'asthme ou d'allergies",
      "Exposition à la pollution ou au tabac",
    ],
    prevention: [
      "Éviter les déclencheurs connus",
      "Traitement de fond régulier si prescrit",
    ],
    treatments: [
      "Bronchodilatateurs en cas de crise",
      "Traitement de fond anti-inflammatoire",
    ],
    urgentSituations:
      "Crise ne répondant pas au traitement habituel, difficulté sévère à parler ou respirer — urgence médicale.",
  },

  ulcere_gastrique: {
    name: "Ulcère gastrique",
    definition:
      "Lésion de la paroi de l'estomac, souvent liée à une infection par Helicobacter pylori ou à une utilisation prolongée d'anti-inflammatoires.",
    causes: [
      "Infection à Helicobacter pylori",
      "Usage prolongé d'anti-inflammatoires",
      "Excès d'acidité gastrique",
    ],
    symptoms: [
      "Douleur abdominale",
      "Brûlures d'estomac",
      "Nausées",
      "Perte d'appétit",
    ],
    riskFactors: [
      "Usage fréquent d'anti-inflammatoires",
      "Stress chronique",
      "Tabagisme, alcool",
    ],
    prevention: [
      "Éviter l'usage prolongé d'anti-inflammatoires sans avis médical",
      "Traitement de l'infection à H. pylori si présente",
    ],
    treatments: [
      "Traitement anti-acide",
      "Antibiotiques si infection à H. pylori confirmée",
    ],
    urgentSituations:
      "Douleur abdominale intense soudaine, vomissements de sang, ou selles noires — consultation en urgence.",
  },

  drepanocytose: {
    name: "Drépanocytose",
    definition:
      "Maladie génétique héréditaire du sang, très fréquente en Afrique subsaharienne, provoquant une déformation des globules rouges.",
    causes: [
      "Mutation génétique héréditaire (transmise par les deux parents porteurs)",
    ],
    symptoms: [
      "Douleurs articulaires",
      "Fatigue",
      "Pâleur",
      "Jaunisse",
      "Douleur abdominale",
    ],
    riskFactors: [
      "Antécédents familiaux",
      "Origine géographique (Afrique subsaharienne notamment)",
    ],
    prevention: [
      "Dépistage génétique et conseil génétique avant la conception",
      "Suivi médical spécialisé régulier",
    ],
    treatments: [
      "Prise en charge des crises douloureuses",
      "Suivi hématologique régulier",
      "Transfusions si nécessaire",
    ],
    urgentSituations:
      "Crise douloureuse intense (crise vaso-occlusive), fièvre élevée, ou pâleur soudaine — consultation/hospitalisation urgente.",
  },

  cancer: {
    name: "Cancer (généraliste)",
    definition:
      "Terme général désignant une prolifération anormale et incontrôlée de cellules, pouvant toucher différents organes.",
    causes: [
      "Facteurs génétiques",
      "Exposition à des substances cancérigènes",
      "Tabagisme, alcool",
      "Infections chroniques non traitées",
    ],
    symptoms: [
      "Perte de poids inexpliquée",
      "Fatigue",
      "Ganglions gonflés",
      "Malaise général",
      "Perte d'appétit",
    ],
    riskFactors: [
      "Tabagisme",
      "Antécédents familiaux",
      "Exposition prolongée à des toxiques",
      "Âge avancé",
    ],
    prevention: [
      "Dépistages réguliers selon l'âge et les facteurs de risque",
      "Arrêt du tabac",
      "Alimentation équilibrée",
    ],
    treatments: [
      "Selon le type et le stade : chirurgie, chimiothérapie, radiothérapie",
    ],
    urgentSituations:
      "Signes persistants et inexpliqués (perte de poids rapide, masse palpable, saignement anormal) — consultation rapide pour bilan.",
  },

  infection_urinaire: {
    name: "Infection urinaire",
    definition:
      "Infection bactérienne touchant les voies urinaires (vessie le plus souvent), fréquente notamment chez la femme.",
    causes: [
      "Bactéries (E. coli le plus souvent) remontant les voies urinaires",
    ],
    symptoms: [
      "Brûlures urinaires",
      "Envie fréquente d'uriner",
      "Douleur au bas-ventre",
      "Urines foncées",
      "Fièvre",
    ],
    riskFactors: [
      "Hygiène intime inadaptée",
      "Rétention urinaire fréquente",
      "Grossesse",
    ],
    prevention: [
      "Bonne hydratation",
      "Uriner régulièrement, ne pas se retenir",
      "Hygiène intime adaptée",
    ],
    treatments: ["Antibiothérapie ciblée", "Hydratation abondante"],
    urgentSituations:
      "Fièvre élevée associée à une douleur lombaire — possible atteinte rénale, consultation rapide.",
  },

  otite: {
    name: "Otite",
    definition:
      "Infection ou inflammation de l'oreille, fréquente chez l'enfant, pouvant toucher l'oreille externe ou moyenne.",
    causes: ["Infection bactérienne ou virale", "Complication d'un rhume"],
    symptoms: [
      "Douleur à l'oreille",
      "Écoulement de l'oreille",
      "Baisse de l'audition",
      "Fièvre",
    ],
    riskFactors: [
      "Jeune âge",
      "Rhumes fréquents",
      "Exposition à la fumée de tabac",
    ],
    prevention: [
      "Éviter l'exposition à la fumée",
      "Traitement rapide des rhumes chez l'enfant",
    ],
    treatments: [
      "Antalgiques",
      "Antibiotiques si infection bactérienne confirmée",
    ],
    urgentSituations:
      "Douleur intense persistante, écoulement purulent abondant, ou fièvre élevée chez l'enfant — consultation rapide.",
  },

  sinusite: {
    name: "Sinusite / rhinopharyngite",
    definition:
      "Inflammation des sinus ou des voies respiratoires supérieures, souvent virale, parfois compliquée par une surinfection bactérienne.",
    causes: ["Virus du rhume", "Allergies", "Surinfection bactérienne"],
    symptoms: [
      "Nez bouché",
      "Nez qui coule",
      "Maux de tête",
      "Mal de gorge",
      "Fièvre légère",
    ],
    riskFactors: [
      "Allergies chroniques",
      "Exposition à la pollution ou au tabac",
    ],
    prevention: [
      "Éviter les irritants (fumée, pollution)",
      "Traiter les allergies sous-jacentes",
    ],
    treatments: [
      "Décongestionnants",
      "Antibiotiques si surinfection bactérienne confirmée",
    ],
    urgentSituations:
      "Symptômes durant plus de 10 jours ou douleur faciale intense avec fièvre élevée — consultation recommandée.",
  },

  malnutrition: {
    name: "Malnutrition aiguë",
    definition:
      "Carence nutritionnelle sévère, particulièrement dangereuse chez le jeune enfant, pouvant affecter la croissance et le développement.",
    causes: [
      "Apport alimentaire insuffisant",
      "Maladies infectieuses répétées",
      "Insécurité alimentaire",
    ],
    symptoms: [
      "Perte de poids",
      "Pâleur",
      "Perte d'appétit",
      "Malaise général",
      "Fatigue",
    ],
    riskFactors: [
      "Insécurité alimentaire du foyer",
      "Jeune âge",
      "Maladies chroniques associées",
    ],
    prevention: [
      "Alimentation équilibrée et suffisante",
      "Suivi de la croissance des jeunes enfants",
    ],
    treatments: [
      "Prise en charge nutritionnelle spécialisée",
      "Suppléments nutritionnels thérapeutiques",
    ],
    urgentSituations:
      "Retard de croissance marqué ou amaigrissement sévère chez un enfant — consultation nutritionnelle urgente.",
  },
};

export default maladiesInfo;
