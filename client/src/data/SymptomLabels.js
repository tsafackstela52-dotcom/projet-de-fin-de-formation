// ==================================================
// LABELS DES SYMPTÔMES (affichage uniquement)
// ==================================================
//
// Ce fichier vit côté FRONTEND uniquement.
// Le backend ne travaille qu'avec les id (ex: "fievre"),
// jamais avec le texte affiché à l'utilisateur.
//
// Importé par : SymptomsSummary.jsx, ResultsPlan.jsx
// (import symptomLabels from "../data/symptomLabels";)

const symptomLabels = {
  // Général / systémique
  fievre: "Fièvre",
  frissons: "Frissons",
  fatigue: "Fatigue",
  perte_de_poids: "Perte de poids",
  perte_appetit: "Perte d'appétit",
  sueurs_nocturnes: "Sueurs nocturnes",
  malaise_general: "Malaise général",
  soif_excessive: "Soif excessive",
  envie_uriner_frequente: "Envie fréquente d'uriner",
  pale: "Pâleur",
  jaunisse: "Jaunisse",
  ganglions_gonfles: "Ganglions gonflés",
  deshydratation: "Déshydratation",
  insomnie: "Insomnie",
  somnolence: "Somnolence",

  // Respiratoire
  toux: "Toux",
  toux_seche: "Toux sèche",
  toux_grasse: "Toux grasse",
  crachats_sang: "Crachats de sang",
  difficulte_respirer: "Difficulté à respirer",
  respiration_rapide: "Respiration rapide",
  respiration_sifflante: "Respiration sifflante",
  douleur_thoracique: "Douleur thoracique",
  douleur_respirer: "Douleur en respirant",
  nez_bouche: "Nez bouché",
  nez_qui_coule: "Nez qui coule",
  eternuements: "Éternuements",
  perte_odorat: "Perte de l'odorat",
  perte_gout: "Perte du goût",
  voix_enrouee: "Voix enrouée",

  // Digestif
  douleur_abdominale: "Douleur abdominale",
  vomissements: "Vomissements",
  nausees: "Nausées",
  diarrhee: "Diarrhée",
  diarrhee_aqueuse: "Diarrhée aqueuse",
  constipation: "Constipation",
  ballonnements: "Ballonnements",
  sang_dans_selles: "Sang dans les selles",
  perte_appetit_digestif: "Dégoût de la nourriture",
  brulures_estomac: "Brûlures d'estomac",

  // Neurologique
  maux_de_tete: "Maux de tête",
  vertiges: "Vertiges",
  convulsions: "Convulsions",
  confusion: "Confusion",
  perte_connaissance: "Perte de connaissance",
  raideur_nuque: "Raideur de la nuque",
  engourdissement: "Engourdissement",
  troubles_vision: "Troubles de la vision",
  somnolence_anormale: "Somnolence anormale",

  // ORL
  mal_de_gorge: "Mal de gorge",
  difficulte_avaler: "Difficulté à avaler",
  douleur_oreille: "Douleur à l'oreille",
  ecoulement_oreille: "Écoulement de l'oreille",
  baisse_audition: "Baisse de l'audition",

  // Cutané
  demangeaisons: "Démangeaisons",
  eruption_cutanee: "Éruption cutanée",
  plaques_rouges: "Plaques rouges",
  gonflement_peau: "Gonflement de la peau",
  ulceres_peau: "Ulcères sur la peau",

  // Musculo-squelettique
  douleurs_musculaires: "Douleurs musculaires",
  douleurs_articulaires: "Douleurs articulaires",
  gonflement_articulations: "Gonflement des articulations",
  raideur_articulaire: "Raideur articulaire",

  // Urinaire / génital
  brulures_urinaires: "Brûlures urinaires",
  urines_foncees: "Urines foncées",
  sang_urines: "Sang dans les urines",
  douleur_bas_ventre: "Douleur au bas ventre",

  // Cardiovasculaire
  palpitations: "Palpitations",
  oedeme_jambes: "Jambes gonflées",
  douleur_poitrine_effort: "Douleur à la poitrine à l'effort",

  // Signes d'alerte
  saignement_abondant: "Saignement abondant",
  detresse_respiratoire_severe: "Détresse respiratoire sévère",
  coma: "Coma",
};

export default symptomLabels;
