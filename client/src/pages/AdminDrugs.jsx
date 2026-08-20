// ==================================================
// PAGE /admin/medicaments - GESTION DES MEDICAMENTS
// ==================================================
//
// Les listes (usages, effets, precautions, interactions)
// sont saisies separees par des virgules.

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const VIDE = {
  drugId: "",
  name: "",
  categorie: "Médicament",
  classe: "",
  description: "",
  usagesText: "",
  effetsSecondairesText: "",
  precautionsText: "",
  interactionsNotablesText: "",
  quandConsulter: "",
};

function listToText(list) {
  return (list || []).join(", ");
}

function textToList(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function AdminDrugs() {
  const { token } = useAuth();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(VIDE);

  const fetchDrugs = async () => {
    try {
      const response = await fetch("https://projet-de-fin-de-formation-0opo.onrename.com/api/admin/drugs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDrugs(data.drugs || []);
    } catch (err) {
      setError("Impossible de charger les médicaments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchDrugs();
  }, [token]);

  const openCreate = () => {
    setForm(VIDE);
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (drug) => {
    setForm({
      drugId: drug.drugId,
      name: drug.name,
      categorie: drug.categorie,
      classe: drug.classe || "",
      description: drug.description || "",
      usagesText: listToText(drug.usages),
      effetsSecondairesText: listToText(drug.effetsSecondaires),
      precautionsText: listToText(drug.precautions),
      interactionsNotablesText: listToText(drug.interactionsNotables),
      quandConsulter: drug.quandConsulter || "",
    });
    setEditingId(drug.drugId);
    setFormOpen(true);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      drugId: form.drugId,
      name: form.name,
      categorie: form.categorie,
      classe: form.classe,
      description: form.description,
      usages: textToList(form.usagesText),
      effetsSecondaires: textToList(form.effetsSecondairesText),
      precautions: textToList(form.precautionsText),
      interactionsNotables: textToList(form.interactionsNotablesText),
      quandConsulter: form.quandConsulter,
    };

    try {
      const url = editingId
        ? `https://projet-de-fin-de-formation-0opo.onrename.com/api/admin/drugs/${editingId}`
        : "https://projet-de-fin-de-formation-0opo.onrename.com/api/admin/drugs";

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setFormOpen(false);
      fetchDrugs();
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (drugId) => {
    if (!confirm("Supprimer ce médicament ?")) return;

    try {
      await fetch(`https://projet-de-fin-de-formation-0opo.onrename.com/api/admin/drugs/${drugId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setDrugs((prev) => prev.filter((d) => d.drugId !== drugId));
    } catch (err) {
      setError("Impossible de supprimer.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div
            className="text-xs tracking-widest uppercase text-[#C98A3A] mb-2"
            style={BODY_STYLE}
          >
            Administration
          </div>
          <h1
            className="text-2xl font-medium text-[#1F3A34]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Médicaments & compléments
          </h1>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90"
          style={BODY_STYLE}
        >
          <Plus size={16} strokeWidth={2} />
          Ajouter
        </button>
      </div>

      {error && (
        <p className="text-sm text-[#C1443A] mb-4" style={BODY_STYLE}>
          {error}
        </p>
      )}

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white border border-[#1F3A34]/10 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-base font-semibold text-[#1F3A34]"
              style={BODY_STYLE}
            >
              {editingId ? "Modifier le médicament" : "Nouveau médicament"}
            </h2>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="text-[#5C7A6E]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Identifiant (drugId)
              </label>
              <input
                type="text"
                value={form.drugId}
                onChange={handleChange("drugId")}
                disabled={!!editingId}
                required
                placeholder="ex: paracetamol"
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm disabled:bg-[#F6F7F2]"
                style={BODY_STYLE}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Nom affiché
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
                style={BODY_STYLE}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Catégorie
              </label>
              <select
                value={form.categorie}
                onChange={handleChange("categorie")}
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
                style={BODY_STYLE}
              >
                <option value="Médicament">Médicament</option>
                <option value="Complément">Complément</option>
              </select>
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Classe thérapeutique
              </label>
              <input
                type="text"
                value={form.classe}
                onChange={handleChange("classe")}
                placeholder="ex: Antalgique"
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
                style={BODY_STYLE}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Description
            </label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm resize-none"
              style={BODY_STYLE}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Utilisé pour (séparés par des virgules)
            </label>
            <input
              type="text"
              value={form.usagesText}
              onChange={handleChange("usagesText")}
              placeholder="Fièvre, Maux de tête, Douleurs"
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
              style={BODY_STYLE}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Effets secondaires (séparés par des virgules)
            </label>
            <input
              type="text"
              value={form.effetsSecondairesText}
              onChange={handleChange("effetsSecondairesText")}
              placeholder="Nausées, Maux de tête"
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
              style={BODY_STYLE}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Précautions (séparées par des virgules)
            </label>
            <input
              type="text"
              value={form.precautionsText}
              onChange={handleChange("precautionsText")}
              placeholder="Ne pas dépasser la dose recommandée"
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
              style={BODY_STYLE}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Interactions notables (séparées par des virgules)
            </label>
            <input
              type="text"
              value={form.interactionsNotablesText}
              onChange={handleChange("interactionsNotablesText")}
              placeholder="Alcool, Anticoagulants"
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
              style={BODY_STYLE}
            />
          </div>

          <div className="mb-5">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Quand consulter
            </label>
            <textarea
              value={form.quandConsulter}
              onChange={handleChange("quandConsulter")}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm resize-none"
              style={BODY_STYLE}
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#1F3A34] text-[#F6F7F2] text-sm font-semibold hover:opacity-90"
            style={BODY_STYLE}
          >
            {editingId ? "Enregistrer" : "Créer"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
          Chargement...
        </p>
      ) : (
        <div className="rounded-2xl bg-white border border-[#1F3A34]/10 overflow-hidden">
          <table className="w-full text-sm" style={BODY_STYLE}>
            <thead>
              <tr className="border-b border-[#1F3A34]/10 text-left text-xs text-[#5C7A6E] uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Nom</th>
                <th className="px-5 py-3 font-medium">Catégorie</th>
                <th className="px-5 py-3 font-medium">Identifiant</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((d) => (
                <tr
                  key={d.drugId}
                  className="border-b border-[#1F3A34]/5 last:border-0"
                >
                  <td className="px-5 py-3 text-[#1F3A34] font-medium">
                    {d.name}
                  </td>
                  <td className="px-5 py-3 text-[#5C7A6E]">{d.categorie}</td>
                  <td className="px-5 py-3 text-[#5C7A6E] font-mono text-xs">
                    {d.drugId}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(d)}
                        className="p-2 rounded-lg text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34]"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(d.drugId)}
                        className="p-2 rounded-lg text-[#5C7A6E] hover:bg-[#C1443A]/10 hover:text-[#C1443A]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDrugs;
