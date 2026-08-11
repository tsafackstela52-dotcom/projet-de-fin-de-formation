// ==================================================
// GRILLE DE SERVICES - PAGE D'ACCUEIL
// ==================================================

import { Link } from "react-router-dom";
import {
  Stethoscope,
  BookOpen,
  Pill,
  HeartPulse,
  CalendarCheck,
  ShieldAlert,
} from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const SERVICES = [
  {
    to: "/assistant",
    icon: Stethoscope,
    title: "Assistant de diagnostic",
    description:
      "Décrivez vos symptômes et recevez une orientation personnalisée en quelques minutes.",
  },
  {
    to: "/maladies",
    icon: BookOpen,
    title: "Base des maladies",
    description:
      "Fiches détaillées : causes, symptômes, prévention et traitements courants.",
  },
  {
    to: "/medicaments",
    icon: Pill,
    title: "Médicaments & compléments",
    description:
      "Informations sur les médicaments courants, usages et précautions.",
  },
  {
    to: "/bien-etre",
    icon: HeartPulse,
    title: "Bien-être",
    description:
      "Conseils sur le sommeil, la nutrition, le stress et l'activité physique.",
  },
  {
    to: "/rendez-vous",
    icon: CalendarCheck,
    title: "Prendre rendez-vous",
    description:
      "Planifiez une consultation avec un centre de santé près de chez vous.",
  },
  {
    to: "/urgences",
    icon: ShieldAlert,
    title: "Urgences",
    description:
      "Numéros d'urgence et signes nécessitant une prise en charge immédiate.",
  },
];

function ServicesGrid() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div
            className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
            style={BODY_STYLE}
          >
            Ce que propose Vitalis
          </div>
          <h2
            className="text-3xl font-medium text-[#1F3A34]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Un accompagnement santé complet
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ to, icon: Icon, title, description }) => (
            <Link
              key={to}
              to={to}
              className="rounded-2xl border border-[#1F3A34]/10 bg-[#F6F7F2] p-6 hover:border-[#1F3A34]/30 hover:bg-white transition-colors"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1F3A34]/8 text-[#1F3A34] mb-4">
                <Icon size={19} strokeWidth={1.75} />
              </div>
              <div
                className="text-base font-medium text-[#1F3A34] mb-2"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                {title}
              </div>
              <p
                className="text-sm text-[#5C7A6E] leading-relaxed"
                style={BODY_STYLE}
              >
                {description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
