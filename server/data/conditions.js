const conditions = [
  {
    id: "paludisme",
    name: "Paludisme (Malaria)",
    description:
      "Maladie parasitaire transmise par piqûre de moustique, très répandue au Cameroun.",
    symptoms: [
      { id: "fievre", weight: 5 },
      { id: "frissons", weight: 4 },
      { id: "maux_de_tete", weight: 3 },
      { id: "vomissements", weight: 2 },
      { id: "douleurs_musculaires", weight: 3 },
      { id: "sueurs_nocturnes", weight: 2 },
      { id: "fatigue", weight: 2 },
      { id: "pale", weight: 3 },
    ],
    recommendation:
      "Faites un test de dépistage du paludisme (goutte épaisse ou TDR) rapidement.",
    whenToConsult: "Dans les 24h, surtout si fièvre élevée persistante.",
    warning:
      "Le paludisme grave peut être mortel en quelques jours, particulièrement chez les enfants.",
  },
  {
    id: "vih_sida",
    name: "VIH/SIDA",
    description: "Infection virale chronique affectant le système immunitaire.",
    symptoms: [
      { id: "sueurs_nocturnes", weight: 4 },
      { id: "perte_de_poids", weight: 5 },
      { id: "ganglions_gonfles", weight: 5 },
      { id: "fievre", weight: 2 },
      { id: "fatigue", weight: 2 },
      { id: "diarrhee", weight: 3 },
    ],
    recommendation: "Faites un test de dépistage VIH dans un centre de santé.",
    whenToConsult:
      "Dès que possible, la prise en charge précoce améliore considérablement le pronostic.",
    warning:
      "Sans traitement, l'infection évolue vers une immunodépression sévère.",
  },
  {
    id: "cholera",
    name: "Choléra",
    description:
      "Infection intestinale bactérienne aiguë, à transmission hydrique.",
    symptoms: [
      { id: "diarrhee_aqueuse", weight: 5 },
      { id: "vomissements", weight: 4 },
      { id: "deshydratation", weight: 5 },
      { id: "douleur_abdominale", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation: "Réhydratation immédiate (SRO) et consultation en urgence.",
    whenToConsult:
      "Immédiatement — le choléra peut déshydrater sévèrement en quelques heures.",
    warning: "Risque de décès rapide par déshydratation sévère si non traité.",
  },
  {
    id: "fievre_typhoide",
    name: "Fièvre typhoïde",
    description:
      "Infection bactérienne transmise par l'eau ou les aliments contaminés.",
    symptoms: [
      { id: "fievre", weight: 4 },
      { id: "douleur_abdominale", weight: 3 },
      { id: "maux_de_tete", weight: 2 },
      { id: "perte_appetit", weight: 3 },
      { id: "constipation", weight: 3 },
      { id: "diarrhee", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation:
      "Consultez pour un test sanguin (Widal ou hémoculture) et un traitement antibiotique adapté.",
    whenToConsult: "Dans les 48h si fièvre prolongée plus de 3 jours.",
    warning:
      "Peut entraîner des complications intestinales graves si non traitée.",
  },
  {
    id: "fievre_jaune",
    name: "Fièvre jaune",
    description:
      "Maladie virale transmise par moustique, prévenue par vaccination.",
    symptoms: [
      { id: "fievre", weight: 3 },
      { id: "jaunisse", weight: 5 },
      { id: "douleurs_musculaires", weight: 3 },
      { id: "maux_de_tete", weight: 2 },
      { id: "vomissements", weight: 3 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation:
      "Consultation urgente et isolement — maladie à déclaration obligatoire.",
    whenToConsult: "Immédiatement.",
    warning: "Peut évoluer vers une atteinte hépatique et hémorragique grave.",
  },
  {
    id: "rougeole",
    name: "Rougeole",
    description:
      "Maladie virale très contagieuse, surtout chez l'enfant non vacciné.",
    symptoms: [
      { id: "eruption_cutanee", weight: 5 },
      { id: "fievre", weight: 3 },
      { id: "toux", weight: 2 },
      { id: "nez_qui_coule", weight: 2 },
      { id: "malaise_general", weight: 2 },
    ],
    recommendation:
      "Isolement et consultation médicale, surtout chez l'enfant.",
    whenToConsult: "Dans les 24-48h.",
    warning:
      "Complications possibles : pneumonie, encéphalite chez les jeunes enfants.",
  },
  {
    id: "meningite",
    name: "Méningite",
    description:
      "Inflammation grave des méninges, souvent d'origine bactérienne.",
    symptoms: [
      { id: "raideur_nuque", weight: 5 },
      { id: "fievre", weight: 3 },
      { id: "maux_de_tete", weight: 4 },
      { id: "vomissements", weight: 2 },
      { id: "confusion", weight: 4 },
      { id: "convulsions", weight: 5 },
    ],
    recommendation: "Urgence médicale absolue.",
    whenToConsult: "Immédiatement, sans délai.",
    warning:
      "Peut être mortelle en quelques heures sans traitement antibiotique.",
  },
  {
    id: "tuberculose",
    name: "Tuberculose",
    description:
      "Infection bactérienne chronique touchant principalement les poumons.",
    symptoms: [
      { id: "toux_grasse", weight: 4 },
      { id: "crachats_sang", weight: 5 },
      { id: "perte_de_poids", weight: 4 },
      { id: "sueurs_nocturnes", weight: 4 },
      { id: "fievre", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation:
      "Consultez pour un test (radiographie, crachat) — traitement long mais efficace.",
    whenToConsult: "Si toux persistante de plus de 2 semaines.",
    warning:
      "Maladie contagieuse, nécessite un traitement complet pour éviter la résistance.",
  },
  {
    id: "dysenterie",
    name: "Dysenterie (shigellose)",
    description:
      "Infection intestinale bactérienne provoquant diarrhée sanglante.",
    symptoms: [
      { id: "sang_dans_selles", weight: 5 },
      { id: "diarrhee", weight: 4 },
      { id: "douleur_abdominale", weight: 3 },
      { id: "fievre", weight: 2 },
      { id: "vomissements", weight: 2 },
    ],
    recommendation:
      "Réhydratation et consultation pour traitement antibiotique si nécessaire.",
    whenToConsult: "Dans les 24h si sang dans les selles.",
    warning: "Risque de déshydratation et de complications intestinales.",
  },
  {
    id: "gastro_enterite",
    name: "Gastro-entérite aiguë",
    description:
      "Inflammation du tube digestif, souvent virale ou alimentaire.",
    symptoms: [
      { id: "diarrhee", weight: 4 },
      { id: "vomissements", weight: 3 },
      { id: "nausees", weight: 3 },
      { id: "douleur_abdominale", weight: 3 },
      { id: "fievre", weight: 2 },
    ],
    recommendation: "Hydratation abondante, alimentation légère.",
    whenToConsult:
      "Si les symptômes persistent plus de 3 jours ou si déshydratation.",
    warning:
      "Surveillez les signes de déshydratation, surtout chez les enfants.",
  },
  {
    id: "filariose_lymphatique",
    name: "Filariose lymphatique",
    description:
      "Maladie parasitaire chronique transmise par moustique, provoquant des gonflements.",
    symptoms: [
      { id: "gonflement_peau", weight: 5 },
      { id: "oedeme_jambes", weight: 5 },
      { id: "douleurs_articulaires", weight: 2 },
      { id: "fievre", weight: 2 },
    ],
    recommendation: "Consultation spécialisée pour traitement antiparasitaire.",
    whenToConsult: "Dès l'apparition de gonflements persistants des membres.",
    warning:
      "Peut évoluer vers un éléphantiasis irréversible sans traitement précoce.",
  },
  {
    id: "onchocercose",
    name: "Onchocercose (cécité des rivières)",
    description:
      "Maladie parasitaire transmise par mouche noire, pouvant affecter la vue.",
    symptoms: [
      { id: "demangeaisons", weight: 4 },
      { id: "troubles_vision", weight: 5 },
      { id: "eruption_cutanee", weight: 3 },
      { id: "plaques_rouges", weight: 3 },
    ],
    recommendation:
      "Consultation ophtalmologique et traitement antiparasitaire.",
    whenToConsult:
      "Dès l'apparition de troubles visuels ou démangeaisons persistantes.",
    warning: "Peut entraîner une cécité irréversible si non traitée.",
  },
  {
    id: "bilharziose",
    name: "Bilharziose (schistosomiase)",
    description: "Maladie parasitaire liée à l'eau douce contaminée.",
    symptoms: [
      { id: "sang_urines", weight: 5 },
      { id: "douleur_bas_ventre", weight: 3 },
      { id: "demangeaisons", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation:
      "Consultation pour test parasitologique et traitement adapté.",
    whenToConsult: "Si sang dans les urines ou selles.",
    warning: "Peut endommager la vessie et les reins à long terme.",
  },
  {
    id: "hepatite",
    name: "Hépatite virale",
    description: "Inflammation du foie d'origine virale (A, B ou C).",
    symptoms: [
      { id: "jaunisse", weight: 5 },
      { id: "urines_foncees", weight: 4 },
      { id: "fatigue", weight: 2 },
      { id: "perte_appetit", weight: 3 },
      { id: "douleur_abdominale", weight: 2 },
      { id: "nausees", weight: 2 },
    ],
    recommendation: "Consultation pour bilan hépatique complet.",
    whenToConsult: "Dès l'apparition de jaunisse.",
    warning:
      "Certaines formes peuvent évoluer vers une insuffisance hépatique chronique.",
  },
  {
    id: "trypanosomiase",
    name: "Trypanosomiase (maladie du sommeil)",
    description: "Maladie parasitaire transmise par la mouche tsé-tsé.",
    symptoms: [
      { id: "somnolence_anormale", weight: 5 },
      { id: "ganglions_gonfles", weight: 3 },
      { id: "confusion", weight: 4 },
      { id: "fievre", weight: 2 },
      { id: "maux_de_tete", weight: 2 },
    ],
    recommendation:
      "Consultation spécialisée urgente pour diagnostic parasitologique.",
    whenToConsult: "Dès les premiers signes neurologiques.",
    warning: "Sans traitement, évolution vers coma et décès possible.",
  },
  {
    id: "grippe",
    name: "Grippe",
    description: "Infection virale respiratoire saisonnière.",
    symptoms: [
      { id: "fievre", weight: 3 },
      { id: "toux", weight: 2 },
      { id: "douleurs_musculaires", weight: 3 },
      { id: "mal_de_gorge", weight: 2 },
      { id: "nez_qui_coule", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation: "Repos, hydratation, traitement symptomatique.",
    whenToConsult: "Si symptômes sévères ou persistants plus de 7 jours.",
    warning: "Peut se compliquer en pneumonie chez les personnes fragiles.",
  },
  {
    id: "pneumonie",
    name: "Pneumonie",
    description: "Infection pulmonaire pouvant être bactérienne ou virale.",
    symptoms: [
      { id: "difficulte_respirer", weight: 4 },
      { id: "douleur_thoracique", weight: 4 },
      { id: "toux_grasse", weight: 3 },
      { id: "respiration_rapide", weight: 4 },
      { id: "fievre", weight: 3 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation:
      "Consultation médicale rapide, radiographie pulmonaire recommandée.",
    whenToConsult: "Dans les 24h, surtout chez l'enfant ou la personne âgée.",
    warning: "Peut évoluer rapidement vers une détresse respiratoire grave.",
  },
  {
    id: "covid19",
    name: "COVID-19",
    description: "Infection virale respiratoire due au SARS-CoV-2.",
    symptoms: [
      { id: "perte_odorat", weight: 6 },
      { id: "perte_gout", weight: 6 },
      { id: "toux_seche", weight: 3 },
      { id: "fievre", weight: 3 },
      { id: "difficulte_respirer", weight: 3 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation: "Test de dépistage et isolement.",
    whenToConsult: "Si difficulté à respirer ou symptômes sévères.",
    warning:
      "Peut évoluer vers une détresse respiratoire chez les personnes à risque.",
  },
  {
    id: "hypertension",
    name: "Hypertension artérielle",
    description:
      "Élévation chronique de la pression artérielle, très répandue au Cameroun.",
    symptoms: [
      { id: "maux_de_tete", weight: 3 },
      { id: "vertiges", weight: 3 },
      { id: "palpitations", weight: 3 },
      { id: "troubles_vision", weight: 3 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation:
      "Mesure régulière de la tension et consultation pour bilan cardiovasculaire.",
    whenToConsult:
      "Rapidement si maux de tête sévères associés à des troubles visuels.",
    warning: "Facteur de risque majeur d'AVC et d'infarctus si non contrôlée.",
  },
  {
    id: "diabete",
    name: "Diabète",
    description:
      "Maladie métabolique chronique caractérisée par un excès de sucre dans le sang.",
    symptoms: [
      { id: "soif_excessive", weight: 5 },
      { id: "envie_uriner_frequente", weight: 5 },
      { id: "perte_de_poids", weight: 4 },
      { id: "troubles_vision", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation: "Test de glycémie et consultation pour prise en charge.",
    whenToConsult: "Rapidement, surtout en cas de perte de poids inexpliquée.",
    warning:
      "Non traité, peut entraîner des complications graves (rein, yeux, nerfs).",
  },
  {
    id: "avc",
    name: "Accident vasculaire cérébral (AVC)",
    description:
      "Interruption soudaine de la circulation sanguine dans le cerveau.",
    symptoms: [
      { id: "engourdissement", weight: 5 },
      { id: "confusion", weight: 4 },
      { id: "troubles_vision", weight: 4 },
      { id: "perte_connaissance", weight: 5 },
      { id: "maux_de_tete", weight: 2 },
      { id: "vertiges", weight: 2 },
    ],
    recommendation: "Urgence médicale absolue.",
    whenToConsult: "Immédiatement — chaque minute compte.",
    warning:
      "Risque de séquelles graves ou de décès sans prise en charge rapide.",
  },
  {
    id: "insuffisance_cardiaque",
    name: "Insuffisance cardiaque",
    description: "Incapacité du cœur à assurer un débit sanguin suffisant.",
    symptoms: [
      { id: "oedeme_jambes", weight: 4 },
      { id: "difficulte_respirer", weight: 4 },
      { id: "douleur_poitrine_effort", weight: 4 },
      { id: "palpitations", weight: 3 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation: "Consultation cardiologique pour bilan complet.",
    whenToConsult: "Rapidement si essoufflement au moindre effort.",
    warning: "Peut s'aggraver brutalement en décompensation aiguë.",
  },
  {
    id: "asthme",
    name: "Asthme",
    description: "Maladie inflammatoire chronique des voies respiratoires.",
    symptoms: [
      { id: "respiration_sifflante", weight: 5 },
      { id: "difficulte_respirer", weight: 4 },
      { id: "toux_seche", weight: 3 },
      { id: "douleur_thoracique", weight: 2 },
    ],
    recommendation:
      "Consultation pour bilan respiratoire et traitement de fond.",
    whenToConsult: "En cas de crise ne répondant pas au traitement habituel.",
    warning: "Une crise sévère peut mettre en jeu le pronostic vital.",
  },
  {
    id: "ulcere_gastrique",
    name: "Ulcère gastrique",
    description:
      "Lésion de la paroi de l'estomac, souvent liée à l'acidité ou une bactérie.",
    symptoms: [
      { id: "brulures_estomac", weight: 5 },
      { id: "douleur_abdominale", weight: 3 },
      { id: "nausees", weight: 2 },
      { id: "perte_appetit", weight: 2 },
    ],
    recommendation: "Consultation pour endoscopie si symptômes persistants.",
    whenToConsult:
      "Si douleur persistante ou sang dans les selles/vomissements.",
    warning: "Risque de perforation ou d'hémorragie digestive.",
  },
  {
    id: "drepanocytose",
    name: "Drépanocytose",
    description:
      "Maladie génétique du sang très fréquente en Afrique subsaharienne.",
    symptoms: [
      { id: "douleurs_articulaires", weight: 4 },
      { id: "pale", weight: 4 },
      { id: "jaunisse", weight: 3 },
      { id: "douleur_abdominale", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation: "Suivi médical spécialisé régulier.",
    whenToConsult:
      "En cas de crise douloureuse intense (crise vaso-occlusive).",
    warning:
      "Les crises peuvent être graves et nécessiter une hospitalisation urgente.",
  },
  {
    id: "cancer",
    name: "Cancer (généraliste)",
    description:
      "Prolifération anormale de cellules pouvant toucher divers organes.",
    symptoms: [
      { id: "perte_de_poids", weight: 4 },
      { id: "ganglions_gonfles", weight: 4 },
      { id: "malaise_general", weight: 2 },
      { id: "perte_appetit", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation:
      "Consultation pour bilan approfondi et examens complémentaires.",
    whenToConsult: "Dès l'apparition de signes persistants et inexpliqués.",
    warning:
      "Le diagnostic précoce améliore considérablement les chances de traitement.",
  },
  {
    id: "infection_urinaire",
    name: "Infection urinaire",
    description: "Infection bactérienne du système urinaire.",
    symptoms: [
      { id: "brulures_urinaires", weight: 5 },
      { id: "envie_uriner_frequente", weight: 3 },
      { id: "douleur_bas_ventre", weight: 3 },
      { id: "urines_foncees", weight: 2 },
      { id: "fievre", weight: 2 },
    ],
    recommendation:
      "Consultation pour analyse d'urine et traitement antibiotique.",
    whenToConsult: "Dans les 48h, surtout si fièvre associée.",
    warning: "Peut évoluer vers une pyélonéphrite si non traitée.",
  },
  {
    id: "otite",
    name: "Otite",
    description: "Infection ou inflammation de l'oreille.",
    symptoms: [
      { id: "douleur_oreille", weight: 5 },
      { id: "ecoulement_oreille", weight: 4 },
      { id: "baisse_audition", weight: 3 },
      { id: "fievre", weight: 2 },
    ],
    recommendation: "Consultation ORL, traitement antibiotique si nécessaire.",
    whenToConsult: "Dans les 48h si douleur intense ou fièvre.",
    warning:
      "Peut affecter l'audition si non traitée à temps, surtout chez l'enfant.",
  },
  {
    id: "sinusite",
    name: "Sinusite / rhinopharyngite",
    description:
      "Inflammation des sinus ou des voies respiratoires supérieures.",
    symptoms: [
      { id: "nez_bouche", weight: 4 },
      { id: "nez_qui_coule", weight: 3 },
      { id: "maux_de_tete", weight: 3 },
      { id: "mal_de_gorge", weight: 2 },
      { id: "fievre", weight: 2 },
    ],
    recommendation: "Repos, décongestionnants, consultation si persistance.",
    whenToConsult: "Si symptômes durent plus de 10 jours.",
    warning: "Peut se compliquer en sinusite bactérienne prolongée.",
  },
  {
    id: "malnutrition",
    name: "Malnutrition aiguë",
    description:
      "Carence nutritionnelle sévère, particulièrement grave chez l'enfant.",
    symptoms: [
      { id: "perte_de_poids", weight: 5 },
      { id: "pale", weight: 3 },
      { id: "perte_appetit", weight: 3 },
      { id: "malaise_general", weight: 2 },
      { id: "fatigue", weight: 2 },
    ],
    recommendation:
      "Consultation nutritionnelle urgente, surtout chez l'enfant.",
    whenToConsult:
      "Immédiatement chez l'enfant présentant un retard de croissance.",
    warning:
      "Peut être mortelle chez le jeune enfant sans prise en charge rapide.",
  },
];

module.exports = conditions;
