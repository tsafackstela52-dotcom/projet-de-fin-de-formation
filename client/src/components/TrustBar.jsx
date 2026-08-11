// ==================================================
// BANDEAU DE CONFIANCE - PAGE D'ACCUEIL
// ==================================================

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const CHIFFRES = [
  { valeur: "30", label: "Maladies couvertes" },
  { valeur: "73", label: "Symptômes reconnus" },
  { valeur: "20", label: "Médicaments référencés" },
  { valeur: "24/7", label: "Disponible en ligne" },
];

function TrustBar() {
  return (
    <section className="bg-[#1F3A34] px-6 py-14">
      <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-8">
        {CHIFFRES.map(({ valeur, label }) => (
          <div key={label} className="text-center">
            <div
              className="text-3xl font-medium text-[#F6F7F2] mb-1"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              {valeur}
            </div>
            <div
              className="text-xs text-[#F6F7F2]/70 uppercase tracking-wide"
              style={BODY_STYLE}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustBar;
