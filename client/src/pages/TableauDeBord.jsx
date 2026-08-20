// ==================================================
// PAGE /tableau-de-bord
// ==================================================
//
// Vue d'ensemble personnelle de l'utilisateur connecte :
// statistiques, derniere analyse, prochain rendez-vous,
// raccourcis. Combine /api/history et /api/appointments.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Clock,
  CalendarCheck,
  Stethoscope,
  Search,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function formaterDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function meilleurResultat(results) {
  if (!results || results.length === 0) return null;
  const valides = results.filter((r) => r.percentage > 0);
  return valides.length > 0 ? valides[0] : null;
}

const RACCOURCIS = [
  { to: "/assistant", label: "Nouvelle analyse", icon: Stethoscope },
  { to: "/maladies", label: "Explorer les maladies", icon: Search },
  { to: "/rendez-vous", label: "Prendre rendez-vous", icon: CalendarCheck },
  { to: "/historique", label: "Voir tout l'historique", icon: Clock },
];

function TableauDeBord() {
  const { user, token } = useAuth();

  const [historique, setHistorique] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [histRes, apptRes] = await Promise.all([
          fetch("https://projet-de-fin-de-formation-0opo.onrender.com/api/history", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://projet-de-fin-de-formation-0opo.onrender.com/api/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const histData = await histRes.json();
        const apptData = await apptRes.json();

        setHistorique(histData.history || []);
        setAppointments(apptData.appointments || []);
      } catch (err) {
        console.error("Erreur lors du chargement du tableau de bord :", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const derniereAnalyse = historique[0];
  const topResultatDerniere = derniereAnalyse
    ? meilleurResultat(derniereAnalyse.results)
    : null;

  const aujourdhui = new Date().toISOString().split("T")[0];
  const prochainRdv = appointments
    .filter((a) => a.date >= aujourdhui)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
          style={BODY_STYLE}
        >
          Tableau de bord
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-10"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Bonjour, {user?.nom} 👋
        </h1>

        {loading ? (
          <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
            Chargement...
          </p>
        ) : (
          <>
            {/* STATISTIQUES */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="rounded-2xl bg-white border border-[#1F3A34]/10 p-5 flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1F3A34]/8 text-[#1F3A34]">
                  <Activity size={19} strokeWidth={1.75} />
                </div>
                <div>
                  <div
                    className="text-2xl font-semibold text-[#1F3A34]"
                    style={{ fontFamily: "Newsreader, serif" }}
                  >
                    {historique.length}
                  </div>
                  <div className="text-xs text-[#5C7A6E]" style={BODY_STYLE}>
                    Analyse{historique.length > 1 ? "s" : ""} effectuée
                    {historique.length > 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-[#1F3A34]/10 p-5 flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1F3A34]/8 text-[#1F3A34]">
                  <CalendarCheck size={19} strokeWidth={1.75} />
                </div>
                <div>
                  <div
                    className="text-2xl font-semibold text-[#1F3A34]"
                    style={{ fontFamily: "Newsreader, serif" }}
                  >
                    {appointments.length}
                  </div>
                  <div className="text-xs text-[#5C7A6E]" style={BODY_STYLE}>
                    Rendez-vous demandé{appointments.length > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            </div>

            {/* DERNIERE ANALYSE */}
            {derniereAnalyse && (
              <div className="mb-10">
                <h2
                  className="text-sm font-semibold text-[#1F3A34] mb-3"
                  style={BODY_STYLE}
                >
                  Dernière analyse
                </h2>
                <Link
                  to="/historique"
                  className="block rounded-2xl bg-white border border-[#1F3A34]/10 p-5 hover:border-[#1F3A34]/30 transition-colors"
                >
                  <div
                    className="flex items-center gap-2 text-xs text-[#5C7A6E] mb-2"
                    style={BODY_STYLE}
                  >
                    <Clock size={13} strokeWidth={2} />
                    {formaterDate(derniereAnalyse.createdAt)}
                  </div>
                  <p
                    className="text-sm text-[#1F3A34] italic mb-3"
                    style={BODY_STYLE}
                  >
                    « {derniereAnalyse.description} »
                  </p>
                  {topResultatDerniere && (
                    <div className="flex items-center justify-between rounded-xl bg-[#F6F7F2] px-4 py-3">
                      <div>
                        <div
                          className="text-sm font-semibold text-[#1F3A34]"
                          style={BODY_STYLE}
                        >
                          {topResultatDerniere.name}
                        </div>
                        <div
                          className="text-xs text-[#5C7A6E]"
                          style={BODY_STYLE}
                        >
                          {topResultatDerniere.percentage}% de probabilité
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#5C7A6E]" />
                    </div>
                  )}
                </Link>
              </div>
            )}

            {/* PROCHAIN RENDEZ-VOUS */}
            <div className="mb-10">
              <h2
                className="text-sm font-semibold text-[#1F3A34] mb-3"
                style={BODY_STYLE}
              >
                Prochain rendez-vous
              </h2>
              {prochainRdv ? (
                <div className="rounded-2xl bg-white border border-[#1F3A34]/10 p-5">
                  <div
                    className="text-sm font-semibold text-[#1F3A34] mb-1"
                    style={BODY_STYLE}
                  >
                    {prochainRdv.hopital}
                  </div>
                  <div className="text-xs text-[#5C7A6E]" style={BODY_STYLE}>
                    {formaterDate(prochainRdv.date)} — {prochainRdv.motif}
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-2xl bg-white border border-[#1F3A34]/10 p-5 text-sm text-[#5C7A6E]"
                  style={BODY_STYLE}
                >
                  Aucun rendez-vous à venir.{" "}
                  <Link
                    to="/rendez-vous"
                    className="text-[#1F3A34] font-semibold underline"
                  >
                    En prendre un
                  </Link>
                </div>
              )}
            </div>

            {/* RACCOURCIS */}
            <div>
              <h2
                className="text-sm font-semibold text-[#1F3A34] mb-3"
                style={BODY_STYLE}
              >
                Accès rapide
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {RACCOURCIS.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 rounded-2xl bg-white border border-[#1F3A34]/10 p-4 hover:border-[#1F3A34]/30 transition-colors"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1F3A34]/8 text-[#1F3A34] shrink-0">
                      <Icon size={16} strokeWidth={1.75} />
                    </div>
                    <span className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TableauDeBord;
