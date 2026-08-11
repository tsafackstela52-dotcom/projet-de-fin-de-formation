const MAX_QUESTIONS = 8;

function QuestionCard({ nextQuestion, answeredQuestions, onAnswer }) {
  if (!nextQuestion) return null;
  const progressPercent = Math.round((answeredQuestions.length / MAX_QUESTIONS) * 100);

  return (
    <div className="interactive-card animate-slide">
      <div className="progress-bar-wrapper">
        <div className="progress-info">
          <span>Question {answeredQuestions.length + 1} / {MAX_QUESTIONS}</span>
          <span>{progressPercent}% complété</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill-line" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="question-prompt">{nextQuestion.question}</div>

      <div className="btn-group-choice">
        <button type="button" onClick={() => onAnswer(true)} className="btn-choice-action btn-yes">Oui</button>
        <button type="button" onClick={() => onAnswer(false)} className="btn-choice-action btn-no">Non</button>
      </div>
    </div>
  );
}

export default QuestionCard;