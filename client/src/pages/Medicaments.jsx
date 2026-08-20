// ==================================================
// PAGE /medicaments - RECHERCHE ET LISTE
// ==================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Pill } from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function Medicaments() {
  const [drugs, setDrugs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://projet-de-fin-de-formation-0opo.onrender.com/api/drugs")
      .then((r) => r.json())
      .then((data) => setDrugs(data.drugs || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = drugs.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
          style={BODY_STYLE}
        >
          Base médicale
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-3"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Médicaments & compléments
        </h1>

        <p className="text-sm text-[#5C7A6E] mb-8" style={BODY_STYLE}>
          Informations générales : usages, effets secondaires, précautions. Pour
          la posologie exacte, demandez toujours à votre pharmacien.
        </p>

        <div className="relative mb-8">
          <Search
            size={18}
            strokeWidth={1.75}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C7A6E]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher (ex : paracétamol, fer...)"
            className="w-full pl-11 pr-4 py-3 rounded-full border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] placeholder:text-[#5C7A6E]/60 focus:outline-none focus:border-[#1F3A34]"
            style={BODY_STYLE}
          />
        </div>

        {loading && (
          <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
            Chargement...
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((d) => (
            <Link
              key={d.drugId}
              to={`/medicaments/${d.drugId}`}
              className="rounded-2xl border border-[#1F3A34]/10 bg-white p-5 hover:border-[#1F3A34]/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Pill size={15} strokeWidth={1.75} className="text-[#1F3A34]" />
                <span
                  className="text-xs text-[#C98A3A] uppercase tracking-wide"
                  style={BODY_STYLE}
                >
                  {d.categorie}
                </span>
              </div>
              <div
                className="text-base font-medium text-[#1F3A34] mb-1"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                {d.name}
              </div>
              <p
                className="text-sm text-[#5C7A6E] line-clamp-2"
                style={BODY_STYLE}
              >
                {d.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Medicaments;
