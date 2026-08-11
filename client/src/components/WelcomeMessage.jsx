const SUGGESTIONS = [
  "J'ai de la fièvre et mal à la tête depuis 2 jours",
  "Toux sèche, fatigue et frissons intense",
  "Maux de ventre aigu, nausées après avoir mangé",
  "Mal de gorge fort et nez qui coule",
];

function WelcomeMessage({ hasSymptoms, onSuggestionClick }) {
  return (
    <div className="chat-msg assistant animate-slide">
      👋 Bonjour ! Décrivez librement ce que vous ressentez (douleurs,
      symptômes, durée). Je vais poser quelques questions ciblées pour vous
      donner un plan d'orientation rapide.
      {!hasSymptoms && (
        <div className="suggestions-grid">
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              className="chip-suggestion"
              onClick={() => onSuggestionClick(s)}
            >
              "{s}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default WelcomeMessage;