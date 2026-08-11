const startMedicalAnalysis = (description) => {
  return {
    description: description,
    status: "started",
    symptoms: [],
    possibleConditions: [],
    nextQuestion: null,
  };
};

module.exports = {
  startMedicalAnalysis,
};
