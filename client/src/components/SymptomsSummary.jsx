import symptomLabels from "../data/SymptomLabels";

function SymptomsSummary({ symptoms }) {
  if (symptoms.length === 0) return null;
  return (
    <div className="chat-msg assistant animate-slide">
      📍 <strong>Symptômes identifiés :</strong>
      <div className="symptom-chips">
        {symptoms.map((s) => (
          <span key={s} className="symptom-chip-badge">
            ✓ {symptomLabels[s] || s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SymptomsSummary;
