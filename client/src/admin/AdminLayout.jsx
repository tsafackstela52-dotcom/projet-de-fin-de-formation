// ==================================================
// LAYOUT ADMIN - NAVIGATION ENTRE LES SOUS-PAGES
// ==================================================

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  Activity,
  HelpCircle,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BODY_STYLE = { fontFamily: "Manrope, sans-serif" };

const ADMIN_LINKS = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/admin/maladies", label: "Maladies", icon: Stethoscope },
  { to: "/admin/symptomes", label: "Symptômes", icon: Activity },
  { to: "/admin/questions", label: "Questions", icon: HelpCircle },
  { to: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
];

function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F6F7F2] flex">
      {/* BARRE LATERALE */}
      <aside className="w-60 shrink-0 border-r border-[#1F3A34]/10 bg-white p-5 flex flex-col">
        <div className="mb-8">
          <div
            className="text-xs tracking-widest uppercase text-[#C98A3A] mb-1"
            style={BODY_STYLE}
          >
            Administration
          </div>
          <div className="text-sm text-[#5C7A6E]" style={BODY_STYLE}>
            {user?.nom}
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {ADMIN_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-[#1F3A34] text-[#F6F7F2]"
                    : "text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34]"
                }`
              }
              style={BODY_STYLE}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-[#5C7A6E] hover:bg-[#1F3A34]/5 mt-4"
          style={BODY_STYLE}
        >
          <ArrowLeft size={16} strokeWidth={1.75} />
          Retour au site
        </button>
      </aside>

      {/* CONTENU DE LA SOUS-PAGE */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
