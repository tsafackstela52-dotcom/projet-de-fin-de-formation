import { useState } from "react";
import "../App.css";
import Footer from "../components/Footer";
import WelcomeMessage from "../components/WelcomeMessage";
import SymptomsSummary from "../components/SymptomsSummary";
import AlertBanner from "../components/AlertBanner";
import QuestionCard from "../components/QuestionCard";
import ResultsPlan from "../components/ResultsPlan";
import HeroIllustration from "../components/HeroIllustration";
import { useAuth } from "../context/AuthContext";

export function Assistant() {
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [results, setResults] = useState([]);
  const [confidenceMessage, setConfidenceMessage] = useState("");
  const [nextQuestion, setNextQuestion] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useAuth();

  // ==================================================
  // SAUVEGARDER UNE ANALYSE TERMINEE DANS L'HISTORIQUE
  // ==================================================

  const saveToHistory = async (data, descriptionUtilisee) => {
    try {
      const response = await fetch("http://localhost:5000/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: descriptionUtilisee,
          symptoms: data.symptoms,
          results: data.results,
          confidenceMessage: data.confidenceMessage,
          alerts: data.alerts,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Erreur lors de la sauvegarde :", errData.message);
      }
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de l'historique :", err);
    }
  };

  const startAnalysis = async (textToAnalyze) => {
    const text = textToAnalyze || description;
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/analysis/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Erreur lors de l'analyse.");

      setSymptoms(data.symptoms || []);
      setResults(data.results || []);
      setConfidenceMessage(data.confidenceMessage || "");
      setNextQuestion(data.nextQuestion || null);
      setAlerts(data.alerts || []);
      setAnsweredQuestions(data.answeredQuestions || []);

      if (!data.nextQuestion) {
        saveToHistory(data, text);
      }
    } catch (err) {
      console.error(err);
      setError("Connexion au serveur impossible.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startAnalysis(description);
  };

  const handleSuggestionClick = (promptText) => {
    setDescription(promptText);
    startAnalysis(promptText);
  };

  const handleAnswer = async (answer) => {
    if (!nextQuestion) return;
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/analysis/answer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            symptoms,
            questionId: nextQuestion.id,
            answer,
            answeredQuestions,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Erreur de mise à jour.");

      setSymptoms(data.symptoms || []);
      setResults(data.results || []);
      setConfidenceMessage(data.confidenceMessage || "");
      setNextQuestion(data.nextQuestion || null);
      setAlerts(data.alerts || []);
      setAnsweredQuestions(data.answeredQuestions || []);

      if (!data.nextQuestion) {
        saveToHistory(data, description);
      }
    } catch (err) {
      console.error(err);
      setError("Impossible d'enregistrer la réponse.");
    }
  };

  const handleReset = () => {
    setDescription("");
    setSymptoms([]);
    setResults([]);
    setConfidenceMessage("");
    setNextQuestion(null);
    setAlerts([]);
    setAnsweredQuestions([]);
    setError("");
  };

  const validResults = results.filter((r) => r.percentage > 0);

  return (
    <div className="app-container">
      <div className="app-card">
        <main className="chat-stream">
          {symptoms.length === 0 && <HeroIllustration />}
          <WelcomeMessage
            hasSymptoms={symptoms.length > 0}
            onSuggestionClick={handleSuggestionClick}
          />

          {symptoms.length > 0 && (
            <div className="chat-msg user animate-slide">{description}</div>
          )}

          <SymptomsSummary symptoms={symptoms} />
          <AlertBanner alerts={alerts} />
          <QuestionCard
            nextQuestion={nextQuestion}
            answeredQuestions={answeredQuestions}
            onAnswer={handleAnswer}
          />
          <ResultsPlan
            nextQuestion={nextQuestion}
            validResults={validResults}
            confidenceMessage={confidenceMessage}
          />

          {error && (
            <div
              className="chat-msg assistant"
              style={{ backgroundColor: "#fef2f2", color: "#991b1b" }}
            >
              ⚠️ {error}
            </div>
          )}
        </main>

        <Footer
          description={description}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
          loading={loading}
          disabled={symptoms.length > 0}
        />
      </div>
    </div>
  );
}

export default Assistant;
