// ==================================================
// COMMENT CA MARCHE - PAGE D'ACCUEIL
// ==================================================

import { MessageSquare, ListChecks, Compass } from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const ETAPES = [
  {
    numero: "01",
    icon: MessageSquare,
    title: "Décrivez vos symptômes",
    description:
      "En langage naturel, dans vos propres mots — pas besoin de vocabulaire médical.",
  },
  {
    numero: "02",
    icon: ListChecks,
    title: "Répondez à quelques questions",
    description:
      "Le système affine son analyse avec des questions ciblées, selon vos réponses.",
  },
  {
    numero: "03",
    icon: Compass,
    title: "Recevez votre orientation",
    description:
      "Pistes probables, recommandations, et signes nécessitant une consultation.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#F6F7F2] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <div
            className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
            style={BODY_STYLE}
          >
            Simple et rapide
          </div>
          <h2
            className="text-3xl font-medium text-[#1F3A34]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Comment ça marche
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {ETAPES.map(({ numero, icon: Icon, title, description }) => (
            <div key={numero} className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#1F3A34]/10 mb-5">
                <Icon size={24} strokeWidth={1.75} className="text-[#1F3A34]" />
                <span
                  className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-[#C98A3A] text-white text-xs font-bold"
                  style={BODY_STYLE}
                >
                  {numero}
                </span>
              </div>
              <div
                className="text-base font-medium text-[#1F3A34] mb-2"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                {title}
              </div>
              <p
                className="text-sm text-[#5C7A6E] leading-relaxed max-w-xs mx-auto"
                style={BODY_STYLE}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
