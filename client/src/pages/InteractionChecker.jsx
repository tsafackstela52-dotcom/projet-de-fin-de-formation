// ==================================================
// PAGE /interactions - VERIFICATEUR D'INTERACTIONS
// ==================================================
//
// L'utilisateur selectionne plusieurs medicaments,
// le systeme verifie les interactions connues entre eux
// dans notre base curee (non exhaustive).

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Search } from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const GRAVITE_STYLES = {
  mineure: {
    bg: "bg-[#EAF1F8]",
    border: "border-[#2C5F91]/25",
    text: "text-[#2C5F91]",
    label: "Mineure",
  },
  moderee: {
    bg: "bg-[#FDF3E7]",
    border: "border-[#C98A3A]/25",
    text: "text-[#C98A3A]",
    label: "Modérée",
  },
  majeure: {
    bg: "bg-[#C1443A]/8",
    border: "border-[#C1443A]/25",
    text: "text-[#C1443A]",
    label: "Majeure",
  },
};

function InteractionChecker() {
  const [drugs, setDrugs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://projet-de-fin-de-formation-0opo.onrename.com/api/interactions/drugs")
      .then((r) => r.json())
      .then((data) => setDrugs(data.drugs || []));
  }, []);

  const toggleDrug = (drugId) => {
    setSelected((prev) =>
      prev.includes(drugId)
        ? prev.filter((id) => id !== drugId)
        : [...prev, drugId],
    );
    setResults(null);
  };

  const handleCheck = async () => {
    if (selected.length < 2) return;
    setLoading(true);

    try {
      const response = await fetch(
        "https://projet-de-fin-de-formation-0opo.onrename.com/api/interactions/check",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ drugIds: selected }),
        },
      );
      const data = await response.json();
      setResults(data.interactions || []);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const nomDe = (drugId) =>
    drugs.find((d) => d.drugId === drugId)?.name || drugId;

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
          Vérificateur d'interactions
        </h1>

        <div className="rounded-2xl bg-[#C1443A]/8 border border-[#C1443A]/25 p-4 mb-8 flex gap-3">
          <AlertTriangle
            size={18}
            strokeWidth={2}
            className="text-[#C1443A] shrink-0 mt-0.5"
          />
          <p className="text-xs text-[#1F3A34]" style={BODY_STYLE}>
            Cette base d'interactions est limitée et non exhaustive. L'absence
            de résultat ne garantit pas l'absence d'interaction. Consultez
            toujours un pharmacien avant d'associer plusieurs médicaments.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-[#1F3A34]/10 p-6 mb-6">
          <h2
            className="text-sm font-semibold text-[#1F3A34] mb-4"
            style={BODY_STYLE}
          >
            Sélectionnez au moins 2 médicaments
          </h2>

          <div className="grid sm:grid-cols-2 gap-2 mb-5 max-h-72 overflow-y-auto">
            {drugs.map((d) => (
              <label
                key={d.drugId}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F6F7F2] cursor-pointer text-sm text-[#1F3A34]"
                style={BODY_STYLE}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(d.drugId)}
                  onChange={() => toggleDrug(d.drugId)}
                  className="accent-[#1F3A34]"
                />
                {d.name}
              </label>
            ))}
          </div>

          <button
            onClick={handleCheck}
            disabled={selected.length < 2 || loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90 disabled:opacity-40"
            style={BODY_STYLE}
          >
            <Search size={16} strokeWidth={2} />
            {loading ? "Vérification..." : "Vérifier les interactions"}
          </button>
        </div>

        {results && (
          <div>
            {results.length === 0 ? (
              <div className="rounded-2xl bg-white border border-[#1F3A34]/10 p-6 flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  strokeWidth={1.75}
                  className="text-[#1F3A34]"
                />
                <p className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                  Aucune interaction connue trouvée entre ces médicaments dans
                  notre base.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((int) => {
                  const style = GRAVITE_STYLES[int.gravite];
                  return (
                    <div
                      key={int.interactionId}
                      className={`rounded-2xl ${style.bg} border ${style.border} p-5`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="text-sm font-semibold text-[#1F3A34]"
                          style={BODY_STYLE}
                        >
                          {nomDe(int.drugIdA)} + {nomDe(int.drugIdB)}
                        </div>
                        <span
                          className={`text-xs font-semibold uppercase ${style.text}`}
                          style={BODY_STYLE}
                        >
                          {style.label}
                        </span>
                      </div>
                      <p
                        className="text-sm text-[#1F3A34] mb-2"
                        style={BODY_STYLE}
                      >
                        {int.description}
                      </p>
                      {int.conduite && (
                        <p
                          className="text-xs text-[#5C7A6E] italic"
                          style={BODY_STYLE}
                        >
                          {int.conduite}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InteractionChecker;
