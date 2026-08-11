// ==================================================
// PAGE /identifier-pilule - RECHERCHE PAR CRITERES
// ==================================================
//
// Outil PEDAGOGIQUE - ne remplace jamais une
// verification par un pharmacien.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, AlertTriangle, Pill } from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function PillIdentifier() {
  const [formes, setFormes] = useState([]);
  const [couleurs, setCouleurs] = useState([]);
  const [forme, setForme] = useState("");
  const [couleur, setCouleur] = useState("");
  const [imprint, setImprint] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/pills/options")
      .then((r) => r.json())
      .then((data) => {
        setFormes(data.formes || []);
        setCouleurs(data.couleurs || []);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const params = new URLSearchParams();
    if (forme) params.set("forme", forme);
    if (couleur) params.set("couleur", couleur);
    if (imprint) params.set("imprint", imprint);

    try {
      const response = await fetch(
        `http://localhost:5000/api/pills/search?${params}`,
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
          style={BODY_STYLE}
        >
          Outil pédagogique
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-4"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Identifier une pilule
        </h1>

        <div className="rounded-2xl bg-[#C1443A]/8 border border-[#C1443A]/25 p-4 mb-8 flex gap-3">
          <AlertTriangle
            size={18}
            strokeWidth={2}
            className="text-[#C1443A] shrink-0 mt-0.5"
          />
          <p className="text-xs text-[#1F3A34]" style={BODY_STYLE}>
            Cet outil est à but pédagogique et couvre un nombre limité de
            médicaments. Il ne remplace jamais une vérification par un
            pharmacien avant toute prise. En cas de doute sur un médicament, ne
            le prenez pas et consultez un professionnel.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="rounded-2xl bg-white border border-[#1F3A34]/10 p-6 mb-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Forme
              </label>
              <select
                value={forme}
                onChange={(e) => setForme(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
                style={BODY_STYLE}
              >
                <option value="">Toutes</option>
                {formes.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Couleur
              </label>
              <select
                value={couleur}
                onChange={(e) => setCouleur(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
                style={BODY_STYLE}
              >
                <option value="">Toutes</option>
                {couleurs.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Texte inscrit sur la pilule (si visible)
            </label>
            <input
              type="text"
              value={imprint}
              onChange={(e) => setImprint(e.target.value)}
              placeholder="ex: P 500"
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
              style={BODY_STYLE}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90"
            style={BODY_STYLE}
          >
            <Search size={16} strokeWidth={2} />
            Rechercher
          </button>
        </form>

        {loading && (
          <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
            Recherche...
          </p>
        )}

        {results && (
          <div>
            <h2
              className="text-sm font-semibold text-[#1F3A34] mb-3"
              style={BODY_STYLE}
            >
              {results.length} résultat{results.length !== 1 ? "s" : ""}
            </h2>

            {results.length === 0 && (
              <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
                Aucune correspondance trouvée dans notre base limitée. Consultez
                un pharmacien pour identifier ce médicament.
              </p>
            )}

            <div className="space-y-3">
              {results.map((r) => (
                <Link
                  key={r.pillId}
                  to={`/medicaments/${r.drugId}`}
                  className="flex items-center gap-4 rounded-2xl bg-white border border-[#1F3A34]/10 p-5 hover:border-[#1F3A34]/30 transition-colors"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1F3A34]/8 text-[#1F3A34] shrink-0">
                    <Pill size={19} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold text-[#1F3A34]"
                      style={BODY_STYLE}
                    >
                      {r.drugName} {r.dosageInscrit && `— ${r.dosageInscrit}`}
                    </div>
                    <div className="text-xs text-[#5C7A6E]" style={BODY_STYLE}>
                      {r.forme}, {r.couleur}
                      {r.imprint && ` — inscription "${r.imprint}"`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PillIdentifier;
