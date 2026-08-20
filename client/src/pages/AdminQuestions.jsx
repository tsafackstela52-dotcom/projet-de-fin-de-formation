// ==================================================
// PAGE /admin/questions - GESTION DES QUESTIONS
// ==================================================
//
// Le champ "conditions" est saisi sous forme d'ids
// separes par des virgules (ex: paludisme, grippe).

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const VIDE = { questionId: "", question: "", symptom: "", conditionsText: "" };

function AdminQuestions() {
  const { token } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(VIDE);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://projet-de-fin-de-formation-0opo.onrename.com/api/admin/questions",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (err) {
      setError("Impossible de charger les questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchQuestions();
  }, [token]);

  const openCreate = () => {
    setForm(VIDE);
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (q) => {
    setForm({
      questionId: q.questionId,
      question: q.question,
      symptom: q.symptom,
      conditionsText: (q.conditions || []).join(", "),
    });
    setEditingId(q.questionId);
    setFormOpen(true);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      questionId: form.questionId,
      question: form.question,
      symptom: form.symptom,
      conditions: form.conditionsText
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    try {
      const url = editingId
        ? `https://projet-de-fin-de-formation-0opo.onrename.com/api/admin/questions/${editingId}`
        : "https://projet-de-fin-de-formation-0opo.onrename.com/api/admin/questions";

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
      fetchQuestions();
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (questionId) => {
    if (!confirm("Supprimer cette question ?")) return;

    try {
      await fetch(`https://projet-de-fin-de-formation-0opo.onrename.com/api/admin/questions/${questionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions((prev) => prev.filter((q) => q.questionId !== questionId));
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
            Questions
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
              {editingId ? "Modifier la question" : "Nouvelle question"}
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
                Identifiant (questionId)
              </label>
              <input
                type="text"
                value={form.questionId}
                onChange={handleChange("questionId")}
                disabled={!!editingId}
                required
                placeholder="ex: question_fievre"
                className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm disabled:bg-[#F6F7F2]"
                style={BODY_STYLE}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
                style={BODY_STYLE}
              >
                Symptôme associé
              </label>
              <input
                type="text"
                value={form.symptom}
                onChange={handleChange("symptom")}
                required
                placeholder="ex: fievre"
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
              Texte de la question
            </label>
            <input
              type="text"
              value={form.question}
              onChange={handleChange("question")}
              required
              placeholder="ex: Avez-vous de la fièvre ?"
              className="w-full px-3 py-2.5 rounded-lg border border-[#1F3A34]/15 text-sm"
              style={BODY_STYLE}
            />
          </div>

          <div className="mb-5">
            <label
              className="block text-xs font-semibold uppercase text-[#1F3A34] mb-1.5"
              style={BODY_STYLE}
            >
              Maladies concernées (identifiants séparés par des virgules)
            </label>
            <textarea
              value={form.conditionsText}
              onChange={handleChange("conditionsText")}
              rows={2}
              placeholder="paludisme, grippe, fievre_typhoide"
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
                <th className="px-5 py-3 font-medium">Question</th>
                <th className="px-5 py-3 font-medium">Symptôme</th>
                <th className="px-5 py-3 font-medium">Maladies</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr
                  key={q.questionId}
                  className="border-b border-[#1F3A34]/5 last:border-0"
                >
                  <td className="px-5 py-3 text-[#1F3A34]">{q.question}</td>
                  <td className="px-5 py-3 text-[#5C7A6E] font-mono text-xs">
                    {q.symptom}
                  </td>
                  <td className="px-5 py-3 text-[#5C7A6E]">
                    {(q.conditions || []).length}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(q)}
                        className="p-2 rounded-lg text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34]"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(q.questionId)}
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

export default AdminQuestions;
