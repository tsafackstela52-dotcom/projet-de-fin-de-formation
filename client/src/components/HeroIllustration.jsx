// ==================================================
// ILLUSTRATION D'ACCUEIL (SVG, pas d'image externe)
// ==================================================
//
// Affichee uniquement tant qu'aucune analyse n'a commence
// (symptoms.length === 0). Une bulle de dialogue avec une
// croix medicale a l'interieur - evoque un assistant a
// l'ecoute qui repond avec des informations de sante.

function HeroIllustration() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "16px 0 28px",
      }}
    >
      <svg
        width="200"
        height="150"
        viewBox="0 0 200 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="100" cy="135" rx="70" ry="9" fill="#E1E4DC" />

        <rect x="40" y="20" width="120" height="80" rx="16" fill="#1F5C4C" />
        <path d="M65 100 L65 120 L90 100 Z" fill="#1F5C4C" />

        <rect x="88" y="45" width="24" height="52" rx="5" fill="#FFFFFF" />
        <rect x="74" y="59" width="52" height="24" rx="5" fill="#FFFFFF" />

        <circle cx="160" cy="130" r="16" fill="#D9A441" />
      </svg>
    </div>
  );
}

// export default HeroIllustration;
// import heroImage from "../assets/votre-image.jpg";

// function HeroIllustration() {
//   return (
//     <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 28px" }}>
//       <img
//         src={heroImage}
//         alt="Assistant médical à l'écoute"
//         style={{ width: "220px", height: "auto", borderRadius: "16px" }}
//       />
//     </div>
//   );
// }

export default HeroIllustration;