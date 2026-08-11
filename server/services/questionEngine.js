// ==================================================
// CHERCHER LA PROCHAINE QUESTION (depuis MongoDB)
// ==================================================

const Question = require("../models/Question");

const MAX_QUESTIONS = 8;

const findNextQuestion = async (
  detectedSymptoms,
  results,
  answeredQuestions = [],
) => {
  if (answeredQuestions.length >= MAX_QUESTIONS) {
    return null;
  }

  const validResults = results.filter((result) => result.percentage > 0);

  if (validResults.length === 0) {
    return null;
  }

  const bestPercentage = validResults[0].percentage;

  const topConditions = validResults.filter(
    (result) => result.percentage === bestPercentage,
  );

  const topConditionIds = topConditions.map((condition) => condition.id);

  const questionsList = await Question.find({});

  const nextQuestion = questionsList.find((question) => {
    const alreadyAsked = answeredQuestions.includes(question.questionId);
    const alreadyKnown = detectedSymptoms.includes(question.symptom);
    const concernsTopCondition = question.conditions.some((conditionId) =>
      topConditionIds.includes(conditionId),
    );

    return !alreadyAsked && !alreadyKnown && concernsTopCondition;
  });

  if (!nextQuestion) {
    return null;
  }

  return {
    id: nextQuestion.questionId,
    question: nextQuestion.question,
    symptom: nextQuestion.symptom,
    conditions: nextQuestion.conditions,
  };
};

module.exports = {
  findNextQuestion,
};
