// ==================================================
// PAGE /maladies/:id - FICHE DETAILLEE D'UNE MALADIE
// ==================================================

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import maladiesInfo from "../data/maladiesInfo";

const SECTION_STYLE =
  "text-xs font-semibold tracking-wide uppercase text-[#C98A3A] mb-2";
const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function MaladieDetail() {
  const { id } = useParams();
  const info = maladiesInfo[id];

  if (!info) {
    return (
      <div className="min-h-screen bg-[#F6F7F2] px-6 py-14 text-center">
        <p className="text-[#1F3A34] mb-4" style={BODY_STYLE}>
          Fiche introuvable.
        </p>
        <Link
          to="/maladies"
          className="text-[#1F3A34] underline"
          style={BODY_STYLE}
        >
          Retour à la liste des maladies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/maladies"
          className="inline-flex items-center gap-1.5 text-sm text-[#5C7A6E] hover:text-[#1F3A34] mb-8"
          style={BODY_STYLE}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Retour à la recherche
        </Link>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-6"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          {info.name}
        </h1>

        <section className="mb-7">
          <div className={SECTION_STYLE}>Définition</div>
          <p
            className="text-sm text-[#1F3A34] leading-relaxed"
            style={BODY_STYLE}
          >
            {info.definition}
          </p>
        </section>

        <section className="mb-7">
          <div className={SECTION_STYLE}>Causes</div>
          <ul className="list-disc pl-5 space-y-1">
            {info.causes.map((item, i) => (
              <li key={i} className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-7">
          <div className={SECTION_STYLE}>Symptômes fréquents</div>
          <div className="flex flex-wrap gap-2">
            {info.symptoms.map((s, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#1F3A34]/15 text-[#1F3A34]"
                style={BODY_STYLE}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-7">
          <div className={SECTION_STYLE}>Facteurs de risque</div>
          <ul className="list-disc pl-5 space-y-1">
            {info.riskFactors.map((item, i) => (
              <li key={i} className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-7">
          <div className={SECTION_STYLE}>Prévention</div>
          <ul className="list-disc pl-5 space-y-1">
            {info.prevention.map((item, i) => (
              <li key={i} className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-7">
          <div className={SECTION_STYLE}>Traitements courants</div>
          <ul className="list-disc pl-5 space-y-1">
            {info.treatments.map((item, i) => (
              <li key={i} className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-[#C1443A]/8 border border-[#C1443A]/25 p-5">
          <div className="flex items-center gap-2 mb-2 text-[#C1443A]">
            <AlertTriangle size={16} strokeWidth={2} />
            <span
              className="text-xs font-semibold tracking-wide uppercase"
              style={BODY_STYLE}
            >
              Consultation urgente si
            </span>
          </div>
          <p className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
            {info.urgentSituations}
          </p>
        </section>

        <div className="mt-10">
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90"
            style={BODY_STYLE}
          >
            Faire une analyse de mes symptômes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MaladieDetail;
