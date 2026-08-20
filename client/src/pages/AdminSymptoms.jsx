// ==================================================
// PAGE /admin/symptomes - GESTION DES SYMPTOMES
// ==================================================
//
// Les mots-cles sont saisis separes par des virgules.

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const VIDE = { symptomId: "", keywordsText: "" };

function AdminSymptoms() {
  const { token } = useAuth();
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(VIDE);

  const fetchSymptoms = async () => {
    try {
      const response = await fetch("https://projet-de-fin-de-formation-0opo.onrender.com/api/admin/symptoms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setSymptoms(data.symptoms || []);
    } catch (err) {
      setError("Impossible de charger les symptômes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchSymptoms();
  }, [token]);

  const openCreate = () => {
    setForm(VIDE);
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (symptom) => {
    setForm({
      symptomId: symptom.symptomId,
      keywordsText: (symptom.keywords || []).join(", "),
    });
    setEditingId(symptom.symptomId);
    setFormOpen(true);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      symptomId: form.symptomId,
      keywords: form.keywordsText
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };

    try {
      const url = editingId
        ? `https://projet-de-fin-de-formation-0opo.onrender.com/api/admin/symptoms/${editingId}`
        : "https://projet-de-fin-de-formation-0opo.onrender.com/api/admin/symptoms";

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
      fetchSymptoms();
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (symptomId) => {
    if (!confirm("Supprimer ce symptôme ?")) return;

    try {
      await fetch(`https://projet-de-fin-de-formation-0opo.onrender.com/api/admin/symptoms/${symptomId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setSymptoms((prev) => prev.filter((s) => s.symptomId !== symptomId));
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
            Symptômes
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
              {editingId ? "Modifier le symptôme" : "Nouveau symptôme"}
            </h2>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="text-[#5C7A6E]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Identifiant (symptomId)
            </label>
            <input
              type="text"
              value={form.symptomId}
              onChange={handleChange("symptomId")}
              disabled={!!editingId}
              required
              placeholder="ex: fievre"
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm disabled:bg-[#F6F7F2]"
              style={BODY_STYLE}
            />
          </div>

          <div className="mb-5">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Mots-clés de détection (séparés par des virgules)
            </label>
            <textarea
              value={form.keywordsText}
              onChange={handleChange("keywordsText")}
              rows={3}
              placeholder="fievre, fièvre, temperature, j'ai chaud"
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
                <th className="px-5 py-3 font-medium">Identifiant</th>
                <th className="px-5 py-3 font-medium">Mots-clés</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {symptoms.map((s) => (
                <tr
                  key={s.symptomId}
                  className="border-b border-[#1F3A34]/5 last:border-0"
                >
                  <td className="px-5 py-3 text-[#1F3A34] font-mono text-xs">
                    {s.symptomId}
                  </td>
                  <td className="px-5 py-3 text-[#5C7A6E]">
                    {(s.keywords || []).slice(0, 4).join(", ")}
                    {s.keywords?.length > 4 && ` +${s.keywords.length - 4}`}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="p-2 rounded-lg text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34]"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.symptomId)}
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

export default AdminSymptoms;
