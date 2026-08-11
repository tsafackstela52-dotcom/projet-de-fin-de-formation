// ==================================================
// PAGE /symptomes/:id - MALADIES LIEES A UN SYMPTOME
// ==================================================

import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import symptomLabels from "../data/symptomLabels";
import symptomToMaladies from "../data/symptomToMaladies";
import maladiesInfo from "../data/maladiesInfo";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function SymptomeDetail() {
  const { id } = useParams();
  const label = symptomLabels[id];
  const maladieIds = symptomToMaladies[id] || [];

  if (!label || maladieIds.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F7F2] px-6 py-14 text-center">
        <p className="text-[#1F3A34] mb-4" style={BODY_STYLE}>
          Symptôme introuvable.
        </p>
        <Link
          to="/symptomes"
          className="text-[#1F3A34] underline"
          style={BODY_STYLE}
        >
          Retour à la liste des symptômes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/symptomes"
          className="inline-flex items-center gap-1.5 text-sm text-[#5C7A6E] hover:text-[#1F3A34] mb-8"
          style={BODY_STYLE}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Retour aux symptômes
        </Link>

        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
          style={BODY_STYLE}
        >
          Symptôme
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-6"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          {label}
        </h1>

        <p className="text-sm text-[#5C7A6E] mb-6" style={BODY_STYLE}>
          Ce symptôme peut être associé aux maladies suivantes :
        </p>

        <div className="grid gap-3 mb-10">
          {maladieIds.map((maladieId) => {
            const info = maladiesInfo[maladieId];
            if (!info) return null;
            return (
              <Link
                key={maladieId}
                to={`/maladies/${maladieId}`}
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
                  style={BODY_STYLE}
                >
                  {info.definition}
                </p>
              </Link>
            );
          })}
        </div>

        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90"
          style={BODY_STYLE}
        >
          Faire une analyse de mes symptômes
        </Link>
      </div>
    </div>
  );
}

export default SymptomeDetail;
