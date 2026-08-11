// ==================================================
// PAGE /admin/maladies - GESTION DES CONDITIONS
// ==================================================
//
// Le champ "symptomes" est saisi au format simplifie
// "id:poids" (un par ligne) pour rester gerable sans
// construire un selecteur complexe, ex :
//   fievre:5
//   frissons:4

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const VIDE = {
  conditionId: "",
  name: "",
  description: "",
  symptomsText: "",
  recommendation: "",
  whenToConsult: "",
  warning: "",
};

function symptomsToText(symptoms) {
  return (symptoms || []).map((s) => `${s.id}:${s.weight}`).join("\n");
}

function textToSymptoms(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id, weight] = line.split(":").map((p) => p.trim());
      return { id, weight: Number(weight) || 1 };
    });
}

function AdminConditions() {
  const { token } = useAuth();
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(VIDE);

  const fetchConditions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/conditions",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setConditions(data.conditions || []);
    } catch (err) {
      setError("Impossible de charger les maladies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchConditions();
  }, [token]);

  const openCreate = () => {
    setForm(VIDE);
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (condition) => {
    setForm({
      conditionId: condition.conditionId,
      name: condition.name,
      description: condition.description || "",
      symptomsText: symptomsToText(condition.symptoms),
      recommendation: condition.recommendation || "",
      whenToConsult: condition.whenToConsult || "",
      warning: condition.warning || "",
    });
    setEditingId(condition.conditionId);
    setFormOpen(true);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      conditionId: form.conditionId,
      name: form.name,
      description: form.description,
      symptoms: textToSymptoms(form.symptomsText),
      recommendation: form.recommendation,
      whenToConsult: form.whenToConsult,
      warning: form.warning,
    };

    try {
      const url = editingId
        ? `http://localhost:5000/api/admin/conditions/${editingId}`
        : "http://localhost:5000/api/admin/conditions";

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
      fetchConditions();
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (conditionId) => {
    if (!confirm("Supprimer cette maladie ?")) return;

    try {
      await fetch(`http://localhost:5000/api/admin/conditions/${conditionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setConditions((prev) =>
        prev.filter((c) => c.conditionId !== conditionId),
      );
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
            Maladies
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
              {editingId ? "Modifier la maladie" : "Nouvelle maladie"}
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
                Identifiant (conditionId)
              </label>
              <input
                type="text"
                value={form.conditionId}
                onChange={handleChange("conditionId")}
                disabled={!!editingId}
                required
                placeholder="ex: paludisme"
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
              Symptômes (format "id:poids", un par ligne)
            </label>
            <textarea
              value={form.symptomsText}
              onChange={handleChange("symptomsText")}
              rows={5}
              placeholder={"fievre:5\nfrissons:4"}
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm font-mono resize-none"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Recommandation
            </label>
            <textarea
              value={form.recommendation}
              onChange={handleChange("recommendation")}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm resize-none"
              style={BODY_STYLE}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Quand consulter
              </label>
              <textarea
                value={form.whenToConsult}
                onChange={handleChange("whenToConsult")}
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm resize-none"
                style={BODY_STYLE}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Avertissement
              </label>
              <textarea
                value={form.warning}
                onChange={handleChange("warning")}
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm resize-none"
                style={BODY_STYLE}
              />
            </div>
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
                <th className="px-5 py-3 font-medium">Identifiant</th>
                <th className="px-5 py-3 font-medium">Symptômes liés</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {conditions.map((c) => (
                <tr
                  key={c.conditionId}
                  className="border-b border-[#1F3A34]/5 last:border-0"
                >
                  <td className="px-5 py-3 text-[#1F3A34] font-medium">
                    {c.name}
                  </td>
                  <td className="px-5 py-3 text-[#5C7A6E] font-mono text-xs">
                    {c.conditionId}
                  </td>
                  <td className="px-5 py-3 text-[#5C7A6E]">
                    {c.symptoms?.length || 0}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="p-2 rounded-lg text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34]"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.conditionId)}
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

export default AdminConditions;
