// ==================================================
// PAGE /admin - TABLEAU DE BORD ADMINISTRATEUR
// ==================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Activity, HelpCircle, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const STATS_CONFIG = [
  { key: "conditions", label: "Maladies", to: "/admin/maladies", icon: Stethoscope, endpoint: "conditions" },
  { key: "symptoms", label: "Symptômes", to: "/admin/symptomes", icon: Activity, endpoint: "symptoms" },
  { key: "questions", label: "Questions", to: "/admin/questions", icon: HelpCircle, endpoint: "questions" },
  { key: "users", label: "Utilisateurs", to: "/admin/utilisateurs", icon: Users, endpoint: "users" },
];

function AdminDashboard() {
  const { token } = useAuth();
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const results = await Promise.all(
          STATS_CONFIG.map((s) =>
            fetch(`http://localhost:5000/api/admin/${s.endpoint}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((r) => r.json()),
          ),
        );

        const nextCounts = {};
        STATS_CONFIG.forEach((s, i) => {
          nextCounts[s.key] = (results[i][s.endpoint] || []).length;
        });

        setCounts(nextCounts);
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques :", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCounts();
  }, [token]);

  return (
    <div>
      <div className="text-xs tracking-widest uppercase text-[#C98A3A] mb-2" style={BODY_STYLE}>
        Vue d'ensemble
      </div>
      <h1
        className="text-2xl font-medium text-[#1F3A34] mb-8"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        Tableau de bord administrateur
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CONFIG.map(({ key, label, to, icon: Icon }) => (
          <Link
            key={key}
            to={to}
            className="rounded-2xl bg-white border border-[#1F3A34]/10 p-5 hover:border-[#1F3A34]/30 transition-colors"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F3A34]/8 text-[#1F3A34] mb-4">
              <Icon size={18} strokeWidth={1.75} />
            </div>
            <div className="text-2xl font-semibold text-[#1F3A34] mb-1" style={{ fontFamily: "Newsreader, serif" }}>
              {loading ? "…" : counts[key] ?? 0}
            </div>
            <div className="text-xs text-[#5C7A6E]" style={BODY_STYLE}>
              {label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;