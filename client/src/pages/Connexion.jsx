// src/pages/Connexion.jsx
// ==================================================
// PAGE /connexion (Style Premium - Thème Clair Vitalis)
// ==================================================

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://projet-de-fin-de-formation-0opo.onrender.com/api/auth/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion.");
      }

      login(data.token, data.user);

      // Redirection selon le rôle
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        const destination = location.state?.from || "/assistant";
        navigate(destination);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F2] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Halos d'ambiance discrets en arrière-plan */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1F3A34]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C98A3A]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Carte Principale */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl shadow-[#1F3A34]/5 border border-[#1F3A34]/10 transition-all duration-300 hover:shadow-[#1F3A34]/10 hover:border-[#1F3A34]/15">
          {/* Header */}
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C98A3A] mb-3 bg-[#C98A3A]/10 px-3.5 py-1.5 rounded-full border border-[#C98A3A]/20 shadow-sm"
              style={BODY_STYLE}
            >
              <Activity size={13} className="text-[#C98A3A]" />
              Content de vous revoir
            </span>
            <h1
              className="text-3xl font-normal text-[#1F3A34] mt-1 tracking-tight"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Se connecter
            </h1>
            <p className="text-xs text-[#5C7A6E] mt-2" style={BODY_STYLE}>
              Accédez à votre espace d'orientation médicale
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Email */}
            <div>
              <label
                className="block text-[11px] font-bold uppercase tracking-wider text-[#1F3A34]/80 mb-1.5"
                style={BODY_STYLE}
              >
                Adresse email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1F3A34]/40 group-focus-within:text-[#1F3A34] transition-colors">
                  <Mail size={18} strokeWidth={1.8} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemple@domaine.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] placeholder:text-[#1F3A34]/30 focus:outline-none focus:border-[#1F3A34]/40 focus:ring-4 focus:ring-[#1F3A34]/5 transition-all duration-200"
                  style={BODY_STYLE}
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#1F3A34]/80"
                  style={BODY_STYLE}
                >
                  Mot de passe
                </label>
                <Link
                  to="/mot-de-passe-oublie"
                  className="text-[11px] text-[#C98A3A] hover:text-[#B3792E] transition-colors font-medium"
                  style={BODY_STYLE}
                >
                  Oublié ?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1F3A34]/40 group-focus-within:text-[#1F3A34] transition-colors">
                  <Lock size={18} strokeWidth={1.8} />
                </div>
                <input
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] placeholder:text-[#1F3A34]/30 focus:outline-none focus:border-[#1F3A34]/40 focus:ring-4 focus:ring-[#1F3A34]/5 transition-all duration-200"
                  style={BODY_STYLE}
                />
              </div>
            </div>

            {/* Indication de sécurité */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#1F3A34]/5 border border-[#1F3A34]/10">
              <ShieldCheck size={16} className="text-[#1F3A34] shrink-0" />
              <span className="text-[11px] text-[#5C7A6E]" style={BODY_STYLE}>
                Espace sécurisé et données chiffrées.
              </span>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#C1443A]/10 border border-[#C1443A]/20 text-[#C1443A] text-xs"
                style={BODY_STYLE}
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full py-3.5 px-6 rounded-xl bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#162A26] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#1F3A34]/20 hover:shadow-[#1F3A34]/30 cursor-pointer"
              style={BODY_STYLE}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          {/* Footer / Lien Inscription */}
          <div className="mt-8 pt-6 border-t border-[#1F3A34]/10 text-center">
            <p className="text-xs text-[#5C7A6E]" style={BODY_STYLE}>
              Pas encore de compte ?{" "}
              <Link
                to="/inscription"
                className="text-[#1F3A34] font-bold hover:text-[#C98A3A] transition-colors underline decoration-[#1F3A34]/30 underline-offset-4"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
