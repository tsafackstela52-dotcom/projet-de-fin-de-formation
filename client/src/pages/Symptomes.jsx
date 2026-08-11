// ==================================================
// PAGE /symptomes - RECHERCHE PAR SYMPTOME
// ==================================================
//
// Navigation inverse de /maladies : on part d'un
// symptome pour voir quelles maladies peuvent le causer.

import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import symptomLabels from "../data/symptomLabels";
import symptomToMaladies from "../data/symptomToMaladies";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function Symptomes() {
  const [query, setQuery] = useState("");

  const entries = Object.entries(symptomLabels).filter(
    ([id]) => symptomToMaladies[id]?.length > 0,
  );

  const filtered = entries.filter(([, label]) =>
    label.toLowerCase().includes(query.toLowerCase()),
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
          Explorer par symptôme
        </h1>

        <p className="text-sm text-[#5C7A6E] mb-8" style={BODY_STYLE}>
          Sélectionnez un symptôme pour découvrir les maladies qui peuvent en
          être à l'origine.
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
            placeholder="Rechercher un symptôme (ex : fièvre, toux...)"
            className="w-full pl-11 pr-4 py-3 rounded-full border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] placeholder:text-[#5C7A6E]/60 focus:outline-none focus:border-[#1F3A34]"
            style={BODY_STYLE}
          />
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
            Aucun symptôme ne correspond à votre recherche.
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {filtered.map(([id, label]) => (
            <Link
              key={id}
              to={`/symptomes/${id}`}
              className="px-4 py-2 rounded-full bg-white border border-[#1F3A34]/15 text-sm text-[#1F3A34] hover:border-[#1F3A34]/40 transition-colors"
              style={BODY_STYLE}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Symptomes;
