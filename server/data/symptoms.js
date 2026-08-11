const symptoms = [
  // =========================
  // GÉNÉRAL / SYSTÉMIQUE
  // =========================
  {
    id: "fievre",
    keywords: [
      "fievre",
      "fièvre",
      "temperature",
      "température",
      "j'ai chaud",
      "corps chaud",
      "fievre elevee",
    ],
  },
  {
    id: "frissons",
    keywords: ["frissons", "tremblements", "je tremble", "j'ai froid"],
  },
  {
    id: "fatigue",
    keywords: [
      "fatigue",
      "fatigué",
      "fatiguee",
      "épuisé",
      "epuise",
      "manque d'énergie",
      "je suis faible",
      "faiblesse generale",
    ],
  },
  {
    id: "perte_de_poids",
    keywords: [
      "perte de poids",
      "j'ai maigri",
      "je maigris",
      "amaigrissement",
      "je perds du poids",
    ],
  },
  {
    id: "perte_appetit",
    keywords: [
      "perte d'appetit",
      "perte d'appétit",
      "je n'ai plus faim",
      "manque d'appetit",
      "je ne mange plus",
    ],
  },
  {
    id: "sueurs_nocturnes",
    keywords: [
      "sueurs nocturnes",
      "je transpire la nuit",
      "sueurs la nuit",
      "transpiration nocturne",
    ],
  },
  {
    id: "malaise_general",
    keywords: [
      "malaise",
      "je ne me sens pas bien",
      "mal partout",
      "je me sens mal",
      "etat general altere",
    ],
  },
  {
    id: "soif_excessive",
    keywords: [
      "soif excessive",
      "j'ai tres soif",
      "je bois beaucoup",
      "soif intense",
      "toujours soif",
    ],
  },
  {
    id: "envie_uriner_frequente",
    keywords: [
      "envie d'uriner frequente",
      "je vais souvent aux toilettes",
      "urines frequentes",
      "mictions frequentes",
    ],
  },
  {
    id: "pale",
    keywords: ["pale", "pâle", "paleur", "je suis pale", "teint pale"],
  },
  {
    id: "jaunisse",
    keywords: ["jaunisse", "yeux jaunes", "peau jaune", "ictere", "ictère"],
  },
  {
    id: "ganglions_gonfles",
    keywords: [
      "ganglions gonfles",
      "ganglions gonflés",
      "boules sous la peau",
      "ganglions enfles",
    ],
  },
  {
    id: "deshydratation",
    keywords: [
      "deshydratation",
      "déshydratation",
      "bouche seche",
      "bouche sèche",
      "je suis deshydrate",
    ],
  },
  {
    id: "insomnie",
    keywords: [
      "insomnie",
      "je n'arrive pas a dormir",
      "difficulte a dormir",
      "je ne dors pas bien",
    ],
  },
  {
    id: "somnolence",
    keywords: [
      "somnolence",
      "j'ai sommeil",
      "toujours envie de dormir",
      "je dors tout le temps",
    ],
  },

  // =========================
  // RESPIRATOIRE
  // =========================
  {
    id: "toux",
    keywords: ["toux", "tousser", "je tousse"],
  },
  {
    id: "toux_seche",
    keywords: ["toux seche", "toux sèche", "toux sans crachat"],
  },
  {
    id: "toux_grasse",
    keywords: [
      "toux grasse",
      "toux avec crachat",
      "je crache",
      "expectoration",
      "crachats",
    ],
  },
  {
    id: "crachats_sang",
    keywords: [
      "crachats de sang",
      "je crache du sang",
      "sang dans les crachats",
      "hemoptysie",
    ],
  },
  {
    id: "difficulte_respirer",
    keywords: [
      "difficulte a respirer",
      "difficultes a respirer",
      "dificulte a respirer",
      "dificultes a respirer",
      "du mal a respirer",
      "mal a respirer",
      "manque d air",
      "essoufflement",
      "je n arrive pas a respirer",
    ],
  },
  {
    id: "respiration_rapide",
    keywords: [
      "respiration rapide",
      "je respire vite",
      "souffle court",
      "respiration accéléree",
    ],
  },
  {
    id: "respiration_sifflante",
    keywords: [
      "respiration sifflante",
      "sifflement en respirant",
      "ça siffle quand je respire",
    ],
  },
  {
    id: "douleur_thoracique",
    keywords: [
      "douleur thoracique",
      "forte douleur a la poitrine",
      "douleur a la poitrine",
      "douleur poitrine",
    ],
  },
  {
    id: "douleur_respirer",
    keywords: [
      "douleur en respirant",
      "ca fait mal quand je respire",
      "douleur a l'inspiration",
    ],
  },
  {
    id: "nez_bouche",
    keywords: ["nez bouché", "nez bouche", "j'ai le nez bouché"],
  },
  {
    id: "nez_qui_coule",
    keywords: ["nez qui coule", "le nez coule", "rhume"],
  },
  {
    id: "eternuements",
    keywords: [
      "eternuements",
      "éternuements",
      "j'eternue",
      "je n'arrete pas d'eternuer",
    ],
  },
  {
    id: "perte_odorat",
    keywords: [
      "perte de l'odorat",
      "je ne sens plus rien",
      "anosmie",
      "perte odorat",
    ],
  },
  {
    id: "perte_gout",
    keywords: [
      "perte du gout",
      "perte du goût",
      "je ne goute plus rien",
      "agueusie",
    ],
  },
  {
    id: "voix_enrouee",
    keywords: [
      "voix enrouee",
      "voix enrouée",
      "je suis enroue",
      "j'ai perdu la voix",
      "enrouement",
    ],
  },

  // =========================
  // DIGESTIF
  // =========================
  {
    id: "douleur_abdominale",
    keywords: [
      "mal au ventre",
      "douleur au ventre",
      "douleur abdominale",
      "douleurs abdominales",
      "j'ai mal au ventre",
    ],
  },
  {
    id: "vomissements",
    keywords: ["vomissement", "vomissements", "vomir", "je vomis"],
  },
  {
    id: "nausees",
    keywords: ["nausée", "nausées", "nausee", "nausees", "envie de vomir"],
  },
  {
    id: "diarrhee",
    keywords: ["diarrhée", "diarrhee", "selles liquides", "selles molles"],
  },
  {
    id: "diarrhee_aqueuse",
    keywords: [
      "diarrhee aqueuse",
      "selles comme de l'eau",
      "diarrhee eau de riz",
    ],
  },
  {
    id: "constipation",
    keywords: [
      "constipation",
      "je ne vais pas aux toilettes",
      "difficulte a aller a la selle",
    ],
  },
  {
    id: "ballonnements",
    keywords: ["ballonnements", "ventre gonfle", "ventre gonflé", "gaz"],
  },
  {
    id: "sang_dans_selles",
    keywords: [
      "sang dans les selles",
      "selles sanglantes",
      "sang dans les excrements",
    ],
  },
  {
    id: "perte_appetit_digestif",
    keywords: ["degout de la nourriture", "je ne supporte plus manger"],
  },
  {
    id: "brulures_estomac",
    keywords: [
      "brulures d'estomac",
      "brûlures d'estomac",
      "aigreurs",
      "reflux",
    ],
  },

  // =========================
  // NEUROLOGIQUE
  // =========================
  {
    id: "maux_de_tete",
    keywords: [
      "mal de tête",
      "maux de tête",
      "mal a la tete",
      "maux de tete",
      "céphalée",
      "cephalee",
    ],
  },
  {
    id: "vertiges",
    keywords: ["vertige", "vertiges", "tête qui tourne", "ma tête tourne"],
  },
  {
    id: "convulsions",
    keywords: ["convulsions", "crise convulsive", "je convulse", "spasmes"],
  },
  {
    id: "confusion",
    keywords: [
      "confusion",
      "je suis confus",
      "confusion mentale",
      "perte de reperes",
    ],
  },
  {
    id: "perte_connaissance",
    keywords: [
      "perte de connaissance",
      "evanouissement",
      "je me suis evanoui",
      "je me suis evanouie",
    ],
  },
  {
    id: "raideur_nuque",
    keywords: ["raideur de la nuque", "nuque raide", "cou raide"],
  },
  {
    id: "engourdissement",
    keywords: ["engourdissement", "membre engourdi", "fourmillements"],
  },
  {
    id: "troubles_vision",
    keywords: [
      "vision trouble",
      "je vois flou",
      "troubles de la vision",
      "vision floue",
    ],
  },
  {
    id: "somnolence_anormale",
    keywords: ["somnolence anormale", "difficulte a rester eveille", "torpeur"],
  },

  // =========================
  // ORL
  // =========================
  {
    id: "mal_de_gorge",
    keywords: [
      "mal de gorge",
      "douleur a la gorge",
      "douleur de gorge",
      "gorge douloureuse",
    ],
  },
  {
    id: "difficulte_avaler",
    keywords: ["difficulte a avaler", "mal en avalant", "douleur en avalant"],
  },
  {
    id: "douleur_oreille",
    keywords: ["mal a l'oreille", "douleur a l'oreille", "otalgie"],
  },
  {
    id: "ecoulement_oreille",
    keywords: ["ecoulement de l'oreille", "oreille qui coule"],
  },
  {
    id: "baisse_audition",
    keywords: ["baisse de l'audition", "j'entends moins bien", "surdite"],
  },

  // =========================
  // CUTANÉ
  // =========================
  {
    id: "demangeaisons",
    keywords: [
      "démangeaison",
      "démangeaisons",
      "demangeaison",
      "demangeaisons",
      "ça me gratte",
    ],
  },
  {
    id: "eruption_cutanee",
    keywords: [
      "éruption cutanée",
      "eruption cutanee",
      "boutons sur la peau",
      "taches sur la peau",
    ],
  },
  {
    id: "plaques_rouges",
    keywords: ["plaques rouges", "rougeurs sur la peau", "peau rouge"],
  },
  {
    id: "gonflement_peau",
    keywords: ["gonflement", "peau gonflee", "oedeme"],
  },
  {
    id: "ulceres_peau",
    keywords: [
      "ulcere sur la peau",
      "plaie qui ne guerit pas",
      "plaie chronique",
    ],
  },

  // =========================
  // MUSCULO-SQUELETTIQUE
  // =========================
  {
    id: "douleurs_musculaires",
    keywords: [
      "douleur musculaire",
      "douleurs musculaires",
      "mal aux muscles",
      "courbatures",
    ],
  },
  {
    id: "douleurs_articulaires",
    keywords: [
      "douleur articulaire",
      "douleurs articulaires",
      "mal aux articulations",
    ],
  },
  {
    id: "gonflement_articulations",
    keywords: ["articulation gonflee", "gonflement des articulations"],
  },
  {
    id: "raideur_articulaire",
    keywords: ["raideur articulaire", "articulations raides"],
  },

  // =========================
  // URINAIRE / GÉNITAL
  // =========================
  {
    id: "brulures_urinaires",
    keywords: [
      "brulure en urinant",
      "brûlure urinaire",
      "ça brule quand j'urine",
    ],
  },
  {
    id: "urines_foncees",
    keywords: ["urines foncees", "urine fonce", "urine marron"],
  },
  {
    id: "sang_urines",
    keywords: ["sang dans les urines", "urines sanglantes", "hematurie"],
  },
  {
    id: "douleur_bas_ventre",
    keywords: ["douleur au bas ventre", "douleur pelvienne"],
  },

  // =========================
  // CARDIOVASCULAIRE
  // =========================
  {
    id: "palpitations",
    keywords: [
      "palpitations",
      "coeur qui bat vite",
      "battements de coeur rapides",
    ],
  },
  {
    id: "oedeme_jambes",
    keywords: [
      "jambes gonflees",
      "gonflement des jambes",
      "oedeme des membres",
    ],
  },
  {
    id: "douleur_poitrine_effort",
    keywords: ["douleur a l'effort", "douleur poitrine a l'effort"],
  },

  // =========================
  // SIGNES D'ALERTE
  // =========================
  {
    id: "saignement_abondant",
    keywords: ["saignement abondant", "hemorragie", "je saigne beaucoup"],
  },
  {
    id: "detresse_respiratoire_severe",
    keywords: ["je suffoque", "je ne respire presque plus", "asphyxie"],
  },
  {
    id: "coma",
    keywords: ["coma", "inconscient depuis longtemps", "ne se reveille pas"],
  },
];

module.exports = symptoms;
