// ==================================================
// HERO - PAGE D'ACCUEIL
// ==================================================

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCommencer = () => {
    navigate(isAuthenticated ? "/assistant" : "/inscription");
  };

  return (
    <section className="bg-[#F6F7F2] px-6 pt-16 pb-20">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="text-xs tracking-widest uppercase text-[#C98A3A] mb-4"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Assistant de triage médical
          </div>

          <h1
            className="text-4xl md:text-5xl font-medium leading-tight text-[#1F3A34] mb-5"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Comprenez vos symptômes.
            <br />
            Agissez en confiance.
          </h1>

          <p
            className="text-base text-[#5C7A6E] leading-relaxed mb-8 max-w-md"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Vitalis analyse vos symptômes, vous oriente vers la conduite à
            tenir, et vous connecte à des professionnels de santé — le tout en
            quelques minutes, adapté au contexte camerounais.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleCommencer}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Commencer une analyse
              <ArrowRight size={18} strokeWidth={2} />
            </button>

            <a
              href="/maladies"
              className="text-sm font-semibold text-[#1F3A34] underline underline-offset-4"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Explorer les maladies
            </a>
          </div>

          <p
            className="text-xs text-[#5C7A6E]/70 mt-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Orientation indicative — ne remplace pas l'avis d'un professionnel
            de santé.
          </p>
        </div>

        {/* ILLUSTRATION */}
        <div className="flex justify-center">
          <svg
            width="380"
            height="380"
            viewBox="0 0 380 380"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="190" cy="190" r="170" fill="#EDEFE9" />

            {/* Silhouette assise, tenant un telephone (consultation a distance) */}
            <ellipse cx="190" cy="330" rx="120" ry="14" fill="#DEE1D8" />

            <rect
              x="120"
              y="200"
              width="140"
              height="120"
              rx="18"
              fill="#1F3A34"
            />
            <circle cx="190" cy="150" r="48" fill="#C98A3A" />

            <rect
              x="150"
              y="230"
              width="80"
              height="60"
              rx="10"
              fill="#F6F7F2"
            />
            <rect x="165" y="245" width="50" height="6" rx="3" fill="#C1443A" />
            <rect x="165" y="258" width="35" height="6" rx="3" fill="#5C7A6E" />
            <rect x="165" y="271" width="42" height="6" rx="3" fill="#5C7A6E" />

            {/* Croix medicale flottante */}
            <circle
              cx="290"
              cy="110"
              r="34"
              fill="#FFFFFF"
              stroke="#1F3A34"
              strokeWidth="2"
            />
            <rect x="282" y="92" width="16" height="36" rx="4" fill="#C1443A" />
            <rect
              x="272"
              y="102"
              width="36"
              height="16"
              rx="4"
              fill="#C1443A"
            />

            {/* Pouls / ECG */}
            <path
              d="M60 200 H100 L112 175 L128 225 L144 190 L156 210 H200"
              fill="none"
              stroke="#1F3A34"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
