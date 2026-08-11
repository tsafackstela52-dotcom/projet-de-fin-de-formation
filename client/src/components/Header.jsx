// src/components/Header.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Menu,
  X,
  Phone,
  LogOut,
  ChevronDown,
  Pill,
  Search,
  ShieldAlert,
  HeartPulse,
} from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/symptomes", label: "Symptomes" },
  { to: "/maladies", label: "Maladies" },
  { to: "/rendez-vous", label: "Rendez-vous" },
  { to: "/assistant", label: "Assistant IA" },
  { to: "/contact", label: "Contact" },
];

const SANTE_LINKS = [
  { to: "/medicaments", label: "Médicaments & compléments", icon: Pill },
  { to: "/identifier-pilule", label: "Identifier une pilule", icon: Search },
  {
    to: "/interactions",
    label: "Vérifier des interactions",
    icon: ShieldAlert,
  },
  { to: "/bien-etre", label: "Bien-être", icon: HeartPulse },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [santeOpen, setSanteOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F6F7F2]/90 backdrop-blur-sm border-b border-[#1F3A34]/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <Logo size={32} />
            <span
              className="text-xl font-medium tracking-tight text-[#1F3A34]"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Vitalis
            </span>
          </a>

          <nav
            className="hidden md:flex items-center gap-1"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {NAV_LINKS.map(function (link) {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={function (props) {
                    return props.isActive
                      ? "px-3 py-2 text-sm rounded-full transition-colors bg-[#1F3A34] text-[#F6F7F2]"
                      : "px-3 py-2 text-sm rounded-full transition-colors text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34]";
                  }}
                >
                  {link.label}
                </NavLink>
              );
            })}

            {/* MENU DEROULANT SANTE & BIEN-ETRE */}
            <div className="relative">
              <button
                onClick={function () {
                  setSanteOpen(!santeOpen);
                }}
                onBlur={function () {
                  setTimeout(function () {
                    setSanteOpen(false);
                  }, 150);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-full transition-colors text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34]"
              >
                Santé & Bien-être
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={
                    santeOpen
                      ? "rotate-180 transition-transform"
                      : "transition-transform"
                  }
                />
              </button>

              {santeOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white shadow-lg ring-1 ring-[#1F3A34]/10 py-2">
                  {SANTE_LINKS.map(function ({ to, label, icon: Icon }) {
                    return (
                      <NavLink
                        key={to}
                        to={to}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1F3A34] hover:bg-[#1F3A34]/5"
                      >
                        <Icon
                          size={16}
                          strokeWidth={1.75}
                          className="text-[#5C7A6E]"
                        />
                        {label}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          <a
            href="/urgences"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C1443A]/10 text-[#C1443A] text-sm font-medium hover:bg-[#C1443A]/15 transition-colors"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <Phone size={15} strokeWidth={2} />
            Urgences
          </a>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button
                    onClick={function () {
                      setNotifOpen(!notifOpen);
                    }}
                    aria-label="Notifications"
                    className="relative p-2 rounded-full text-[#5C7A6E] hover:bg-[#1F3A34]/5 hover:text-[#1F3A34] transition-colors"
                  >
                    <Bell size={20} strokeWidth={1.75} />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#C98A3A]"></span>
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-lg ring-1 ring-[#1F3A34]/10 p-3">
                      <p className="text-sm font-medium text-[#1F3A34] px-2 pb-2">
                        Notifications
                      </p>
                      <div className="px-2 py-3 text-sm text-[#5C7A6E]">
                        Aucune nouvelle notification.
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={function () {
                      setProfileOpen(!profileOpen);
                    }}
                    aria-label="Profil"
                    className="flex items-center gap-2 pl-1 pr-3 h-9 rounded-full bg-[#1F3A34] text-[#F6F7F2] hover:opacity-90 transition-opacity"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/15">
                      <User size={16} strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-medium max-w-[100px] truncate">
                      {user?.nom || "Mon compte"}
                    </span>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-lg ring-1 ring-[#1F3A34]/10 py-2">
                      <div className="px-4 py-2 border-b border-[#1F3A34]/10 mb-1">
                        <p className="text-sm font-medium text-[#1F3A34] truncate">
                          {user?.nom}
                        </p>
                        <p className="text-xs text-[#5C7A6E] truncate">
                          {user?.email}
                        </p>
                      </div>
                      {user?.role === "admin" && (
                        <a
                          href="/admin"
                          className="block px-4 py-2 text-sm text-[#1F3A34] hover:bg-[#1F3A34]/5"
                        >
                          Administration
                        </a>
                      )}
                      <a
                        href="/tableau-de-bord"
                        className="block px-4 py-2 text-sm text-[#1F3A34] hover:bg-[#1F3A34]/5"
                      >
                        Tableau de bord
                      </a>
                      <a
                        href="/historique"
                        className="block px-4 py-2 text-sm text-[#1F3A34] hover:bg-[#1F3A34]/5"
                      >
                        Mon historique
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#C98A3A] hover:bg-[#1F3A34]/5"
                      >
                        <LogOut size={14} strokeWidth={2} />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a
                  href="/connexion"
                  className="px-4 py-2 text-sm rounded-full text-[#1F3A34] hover:bg-[#1F3A34]/5 transition-colors"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Connexion
                </a>
                <a
                  href="/inscription"
                  className="px-4 py-2 text-sm rounded-full bg-[#1F3A34] text-[#F6F7F2] hover:opacity-90 transition-opacity"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  S'inscrire
                </a>
              </>
            )}
          </div>

          <button
            onClick={function () {
              setMobileOpen(!mobileOpen);
            }}
            aria-label="Menu"
            className="md:hidden p-2 rounded-full text-[#1F3A34]"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="md:hidden border-t border-[#1F3A34]/10 px-4 py-3 flex flex-col gap-2 bg-[#F6F7F2]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <a
            href="/urgences"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#C1443A] text-white text-sm font-semibold mb-1"
          >
            <Phone size={16} strokeWidth={2} />
            Urgences - appeler maintenant
          </a>

          {NAV_LINKS.map(function (link) {
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={function () {
                  setMobileOpen(false);
                }}
                className={function (props) {
                  return props.isActive
                    ? "px-3 py-2.5 rounded-xl text-sm bg-[#1F3A34] text-[#F6F7F2]"
                    : "px-3 py-2.5 rounded-xl text-sm text-[#5C7A6E]";
                }}
              >
                {link.label}
              </NavLink>
            );
          })}

          <div className="pt-2 mt-1 border-t border-[#1F3A34]/10">
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#C98A3A]">
              Santé & Bien-être
            </div>
            {SANTE_LINKS.map(function ({ to, label, icon: Icon }) {
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={function () {
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#5C7A6E]"
                >
                  <Icon size={16} strokeWidth={1.75} />
                  {label}
                </NavLink>
              );
            })}
          </div>

          <div className="pt-2 mt-2 border-t border-[#1F3A34]/10">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm text-[#1F3A34] font-medium">
                  {user?.nom}
                </div>
                {user?.role === "admin" && (
                  <a
                    href="/admin"
                    className="block px-3 py-2.5 rounded-xl text-sm text-[#1F3A34]"
                  >
                    Administration
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl text-sm text-[#C98A3A]"
                >
                  <LogOut size={16} strokeWidth={2} />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <a
                  href="/connexion"
                  className="block px-3 py-2.5 rounded-xl text-sm text-[#1F3A34]"
                >
                  Connexion
                </a>
                <a
                  href="/inscription"
                  className="block px-3 py-2.5 rounded-xl text-sm bg-[#1F3A34] text-[#F6F7F2] text-center mt-1"
                >
                  S'inscrire
                </a>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
