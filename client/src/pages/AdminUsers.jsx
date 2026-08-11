// ==================================================
// PAGE /admin/utilisateurs
// ==================================================

import { useEffect, useState } from "react";
import { Shield, ShieldOff, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

function formaterDate(dateString) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function AdminUsers() {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUsers(data.users || []);
    } catch (err) {
      setError("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const toggleRole = async (userItem) => {
    const nouveauRole = userItem.role === "admin" ? "user" : "admin";

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userItem._id}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: nouveauRole }),
        },
      );

      if (!response.ok) throw new Error();

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userItem._id ? { ...u, role: nouveauRole } : u,
        ),
      );
    } catch (err) {
      setError("Impossible de modifier le rôle.");
    }
  };

  const handleDelete = async (userItem) => {
    if (!confirm(`Supprimer le compte de ${userItem.nom} ?`)) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userItem._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) throw new Error();

      setUsers((prev) => prev.filter((u) => u._id !== userItem._id));
    } catch (err) {
      setError("Impossible de supprimer cet utilisateur.");
    }
  };

  return (
    <div>
      <div
        className="text-xs tracking-widest uppercase text-[#C98A3A] mb-2"
        style={BODY_STYLE}
      >
        Administration
      </div>
      <h1
        className="text-2xl font-medium text-[#1F3A34] mb-8"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        Utilisateurs
      </h1>

      {loading && (
        <p className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
          Chargement...
        </p>
      )}
      {error && (
        <p className="text-sm text-[#C1443A] mb-4" style={BODY_STYLE}>
          {error}
        </p>
      )}

      {!loading && (
        <div className="rounded-2xl bg-white border border-[#1F3A34]/10 overflow-hidden">
          <table className="w-full text-sm" style={BODY_STYLE}>
            <thead>
              <tr className="border-b border-[#1F3A34]/10 text-left text-xs text-[#5C7A6E] uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Nom</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Rôle</th>
                <th className="px-5 py-3 font-medium">Inscrit le</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-[#1F3A34]/5 last:border-0"
                >
                  <td className="px-5 py-3 text-[#1F3A34]">{u.nom}</td>
                  <td className="px-5 py-3 text-[#5C7A6E]">{u.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        u.role === "admin"
                          ? "bg-[#C98A3A]/15 text-[#C98A3A]"
                          : "bg-[#1F3A34]/8 text-[#5C7A6E]"
                      }`}
                    >
                      {u.role === "admin" ? "Admin" : "Utilisateur"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#5C7A6E]">
                    {formaterDate(u.createdAt)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {u._id !== currentUser?.id && (
                        <>
                          <button
                            onClick={() => toggleRole(u)}
                            title={
                              u.role === "admin"
                                ? "Retirer les droits admin"
                                : "Passer admin"
                            }
                            className="p-2 rounded-lg text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34]"
                          >
                            {u.role === "admin" ? (
                              <ShieldOff size={15} />
                            ) : (
                              <Shield size={15} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(u)}
                            title="Supprimer"
                            className="p-2 rounded-lg text-[#5C7A6E] hover:bg-[#C1443A]/10 hover:text-[#C1443A]"
                          >
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}
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

export default AdminUsers;
