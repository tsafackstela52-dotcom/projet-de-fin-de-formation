// ==================================================
// PAGE /connexion
// ==================================================

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
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
      const response = await fetch("http://localhost:5000/api/auth/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion.");
      }

      login(data.token, data.user);

      // Redirection selon le role : un admin va toujours
      // vers /admin, peu importe d'ou il venait. Un user
      // normal va vers la page qu'il visait (ou /assistant).
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
    <div className="min-h-screen bg-[#F6F7F2] flex items-center justify-center px-6 py-14">
      <div className="w-full max-w-sm">
        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3 text-center"
          style={BODY_STYLE}
        >
          Content de vous revoir
        </div>

        <h1
          className="text-2xl font-medium text-[#1F3A34] mb-8 text-center"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Se connecter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
              style={BODY_STYLE}
            >
              <Mail size={14} strokeWidth={2} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
              style={BODY_STYLE}
            />
          </div>

          <div>
            <label
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
              style={BODY_STYLE}
            >
              <Lock size={14} strokeWidth={2} />
              Mot de passe
            </label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
              style={BODY_STYLE}
            />
          </div>

          {error && (
            <p className="text-sm text-[#C1443A]" style={BODY_STYLE}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            style={BODY_STYLE}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p
          className="text-sm text-[#5C7A6E] text-center mt-6"
          style={BODY_STYLE}
        >
          Pas encore de compte ?{" "}
          <Link
            to="/inscription"
            className="text-[#1F3A34] font-semibold underline"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Connexion;
