// ==================================================
// PAGE /contact
// ==================================================
//
// Formulaire de contact (simule, pas de backend dedie
// pour l'instant) + coordonnees directes.

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [envoye, setEnvoye] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.email.trim() || !form.message.trim()) return;
    setEnvoye(true);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-12">
        {/* COLONNE INFOS */}
        <div>
          <div
            className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
            style={BODY_STYLE}
          >
            Nous contacter
          </div>

          <h1
            className="text-3xl font-medium text-[#1F3A34] mb-4"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Une question ? Écrivez-nous.
          </h1>

          <p
            className="text-sm text-[#5C7A6E] mb-8 leading-relaxed"
            style={BODY_STYLE}
          >
            Pour toute question sur Vitalis, une suggestion, ou un problème
            rencontré sur la plateforme, notre équipe vous répond sous 48h
            ouvrées.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F3A34]/8 text-[#1F3A34] shrink-0">
                <Mail size={17} strokeWidth={1.75} />
              </div>
              <span className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                contact@vitalis.cm
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F3A34]/8 text-[#1F3A34] shrink-0">
                <Phone size={17} strokeWidth={1.75} />
              </div>
              <span className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                +237 6XX XXX XXX
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F3A34]/8 text-[#1F3A34] shrink-0">
                <MapPin size={17} strokeWidth={1.75} />
              </div>
              <span className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
                Yaoundé, Cameroun
              </span>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-[#C1443A]/8 border border-[#C1443A]/25 p-5">
            <p className="text-sm text-[#1F3A34]" style={BODY_STYLE}>
              <strong>En cas d'urgence médicale</strong>, ne passez pas par ce
              formulaire — rendez-vous directement au centre de santé le plus
              proche ou contactez les services d'urgence.
            </p>
          </div>
        </div>

        {/* COLONNE FORMULAIRE */}
        <div>
          {envoye ? (
            <div className="rounded-2xl bg-white border border-[#1F3A34]/10 p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2
                  size={40}
                  strokeWidth={1.5}
                  className="text-[#1F3A34]"
                />
              </div>
              <h2
                className="text-xl font-medium text-[#1F3A34] mb-2"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                Message envoyé
              </h2>
              <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
                Merci {form.nom}, nous vous répondrons à {form.email} sous 48h
                ouvrées.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
                  style={BODY_STYLE}
                >
                  Nom
                </label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={handleChange("nom")}
                  placeholder="Votre nom"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
                  style={BODY_STYLE}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
                  style={BODY_STYLE}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="vous@exemple.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
                  style={BODY_STYLE}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
                  style={BODY_STYLE}
                >
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="Votre message..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34] resize-none"
                  style={BODY_STYLE}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90 transition-opacity"
                style={BODY_STYLE}
              >
                Envoyer
                <Send size={16} strokeWidth={2} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
