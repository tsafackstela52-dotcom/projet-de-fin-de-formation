// ==================================================
// PAGE /maladies - RECHERCHE ET LISTE DES MALADIES
// ==================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import maladiesInfo from "../data/maladiesInfo";

function Maladies() {
  const [query, setQuery] = useState("");

  const entries = Object.entries(maladiesInfo);

  const filtered = entries.filter(([id, info]) =>
    info.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Base médicale
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-3"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Rechercher une maladie
        </h1>

        <p
          className="text-sm text-[#5C7A6E] mb-8"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Consultez les fiches descriptives : définition, causes, symptômes,
          prévention, traitements et situations nécessitant une consultation
          urgente.
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
            placeholder="Rechercher par nom (ex : paludisme, diabète...)"
            className="w-full pl-11 pr-4 py-3 rounded-full border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] placeholder:text-[#5C7A6E]/60 focus:outline-none focus:border-[#1F3A34]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          />
        </div>

        {filtered.length === 0 && (
          <p
            className="text-sm text-[#5C7A6E]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Aucune maladie ne correspond à votre recherche.
          </p>
        )}

        <div className="grid gap-3">
          {filtered.map(([id, info]) => (
            <Link
              key={id}
              to={`/maladies/${id}`}
              className="block rounded-2xl border border-[#1F3A34]/10 bg-white p-5 hover:border-[#1F3A34]/30 transition-colors"
            >
              <div
                className="text-base font-medium text-[#1F3A34] mb-1"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                {info.name}
              </div>
              <p
                className="text-sm text-[#5C7A6E] line-clamp-2"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {info.definition}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Maladies;
