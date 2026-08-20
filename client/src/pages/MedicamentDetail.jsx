// ==================================================
// PAGE /medicaments/:id - FICHE DETAILLEE
// ==================================================

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const SECTION_STYLE =
  "text-xs font-semibold tracking-wide uppercase text-[#C98A3A] mb-2";
const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function MedicamentDetail() {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://projet-de-fin-de-formation-0opo.onrender.com/api/drugs/${id}`)
      .then((r) => r.json())
      .then((data) => setDrug(data.drug || null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#F6F7F2] px-6 py-14 text-center text-sm text-[#5C7A6E]"
        style={BODY_STYLE}
      >
        Chargement...
      </div>
    );
  }

  if (!drug) {
    return (
      <div className="min-h-screen bg-[#F6F7F2] px-6 py-14 text-center">
        <p className="text-[#1F3A34] mb-4" style={BODY_STYLE}>
          Fiche introuvable.
        </p>
        <Link
          to="/medicaments"
          className="text-[#1F3A34] underline"
          style={BODY_STYLE}
        >
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/medicaments"
          className="inline-flex items-center gap-1.5 text-sm text-[#5C7A6E] hover:text-[#1F3A34] mb-8"
          style={BODY_STYLE}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Retour à la recherche
        </Link>

        <div
          className="text-xs text-[#C98A3A] uppercase tracking-wide mb-2"
          style={BODY_STYLE}
        >
          {drug.categorie} — {drug.classe}
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-6"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          {drug.name}
        </h1>

        <section className="mb-7">
          <div className={SECTION_STYLE}>Description</div>
          <p
            className="text-sm text-[#1F3A34] leading-relaxed"
            style={BODY_STYLE}
          >
            {drug.description}
          </p>
        </section>

        {drug.usages?.length > 0 && (
          <section className="mb-7">
            <div className={SECTION_STYLE}>Utilisé pour</div>
            <div className="flex flex-wrap gap-2">
              {drug.usages.map((u, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#1F3A34]/15 text-[#1F3A34]"
                  style={BODY_STYLE}
                >
                  {u}
                </span>
              ))}
            </div>
          </section>
        )}

        {drug.effetsSecondaires?.length > 0 && (
          <section className="mb-7">
            <div className={SECTION_STYLE}>Effets secondaires possibles</div>
            <ul className="list-disc pl-5 space-y-1">
              {drug.effetsSecondaires.map((e, i) => (
                <li
                  key={i}
                  className="text-sm text-[#1F3A34]"
                  style={BODY_STYLE}
                >
                  {e}
                </li>
              ))}
            </ul>
          </section>
        )}

        {drug.precautions?.length > 0 && (
          <section className="mb-7">
            <div className={SECTION_STYLE}>Précautions</div>
            <ul className="list-disc pl-5 space-y-1">
              {drug.precautions.map((p, i) => (
                <li
                  key={i}
                  className="text-sm text-[#1F3A34]"
                  style={BODY_STYLE}
                >
                  {p}
                </li>
              ))}
            </ul>
          </section>
        )}

        {drug.interactionsNotables?.length > 0 && (
          <section className="mb-7">
            <div className={SECTION_STYLE}>Interactions notables</div>
            <ul className="list-disc pl-5 space-y-1">
              {drug.interactionsNotables.map((int, i) => (
                <li
                  key={i}
                  className="text-sm text-[#1F3A34]"
                  style={BODY_STYLE}
                >
                  {int}
                </li>
              ))}
            </ul>
          </section>
        )}

        {drug.quandConsulter && (
          <section className="rounded-2xl bg-[#C1443A]/8 border border-[#C1443A]/25 p-5 mb-7">
            <div className="flex items-center gap-2 mb-2 text-[#C1443A]">
              <AlertTriangle size={16} strokeWidth={2} />
              <span
                className="text-xs font-semibold tracking-wide uppercase"
                style={BODY_STYLE}
              >
                Quand consulter
              </span>
            </div>
            <p className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
              {drug.quandConsulter}
            </p>
          </section>
        )}

        <div
          className="rounded-xl bg-white border border-[#1F3A34]/10 p-4 text-xs text-[#5C7A6E]"
          style={BODY_STYLE}
        >
          Ces informations sont générales et ne remplacent pas l'avis d'un
          pharmacien ou d'un médecin. La posologie exacte doit toujours être
          confirmée par un professionnel de santé.
        </div>
      </div>
    </div>
  );
}

export default MedicamentDetail;
