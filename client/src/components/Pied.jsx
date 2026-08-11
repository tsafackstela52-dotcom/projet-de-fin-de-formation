// ==================================================
// PIED DE PAGE DU SITE (footer classique)
// ==================================================
//
// Affiche en bas de TOUTES les pages du site.
// Utilise lucide-react (deja utilise dans Header.jsx)
// pour les icones de contact, coherence garantie.
//
// Ne pas confondre avec Footer.jsx qui est la
// barre de saisie de l'assistant de chat.

import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

function Pied() {
  const anneeActuelle = new Date().getFullYear();

  return (
    <footer className="site-pied">
      <div className="site-pied-inner">
        <div className="site-pied-col">
          <div className="site-pied-brand-row">
            <Logo size={28} />
            <span className="site-pied-brand">Vitalis</span>
          </div>
          <div className="site-pied-tagline">
            Assistant de triage médical pour une orientation rapide et fiable.
          </div>
        </div>

        <div className="site-pied-col">
          <div className="site-pied-heading">Navigation</div>
          <a href="/" className="site-pied-link">
            Accueil
          </a>
          <a href="/symptomes" className="site-pied-link">
            Symptômes
          </a>
          <a href="/rendez-vous" className="site-pied-link">
            Rendez-vous
          </a>
          <a href="/assistant" className="site-pied-link">
            Assistant IA
          </a>
        </div>

        <div className="site-pied-col">
          <div className="site-pied-heading">Contact</div>
          <div className="site-pied-contact-row">
            <Mail size={15} strokeWidth={1.75} />
            <span>contact@vitalis.cm</span>
          </div>
          <div className="site-pied-contact-row">
            <Phone size={15} strokeWidth={1.75} />
            <span>+237 6XX XXX XXX</span>
          </div>
          <div className="site-pied-contact-row">
            <MapPin size={15} strokeWidth={1.75} />
            <span>Yaoundé, Cameroun</span>
          </div>
        </div>
      </div>

      <div className="site-pied-bottom">
        © {anneeActuelle} Vitalis. Cet outil ne remplace pas un avis médical
        professionnel.
      </div>
    </footer>
  );
}

export default Pied;
