// ==================================================
// PAGE /rendez-vous - PRISE DE RENDEZ-VOUS
// ==================================================
//
// Sauvegarde reellement le rendez-vous en base,
// lie au compte utilisateur connecte.

import { useState } from "react";
import {
  CalendarCheck,
  User,
  Phone,
  Stethoscope,
  Building2,
  CheckCircle2,
  Download,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const MOTIFS = [
  "Suite à une analyse Vitalis",
  "Consultation générale",
  "Suivi d'une maladie chronique",
  "Autre motif",
];

const HOPITAUX = [
  "Hôpital Central de Yaoundé",
  "CHU de Yaoundé",
  "Hôpital Gynéco-Obstétrique et Pédiatrique de Yaoundé",
  "Hôpital Général de Yaoundé",
  "Hôpital Militaire de Yaoundé",
  "Centre Hospitalier d'Essos (Yaoundé)",
  "Hôpital Laquintinie (Douala)",
  "Hôpital Gynéco-Obstétrique et Pédiatrique de Douala",
  "Mboppi Baptist Hospital (Douala)",
  "Hôpital du District de Deido (Douala)",
  "Hôpital Régional de Limbé",
  "Hôpital Régional de Maroua",
  "Hôpital Régional de Ngaoundéré",
  "Autre centre de santé",
];

function genererFichierICS({ nom, hopital, date, motif }) {
  const dateFormatee = date.replace(/-/g, "");

  const contenu = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:Rendez-vous médical - ${hopital}`,
    `DESCRIPTION:Motif : ${motif}\\nPatient : ${nom}`,
    `LOCATION:${hopital}`,
    `DTSTART;VALUE=DATE:${dateFormatee}`,
    `DTEND;VALUE=DATE:${dateFormatee}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Rappel : rendez-vous médical aujourd'hui",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([contenu], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const lien = document.createElement("a");
  lien.href = url;
  lien.download = "rendez-vous-vitalis.ics";
  lien.click();
  URL.revokeObjectURL(url);
}

function RendezVous() {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    date: "",
    motif: MOTIFS[0],
    hopital: HOPITAUX[0],
    autreHopital: "",
  });
  const [envoye, setEnvoye] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const hopitalFinal =
    form.hopital === "Autre centre de santé" && form.autreHopital.trim()
      ? form.autreHopital
      : form.hopital;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.telephone.trim() || !form.date) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://projet-de-fin-de-formation-0opo.onrender.com/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: form.nom,
          telephone: form.telephone,
          hopital: hopitalFinal,
          date: form.date,
          motif: form.motif,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'enregistrement.");
      }

      setEnvoye(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (envoye) {
    return (
      <div className="min-h-screen bg-[#F6F7F2] px-6 py-20 flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-5">
            <CheckCircle2
              size={48}
              strokeWidth={1.5}
              className="text-[#1F3A34]"
            />
          </div>
          <h1
            className="text-2xl font-medium text-[#1F3A34] mb-3"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Demande envoyée
          </h1>
          <p className="text-sm text-[#5C7A6E] mb-8" style={BODY_STYLE}>
            Votre demande de rendez-vous à <strong>{hopitalFinal}</strong> pour
            le {form.date} a bien été enregistrée. Un membre de notre équipe
            vous contactera au {form.telephone} pour confirmer.
          </p>

          <button
            onClick={() =>
              genererFichierICS({
                nom: form.nom,
                hopital: hopitalFinal,
                date: form.date,
                motif: form.motif,
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90"
            style={BODY_STYLE}
          >
            <Download size={16} strokeWidth={2} />
            Ajouter un rappel à mon calendrier
          </button>

          <p className="text-xs text-[#5C7A6E]/70 mt-4" style={BODY_STYLE}>
            Le fichier téléchargé s'ouvre avec Google Calendar, Outlook ou
            l'application Calendrier de votre téléphone, et vous rappellera le
            jour du rendez-vous.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F2] px-6 py-14">
      <div className="mx-auto max-w-xl">
        <div
          className="text-xs tracking-widest uppercase text-[#C98A3A] mb-3"
          style={BODY_STYLE}
        >
          Planifier une consultation
        </div>

        <h1
          className="text-3xl font-medium text-[#1F3A34] mb-3"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Prendre rendez-vous
        </h1>

        <p className="text-sm text-[#5C7A6E] mb-8" style={BODY_STYLE}>
          Suite à votre analyse, confirmez avec un professionnel de santé.
          Renseignez vos coordonnées et nous vous recontactons pour fixer
          l'horaire exact.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
              style={BODY_STYLE}
            >
              <User size={14} strokeWidth={2} />
              Nom complet
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
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
              style={BODY_STYLE}
            >
              <Phone size={14} strokeWidth={2} />
              Téléphone
            </label>
            <input
              type="tel"
              value={form.telephone}
              onChange={handleChange("telephone")}
              placeholder="+237 6XX XXX XXX"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
              style={BODY_STYLE}
            />
          </div>

          <div>
            <label
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
              style={BODY_STYLE}
            >
              <Building2 size={14} strokeWidth={2} />
              Hôpital / centre de santé
            </label>
            <select
              value={form.hopital}
              onChange={handleChange("hopital")}
              className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
              style={BODY_STYLE}
            >
              {HOPITAUX.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            {form.hopital === "Autre centre de santé" && (
              <input
                type="text"
                value={form.autreHopital}
                onChange={handleChange("autreHopital")}
                placeholder="Précisez le nom du centre"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
                style={BODY_STYLE}
              />
            )}
          </div>

          <div>
            <label
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
              style={BODY_STYLE}
            >
              <CalendarCheck size={14} strokeWidth={2} />
              Date souhaitée
            </label>
            <input
              type="date"
              value={form.date}
              onChange={handleChange("date")}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
              style={BODY_STYLE}
            />
          </div>

          <div>
            <label
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1F3A34] mb-2"
              style={BODY_STYLE}
            >
              <Stethoscope size={14} strokeWidth={2} />
              Motif de consultation
            </label>
            <select
              value={form.motif}
              onChange={handleChange("motif")}
              className="w-full px-4 py-3 rounded-xl border border-[#1F3A34]/15 bg-white text-sm text-[#1F3A34] focus:outline-none focus:border-[#1F3A34]"
              style={BODY_STYLE}
            >
              {MOTIFS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-sm text-[#C1443A]" style={BODY_STYLE}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            style={BODY_STYLE}
          >
            {loading ? "Envoi..." : "Envoyer la demande"}
          </button>

          <p
            className="text-xs text-[#5C7A6E]/70 text-center"
            style={BODY_STYLE}
          >
            Ceci est une demande, pas une confirmation définitive — notre équipe
            vous contactera pour fixer l'horaire précis.
          </p>
        </form>
      </div>
    </div>
  );
}

export default RendezVous;
