// ==================================================
// APPEL A L'ACTION FINAL - PAGE D'ACCUEIL
// ==================================================

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function FinalCTA() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className="text-3xl font-medium text-[#1F3A34] mb-4"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Prêt à comprendre ce que vous ressentez ?
        </h2>
        <p className="text-sm text-[#5C7A6E] mb-8" style={BODY_STYLE}>
          Gratuit, rapide, et pensé pour le contexte camerounais.
        </p>
        <button
          onClick={() =>
            navigate(isAuthenticated ? "/assistant" : "/inscription")
          }
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90 transition-opacity"
          style={BODY_STYLE}
        >
          Commencer maintenant
          <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}

export default FinalCTA;
