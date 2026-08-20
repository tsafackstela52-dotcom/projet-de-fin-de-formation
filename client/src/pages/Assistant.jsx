// src/pages/Assistant.jsx
// =========================================================================
// ASSISTANT MEDICAL VITALIS - VERSION ULTRA-PREMIUM (UX / UI AVANCÉE)
// =========================================================================

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
import {
  AlertCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Bot,
  User,
  Loader2,
} from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

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
      const response = await fetch("https://projet-de-fin-de-formation-0opo.onrename.com/api/history", {
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
      const response = await fetch("https://projet-de-fin-de-formation-0opo.onrename.com/api/analysis/start", {
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
      setError("Connexion au serveur impossible. Vérifiez votre réseau.");
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
    setLoading(true);

    try {
      const response = await fetch(
        "https://projet-de-fin-de-formation-0opo.onrename.com/api/analysis/answer",
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
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-[#F6F7F2] flex items-center justify-center p-2 sm:p-6 relative overflow-hidden select-none">
      {/* Halos de fond dynamiques */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1F3A34]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C98A3A]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Conteneur App Principal */}
      <div className="w-full max-w-4xl bg-white/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-[#1F3A34]/10 shadow-2xl shadow-[#1F3A34]/5 flex flex-col h-[92vh] sm:h-[88vh] relative z-10 overflow-hidden">
        {/* Barre de navigation / Header de l'Assistant */}
        <header className="px-5 py-3.5 bg-white/90 border-b border-[#1F3A34]/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-[#1F3A34] flex items-center justify-center text-[#F6F7F2] shadow-md shadow-[#1F3A34]/20">
                <Bot size={20} className="text-[#C98A3A]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1
                  className="text-sm font-bold text-[#1F3A34]"
                  style={BODY_STYLE}
                >
                  Assistant Vitalis
                </h1>
                <span className="text-[10px] font-semibold bg-[#1F3A34]/5 text-[#1F3A34]/70 px-2 py-0.5 rounded-full">
                  v2.4
                </span>
              </div>
              <p
                className="text-[11px] text-[#5C7A6E] flex items-center gap-1"
                style={BODY_STYLE}
              >
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>Analyse confidentielle & sécurisée</span>
              </p>
            </div>
          </div>

          {/* Actions d'en-tête */}
          {symptoms.length > 0 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A34] hover:text-[#C98A3A] bg-[#1F3A34]/5 hover:bg-[#C98A3A]/10 px-3 py-2 rounded-xl transition-all duration-200"
              style={BODY_STYLE}
              title="Recommencer une consultation"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Nouvelle consultation</span>
            </button>
          )}
        </header>

        {/* Zone de flux de discussion principal */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#1F3A34]/15 hover:scrollbar-thumb-[#1F3A34]/30">
          {/* Écran d'accueil sans symptômes */}
          {symptoms.length === 0 && <HeroIllustration />}

          <WelcomeMessage
            hasSymptoms={symptoms.length > 0}
            onSuggestionClick={handleSuggestionClick}
          />

          {/* Message de description envoyé par l'utilisateur */}
          {symptoms.length > 0 && (
            <div className="flex justify-end items-start gap-2.5 my-2 animate-fadeIn">
              <div
                className="max-w-[85%] sm:max-w-[75%] bg-[#1F3A34] text-[#F6F7F2] p-4 rounded-2xl rounded-tr-xs shadow-lg shadow-[#1F3A34]/10 text-sm leading-relaxed"
                style={BODY_STYLE}
              >
                <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-white/10">
                  <span className="text-[10px] font-bold tracking-wider text-[#C98A3A] uppercase">
                    Votre description
                  </span>
                  <span className="text-[10px] text-white/50">Transmis</span>
                </div>
                <p className="whitespace-pre-wrap">{description}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#C98A3A]/20 border border-[#C98A3A]/40 flex items-center justify-center shrink-0 text-[#1F3A34]">
                <User size={16} />
              </div>
            </div>
          )}

          {/* Indicateur d'analyse en cours */}
          {loading && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#1F3A34]/10 shadow-sm animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-[#1F3A34]/10 flex items-center justify-center text-[#1F3A34]">
                <Loader2 size={18} className="animate-spin text-[#C98A3A]" />
              </div>
              <div>
                <p
                  className="text-xs font-bold text-[#1F3A34]"
                  style={BODY_STYLE}
                >
                  Analyse médicale IA en cours...
                </p>
                <p className="text-[11px] text-[#5C7A6E]" style={BODY_STYLE}>
                  Traitement des symptômes et croisement des données.
                </p>
              </div>
            </div>
          )}

          {/* Synthèses & Blocs de résultats */}
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

          {/* Bandeau d'erreur élégant */}
          {error && (
            <div
              className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium shadow-sm animate-bounce"
              style={BODY_STYLE}
            >
              <AlertCircle size={18} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}
        </main>

        {/* Footer / Champ de saisie fixe */}
        <div className="p-3 sm:p-4 bg-white/95 border-t border-[#1F3A34]/10 shrink-0">
          <Footer
            description={description}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
            loading={loading}
            disabled={symptoms.length > 0}
          />
        </div>
      </div>
    </div>
  );
}

export default Assistant;
