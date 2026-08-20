// src/pages/AdminDashboard.jsx
// =========================================================================
// PAGE /admin - TABLEAU DE BORD ADMINISTRATEUR ULTRA-PREMIUM
// =========================================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Activity,
  HelpCircle,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Database,
  PlusCircle,
  AlertCircle,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const STATS_CONFIG = [
  {
    key: "conditions",
    label: "Maladies répertoriées",
    description: "Pathologies & diagnostics",
    to: "/admin/maladies",
    icon: Stethoscope,
    endpoint: "conditions",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    key: "symptoms",
    label: "Symptômes enregistrés",
    description: "Signes cliniques & manifestations",
    to: "/admin/symptomes",
    icon: Activity,
    endpoint: "symptoms",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    key: "questions",
    label: "Questions d'orientation",
    description: "Arbre de décision médical",
    to: "/admin/questions",
    icon: HelpCircle,
    endpoint: "questions",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    key: "users",
    label: "Comptes Utilisateurs",
    description: "Membres & administrateurs",
    to: "/admin/utilisateurs",
    icon: Users,
    endpoint: "users",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
  },
];

export function AdminDashboard() {
  const { token } = useAuth();
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCounts = async () => {
    setLoading(true);
    setError("");
    try {
      const results = await Promise.all(
        STATS_CONFIG.map((s) =>
          fetch(`https://projet-de-fin-de-formation-0opo.onrender.com/api/admin/${s.endpoint}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => {
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`);
            return r.json();
          }),
        ),
      );

      const nextCounts = {};
      STATS_CONFIG.forEach((s, i) => {
        nextCounts[s.key] = (results[i][s.endpoint] || []).length;
      });

      setCounts(nextCounts);
    } catch (err) {
      console.error("Erreur lors du chargement des statistiques :", err);
      setError("Impossible de synchroniser le tableau de bord.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCounts();
  }, [token]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* En-tête du Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F3A34]/10 pb-6">
        <div>
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C98A3A] bg-[#C98A3A]/10 px-3 py-1 rounded-full mb-2"
            style={BODY_STYLE}
          >
            <ShieldCheck size={14} />
            <span>Administration Vitalis</span>
          </div>

          <h1
            className="text-3xl font-medium text-[#1F3A34]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Tableau de bord
          </h1>
          <p className="text-xs text-[#5C7A6E] mt-1" style={BODY_STYLE}>
            Supervisez la base de connaissances médicale et la gestion des
            comptes.
          </p>
        </div>

        {/* Bouton de rafraîchissement manuel */}
        <button
          onClick={fetchCounts}
          disabled={loading}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1F3A34] bg-white border border-[#1F3A34]/15 hover:bg-[#1F3A34]/5 px-4 py-2.5 rounded-xl transition-all shadow-sm self-start sm:self-auto"
          style={BODY_STYLE}
        >
          <RefreshCw
            size={14}
            className={loading ? "animate-spin text-[#C98A3A]" : ""}
          />
          <span>Rafraîchir les données</span>
        </button>
      </div>

      {/* Message d'erreur de chargement */}
      {error && (
        <div
          className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between"
          style={BODY_STYLE}
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchCounts}
            className="underline font-bold hover:text-red-900"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Grille des Cartes Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS_CONFIG.map(
          ({ key, label, description, to, icon: Icon, badgeColor }) => (
            <Link
              key={key}
              to={to}
              className="group relative rounded-2xl bg-white border border-[#1F3A34]/10 p-6 hover:border-[#1F3A34]/30 hover:shadow-xl hover:shadow-[#1F3A34]/5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Effet décoratif au survol */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1F3A34]/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#1F3A34]/8 text-[#1F3A34] group-hover:bg-[#1F3A34] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>

                  <div className="p-1.5 rounded-lg text-[#5C7A6E] group-hover:text-[#1F3A34] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Valeur Numérique */}
                <div
                  className="text-3xl font-semibold text-[#1F3A34] mb-1"
                  style={{ fontFamily: "Newsreader, serif" }}
                >
                  {loading ? (
                    <div className="h-9 bg-[#1F3A34]/10 rounded-lg w-16 animate-pulse" />
                  ) : (
                    (counts[key] ?? 0)
                  )}
                </div>

                <div
                  className="text-xs font-bold text-[#1F3A34]"
                  style={BODY_STYLE}
                >
                  {label}
                </div>
                <p
                  className="text-[11px] text-[#5C7A6E] mt-0.5"
                  style={BODY_STYLE}
                >
                  {description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1F3A34]/5 flex items-center justify-between">
                <span
                  className="text-[10px] font-semibold text-[#5C7A6E]"
                  style={BODY_STYLE}
                >
                  Gérer le module
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C98A3A] group-hover:scale-150 transition-transform" />
              </div>
            </Link>
          ),
        )}
      </div>

      {/* Section : Raccourcis d'administration rapide */}
      <div className="rounded-3xl bg-white border border-[#1F3A34]/10 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Database size={18} className="text-[#C98A3A]" />
          <h2 className="text-sm font-bold text-[#1F3A34]" style={BODY_STYLE}>
            Actions Rapides de Base Médicale
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/admin/maladies"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F6F7F2] hover:bg-[#1F3A34]/5 border border-[#1F3A34]/10 transition-colors text-xs font-semibold text-[#1F3A34]"
            style={BODY_STYLE}
          >
            <PlusCircle size={16} className="text-[#C98A3A]" />
            <span>Ajouter une maladie</span>
          </Link>

          <Link
            to="/admin/symptomes"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F6F7F2] hover:bg-[#1F3A34]/5 border border-[#1F3A34]/10 transition-colors text-xs font-semibold text-[#1F3A34]"
            style={BODY_STYLE}
          >
            <PlusCircle size={16} className="text-[#C98A3A]" />
            <span>Créer un symptôme</span>
          </Link>

          <Link
            to="/admin/questions"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F6F7F2] hover:bg-[#1F3A34]/5 border border-[#1F3A34]/10 transition-colors text-xs font-semibold text-[#1F3A34]"
            style={BODY_STYLE}
          >
            <PlusCircle size={16} className="text-[#C98A3A]" />
            <span>Configurer une question</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
