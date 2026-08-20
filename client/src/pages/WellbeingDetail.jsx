// ==================================================
// PAGE /bien-etre/:id - ARTICLE DETAILLE
// ==================================================

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function WellbeingDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://projet-de-fin-de-formation-0opo.onrender.com/api/wellbeing/${id}`)
      .then((r) => r.json())
      .then((data) => setArticle(data.article || null))
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

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F6F7F2] px-6 py-14 text-center">
        <p className="text-[#1F3A34] mb-4" style={BODY_STYLE}>
          Article introuvable.
        </p>
        <Link
          to="/bien-etre"
          className="text-[#1F3A34] underline"
          style={BODY_STYLE}
        >
          Retour aux articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/bien-etre"
          className="inline-flex items-center gap-1.5 text-sm text-[#5C7A6E] hover:text-[#1F3A34] mb-8"
          style={BODY_STYLE}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Retour aux articles
        </Link>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-4"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          {article.title}
        </h1>

        <p
          className="text-sm text-[#5C7A6E] mb-8 leading-relaxed"
          style={BODY_STYLE}
        >
          {article.resume}
        </p>

        <div className="space-y-3">
          {(article.conseils || []).map((conseil, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-white border border-[#1F3A34]/10 p-4"
            >
              <CheckCircle2
                size={18}
                strokeWidth={1.75}
                className="text-[#1F3A34] shrink-0 mt-0.5"
              />
              <p className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                {conseil}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WellbeingDetail;
