// ==================================================
// PAGE /bien-etre - ARTICLES PAR CATEGORIE
// ==================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Apple, Wind, Activity } from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const CATEGORIES = [
  { key: "sommeil", label: "Sommeil", icon: Moon },
  { key: "nutrition", label: "Nutrition", icon: Apple },
  { key: "stress", label: "Stress", icon: Wind },
  { key: "activite_physique", label: "Activité physique", icon: Activity },
];

function Wellbeing() {
  const [articles, setArticles] = useState([]);
  const [activeCategorie, setActiveCategorie] = useState("sommeil");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/wellbeing?categorie=${activeCategorie}`)
      .then((r) => r.json())
      .then((data) => setArticles(data.articles || []))
      .finally(() => setLoading(false));
  }, [activeCategorie]);

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
          style={BODY_STYLE}
        >
          Bien-être
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-3"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Conseils pour votre santé au quotidien
        </h1>

        <p className="text-sm text-[#5C7A6E] mb-8" style={BODY_STYLE}>
          Des conseils généraux pour prendre soin de vous, au-delà du diagnostic
          ponctuel.
        </p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveCategorie(key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategorie === key
                  ? "bg-[#1F3A34] text-[#F6F7F2]"
                  : "bg-white text-[#5C7A6E] border border-[#1F3A34]/15 hover:border-[#1F3A34]/30"
              }`}
              style={BODY_STYLE}
            >
              <Icon size={15} strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
            Chargement...
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          {articles.map((a) => (
            <Link
              key={a.articleId}
              to={`/bien-etre/${a.articleId}`}
              className="rounded-2xl border border-[#1F3A34]/10 bg-white p-5 hover:border-[#1F3A34]/30 transition-colors"
            >
              <div
                className="text-base font-medium text-[#1F3A34] mb-2"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                {a.title}
              </div>
              <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
                {a.resume}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wellbeing;
