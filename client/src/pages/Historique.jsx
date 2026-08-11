// ==================================================
// PAGE /historique - HISTORIQUE DES ANALYSES
// ==================================================
//
// Affiche les analyses passees de l'utilisateur connecte.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight, Inbox } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function formaterDate(dateString) {
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
  return valides[0];
}

function Historique() {
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/history", {
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
        setError("Impossible de charger l'historique.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchHistorique();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
          style={BODY_STYLE}
        >
          Vos analyses passées
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-3"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Historique
        </h1>

        <p className="text-sm text-[#5C7A6E] mb-10" style={BODY_STYLE}>
          Retrouvez vos analyses précédentes, liées à votre compte.
        </p>

        {loading && (
          <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
            Chargement...
          </p>
        )}

        {error && (
          <p className="text-sm text-[#C1443A]" style={BODY_STYLE}>
            {error}
          </p>
        )}

        {!loading && !error && historique.length === 0 && (
          <div className="rounded-2xl bg-white border border-[#1F3A34]/10 p-8 text-center">
            <div className="flex justify-center mb-3">
              <Inbox size={32} strokeWidth={1.5} className="text-[#5C7A6E]" />
            </div>
            <p className="text-sm text-[#5C7A6E] mb-4" style={BODY_STYLE}>
              Aucune analyse enregistrée pour l'instant.
            </p>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90"
              style={BODY_STYLE}
            >
              Faire une analyse
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {historique.map((item) => {
            const top = meilleurResultat(item.results);
            return (
              <div
                key={item._id}
                className="rounded-2xl bg-white border border-[#1F3A34]/10 p-5"
              >
                <div
                  className="flex items-center gap-2 text-xs text-[#5C7A6E] mb-3"
                  style={BODY_STYLE}
                >
                  <Clock size={13} strokeWidth={2} />
                  {formaterDate(item.createdAt)}
                </div>

                <p
                  className="text-sm text-[#1F3A34] mb-3 italic"
                  style={BODY_STYLE}
                >
                  « {item.description} »
                </p>

                {item.symptoms?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.symptoms.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#F6F7F2] border border-[#1F3A34]/10 text-[#5C7A6E]"
                        style={BODY_STYLE}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {top && (
                  <div className="flex items-center justify-between rounded-xl bg-[#F6F7F2] px-4 py-3">
                    <div>
                      <div
                        className="text-sm font-semibold text-[#1F3A34]"
                        style={BODY_STYLE}
                      >
                        {top.name}
                      </div>
                      <div
                        className="text-xs text-[#5C7A6E]"
                        style={BODY_STYLE}
                      >
                        {top.percentage}% de probabilité
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-[#5C7A6E]" />
                  </div>
                )}

                {item.alerts?.length > 0 && (
                  <div
                    className="mt-3 text-xs text-[#C1443A] font-medium"
                    style={BODY_STYLE}
                  >
                    ⚠ Une alerte avait été détectée lors de cette analyse
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Historique;
