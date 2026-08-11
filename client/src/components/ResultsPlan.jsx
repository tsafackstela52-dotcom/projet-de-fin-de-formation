function ResultsPlan({ nextQuestion, validResults, confidenceMessage }) {
  if (nextQuestion || validResults.length === 0) return null;

  return (
    <div className="chat-msg assistant animate-slide" style={{ width: "100%", maxWidth: "100%" }}>
      <div className="plan-card">
        <div className="plan-title">📋 Bilan d'orientation & Conseils</div>
        {confidenceMessage && (
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "14px" }}>
            {confidenceMessage}
          </p>
        )}

        {validResults.map((result) => {
          const scoreClass =
            result.percentage >= 60 ? "score-high" : result.percentage >= 35 ? "score-medium" : "score-low";
          return (
            <div key={result.id} className="hypothesis-item">
              <div className="hypothesis-header">
                <span className="hypothesis-name">{result.name}</span>
                <span className={`badge-score ${scoreClass}`}>{result.percentage}% d'adéquation</span>
              </div>
              {result.recommendation && (
                <div className="action-box">
                  <strong>Conduite recommandée :</strong> {result.recommendation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultsPlan;