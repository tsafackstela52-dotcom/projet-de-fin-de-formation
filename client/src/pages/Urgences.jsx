// ==================================================
// PAGE /urgences
// ==================================================
//
// Page a part, style rouge/urgent volontairement
// distinct du reste du site (coherent avec le lien
// "Urgences" deja en rouge dans Header.jsx).
// Numeros verifies pour le Cameroun (2026).

import { Phone, AlertTriangle, Siren, Cross, Flame } from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const NUMEROS = [
  {
    label: "Numéro d'urgence unifié",
    numero: "112",
    icon: Siren,
    note: "Numéro unique en cours de déploiement, relie tous les services",
  },
  {
    label: "SAMU (urgences médicales)",
    numero: "119",
    fixe: "19",
    icon: Cross,
    note: "Depuis un mobile : 119 — depuis un fixe : 19",
  },
  {
    label: "Police secours",
    numero: "117",
    fixe: "17",
    icon: AlertTriangle,
    note: "Depuis un mobile : 117 — depuis un fixe : 17",
  },
  {
    label: "Pompiers",
    numero: "118",
    fixe: "18",
    icon: Flame,
    note: "Depuis un mobile : 118 — depuis un fixe : 18",
  },
  {
    label: "Gendarmerie nationale",
    numero: "113",
    fixe: "13",
    icon: AlertTriangle,
    note: "Depuis un mobile : 113 — depuis un fixe : 13",
  },
];

const SIGNES_ALARME = [
  "Difficulté importante à respirer",
  "Douleur intense à la poitrine",
  "Perte de connaissance",
  "Convulsions",
  "Raideur de la nuque avec fièvre",
  "Confusion soudaine",
  "Saignement abondant",
  "Faiblesse ou engourdissement soudain d'un côté du corps",
];

function Urgences() {
  return (
    <div className="min-h-screen bg-[#FDF2F1] px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <div
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#C1443A] mb-3"
          style={BODY_STYLE}
        >
          <Siren size={14} strokeWidth={2} />
          Urgence médicale
        </div>

        <h1
          className="text-3xl font-medium text-[#7A2A22] mb-4"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          En cas d'urgence, agissez vite.
        </h1>

        <p
          className="text-sm text-[#7A2A22]/80 mb-10 leading-relaxed"
          style={BODY_STYLE}
        >
          Si vous ou une personne autour de vous présente un signe grave,
          n'attendez pas une analyse en ligne — appelez immédiatement un service
          d'urgence ou rendez-vous au centre de santé le plus proche.
        </p>

        {/* SIGNES D'ALARME */}
        <div className="rounded-2xl bg-white border border-[#C1443A]/25 p-6 mb-10">
          <h2
            className="text-base font-semibold text-[#7A2A22] mb-4"
            style={BODY_STYLE}
          >
            Signes nécessitant un appel immédiat
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {SIGNES_ALARME.map((signe) => (
              <div
                key={signe}
                className="flex items-start gap-2 text-sm text-[#1F3A34]"
                style={BODY_STYLE}
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C1443A] shrink-0" />
                {signe}
              </div>
            ))}
          </div>
        </div>

        {/* NUMEROS D'URGENCE */}
        <h2
          className="text-base font-semibold text-[#7A2A22] mb-4"
          style={BODY_STYLE}
        >
          Numéros d'urgence (Cameroun)
        </h2>

        <div className="space-y-3 mb-10">
          {NUMEROS.map(({ label, numero, note, icon: Icon }) => (
            <a
              key={label}
              href={`tel:${numero}`}
              className="flex items-center justify-between rounded-2xl bg-white border border-[#C1443A]/20 p-5 hover:border-[#C1443A]/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#C1443A]/10 text-[#C1443A] shrink-0">
                  <Icon size={19} strokeWidth={1.75} />
                </div>
                <div>
                  <div
                    className="text-sm font-semibold text-[#1F3A34]"
                    style={BODY_STYLE}
                  >
                    {label}
                  </div>
                  <div className="text-xs text-[#5C7A6E]" style={BODY_STYLE}>
                    {note}
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 text-[#C1443A] font-semibold text-lg"
                style={BODY_STYLE}
              >
                <Phone size={16} strokeWidth={2} />
                {numero}
              </div>
            </a>
          ))}
        </div>

        <p className="text-xs text-[#7A2A22]/60 text-center" style={BODY_STYLE}>
          Cliquez sur un numéro depuis votre téléphone pour appeler directement.
          En cas de doute, appelez toujours le service d'urgence — mieux vaut un
          déplacement inutile qu'un retard grave.
        </p>
      </div>
    </div>
  );
}

export default Urgences;
