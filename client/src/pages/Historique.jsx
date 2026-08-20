// src/pages/Historique.jsx
// =========================================================================
// PAGE /historique - HISTORIQUE ULTRA-PREMIUM DES ANALYSES MEDICALES
// =========================================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  ChevronRight,
  Inbox,
  Search,
  Trash2,
  AlertTriangle,
  X,
  Activity,
  Sparkles,
  FileText,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function formaterDate(dateString) {
  if (!dateString) return "Date inconnue";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function meilleurResultat(results) {
  if (!results || results.length === 0) return null;
  const valides = results.filter((r) => r.percentage > 0);
  if (valides.length === 0) return null;
  return valides.sort((a, b) => b.percentage - a.percentage)[0];
}

export function Historique() {
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Pour la modale de détails
  const [deletingId, setDeletingId] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const response = await fetch("https://projet-de-fin-de-formation-0opo.onrename.com/api/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur lors du chargement.");
        }

        setHistorique(data.history || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger votre historique d'analyses.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchHistorique();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Supprimer un élément de l'historique
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (
      !window.confirm(
        "Voulez-vous vraiment supprimer cette analyse de votre historique ?",
      )
    )
      return;

    setDeletingId(id);
    try {
      const response = await fetch(`https://projet-de-fin-de-formation-0opo.onrename.com/api/history/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression.");
      }

      setHistorique((prev) => prev.filter((item) => item._id !== id));
      if (selectedItem?._id === id) setSelectedItem(null);
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer cette analyse.");
    } finally {
      setDeletingId(null);
    }
  };

  // Filtrage par terme de recherche
  const historiqueFiltre = historique.filter((item) => {
    const desc = item.description?.toLowerCase() || "";
    const symptomsStr = item.symptoms?.join(" ")?.toLowerCase() || "";
    const query = searchTerm.toLowerCase();
    return desc.includes(query) || symptomsStr.includes(query);
  });

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-4 sm:px-6 py-10 sm:py-14 relative">
      {/* Halos d'ambiance visuelle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1F3A34]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-3xl relative z-10">
        {/* En-tête de section */}
        <div className="mb-8 text-center sm:text-left">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C98A3A] bg-[#C98A3A]/10 px-3 py-1 rounded-full mb-3"
            style={BODY_STYLE}
          >
            <Activity size={13} />
            <span>Journal de santé personnel</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-normal text-[#1F3A34] mb-2"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Historique des Analyses
          </h1>

          <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
            Retrouvez le récapitulatif sécurisé de toutes vos consultations
            passées.
          </p>
        </div>

        {/* Barre de recherche & Statistiques rapides */}
        {historique.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C7A6E]"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par symptôme, mot-clé..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-md rounded-2xl border border-[#1F3A34]/15 text-xs text-[#1F3A34] focus:outline-none focus:ring-2 focus:ring-[#1F3A34]/20 transition-all placeholder:text-[#5C7A6E]/60"
                style={BODY_STYLE}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C7A6E] hover:text-[#1F3A34]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <span
              className="text-xs text-[#5C7A6E] font-medium self-end sm:self-center"
              style={BODY_STYLE}
            >
              {historiqueFiltre.length} analyse
              {historiqueFiltre.length > 1 ? "s" : ""} trouvée
              {historiqueFiltre.length > 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Squelette de chargement (Skeleton UI) */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white/60 border border-[#1F3A34]/10 rounded-2xl p-5 space-y-3"
              >
                <div className="h-4 bg-[#1F3A34]/10 rounded-md w-1/3" />
                <div className="h-5 bg-[#1F3A34]/10 rounded-md w-3/4" />
                <div className="h-8 bg-[#1F3A34]/10 rounded-xl w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
            <AlertTriangle size={16} className="shrink-0" />
            <span style={BODY_STYLE}>{error}</span>
          </div>
        )}

        {/* État vide : Aucune analyse */}
        {!loading && !error && historique.length === 0 && (
          <div className="rounded-3xl bg-white/80 backdrop-blur-md border border-[#1F3A34]/10 p-10 text-center shadow-lg shadow-[#1F3A34]/5">
            <div className="w-16 h-16 rounded-2xl bg-[#1F3A34]/5 text-[#1F3A34] flex items-center justify-center mx-auto mb-4">
              <Inbox size={32} strokeWidth={1.5} />
            </div>
            <h3
              className="text-lg font-bold text-[#1F3A34] mb-1"
              style={BODY_STYLE}
            >
              Aucune analyse enregistrée
            </h3>
            <p
              className="text-xs text-[#5C7A6E] mb-6 max-w-sm mx-auto"
              style={BODY_STYLE}
            >
              Vos futurs bilans et diagnostics de santé s'afficheront ici en
              toute confidentialité.
            </p>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F3A34] text-[#F6F7F2] text-xs font-bold hover:bg-[#1F3A34]/90 shadow-md shadow-[#1F3A34]/20 transition-all duration-200"
              style={BODY_STYLE}
            >
              <Sparkles size={15} className="text-[#C98A3A]" />
              <span>Démarrer une nouvelle analyse</span>
            </Link>
          </div>
        )}

        {/* Résultats introuvables lors du filtre */}
        {!loading &&
          !error &&
          historique.length > 0 &&
          historiqueFiltre.length === 0 && (
            <div className="p-8 text-center bg-white/50 rounded-2xl border border-dashed border-[#1F3A34]/20">
              <p className="text-xs text-[#5C7A6E]" style={BODY_STYLE}>
                Aucune analyse ne correspond à votre recherche «{" "}
                <strong>{searchTerm}</strong> ».
              </p>
            </div>
          )}

        {/* Liste des cartes d'analyse */}
        <div className="space-y-4">
          {!loading &&
            historiqueFiltre.map((item) => {
              const top = meilleurResultat(item.results);
              const isDeleting = deletingId === item._id;

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-2xl bg-white hover:bg-white/90 border border-[#1F3A34]/10 hover:border-[#1F3A34]/30 p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                    isDeleting ? "opacity-40 pointer-events-none" : ""
                  }`}
                >
                  {/* Ligne d'en-tête de la carte */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="flex items-center gap-2 text-xs font-semibold text-[#5C7A6E]"
                      style={BODY_STYLE}
                    >
                      <Calendar size={13} className="text-[#C98A3A]" />
                      <span>{formaterDate(item.createdAt)}</span>
                    </div>

                    <button
                      onClick={(e) => handleDelete(e, item._id)}
                      className="text-[#5C7A6E]/40 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
                      title="Supprimer cette analyse"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Description initiale */}
                  <p
                    className="text-sm font-medium text-[#1F3A34] mb-3 line-clamp-2 leading-relaxed"
                    style={BODY_STYLE}
                  >
                    « {item.description} »
                  </p>

                  {/* Badges de symptômes identifiés */}
                  {item.symptoms?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.symptoms.slice(0, 4).map((symptom, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#F6F7F2] border border-[#1F3A34]/10 text-[#5C7A6E] font-medium"
                          style={BODY_STYLE}
                        >
                          {symptom}
                        </span>
                      ))}
                      {item.symptoms.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1F3A34]/5 text-[#1F3A34] font-bold">
                          +{item.symptoms.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Résultat Principal */}
                  {top && (
                    <div className="rounded-xl bg-[#F6F7F2] border border-[#1F3A34]/5 p-3.5 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-bold text-[#1F3A34]"
                            style={BODY_STYLE}
                          >
                            {top.name}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.2 rounded-full ${
                              top.percentage >= 70
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {top.percentage}% match
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-[#1F3A34] group-hover:translate-x-1 transition-transform">
                        <span>Voir détail</span>
                        <ChevronRight size={15} className="text-[#C98A3A]" />
                      </div>
                    </div>
                  )}

                  {/* Badge d'Alerte Médicale */}
                  {item.alerts?.length > 0 && (
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-red-700 font-semibold bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl">
                      <AlertTriangle size={14} className="shrink-0" />
                      <span style={BODY_STYLE}>
                        Alerte médicale associée à ce bilan
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALE DE DETAILS COMPLET DE L'ANALYSE SELECTIONNEE                       */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-[#1F3A34]/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#1F3A34]/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header Modale */}
            <div className="px-6 py-4 bg-[#F6F7F2] border-b border-[#1F3A34]/10 flex items-center justify-between shrink-0">
              <div>
                <h3
                  className="text-sm font-bold text-[#1F3A34]"
                  style={BODY_STYLE}
                >
                  Détail de la consultation
                </h3>
                <p className="text-[11px] text-[#5C7A6E]" style={BODY_STYLE}>
                  {formaterDate(selectedItem.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-full hover:bg-[#1F3A34]/10 text-[#1F3A34] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Corps Modale */}
            <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin">
              {/* Symptômes décris */}
              <div className="bg-[#1F3A34] text-[#F6F7F2] p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-[#C98A3A] uppercase tracking-wider mb-1">
                  Description initiale
                </p>
                <p className="text-sm leading-relaxed" style={BODY_STYLE}>
                  « {selectedItem.description} »
                </p>
              </div>

              {/* Symptômes retenus */}
              {selectedItem.symptoms?.length > 0 && (
                <div>
                  <h4
                    className="text-xs font-bold text-[#1F3A34] uppercase tracking-wider mb-2"
                    style={BODY_STYLE}
                  >
                    Symptômes identifiés
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.symptoms.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-[#F6F7F2] border border-[#1F3A34]/10 text-[#1F3A34] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bannières d'alertes */}
              {selectedItem.alerts?.length > 0 && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <AlertTriangle size={15} />
                    <span>Avertissements de sécurité</span>
                  </div>
                  {selectedItem.alerts.map((a, idx) => (
                    <p key={idx} className="text-xs pl-6" style={BODY_STYLE}>
                      • {a}
                    </p>
                  ))}
                </div>
              )}

              {/* Liste des Diagnostics Poses */}
              {selectedItem.results?.length > 0 && (
                <div>
                  <h4
                    className="text-xs font-bold text-[#1F3A34] uppercase tracking-wider mb-3"
                    style={BODY_STYLE}
                  >
                    Hypothèses diagnostiques
                  </h4>
                  <div className="space-y-2.5">
                    {selectedItem.results.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#F6F7F2] border border-[#1F3A34]/10 flex items-center justify-between"
                      >
                        <span
                          className="text-xs font-bold text-[#1F3A34]"
                          style={BODY_STYLE}
                        >
                          {res.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-[#1F3A34]/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#1F3A34] rounded-full"
                              style={{ width: `${res.percentage}%` }}
                            />
                          </div>
                          <span
                            className="text-xs font-extrabold text-[#1F3A34]"
                            style={BODY_STYLE}
                          >
                            {res.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Modale */}
            <div className="p-4 bg-[#F6F7F2] border-t border-[#1F3A34]/10 text-center shrink-0">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2 bg-[#1F3A34] text-white text-xs font-bold rounded-xl hover:bg-[#1F3A34]/90 transition-all"
                style={BODY_STYLE}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Historique;
