// ==================================================
// CONTEXTE D'AUTHENTIFICATION
// ==================================================
//
// Retient si l'utilisateur est connecte, partout dans
// l'application. Le token est stocke dans localStorage
// pour rester connecte apres un rechargement de page.

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au chargement de l'app, on recupere une session
  // deja enregistree dans localStorage (si presente)
  useEffect(() => {
    const savedToken = localStorage.getItem("vitalis_token");
    const savedUser = localStorage.getItem("vitalis_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = (newToken, newUser) => {
    localStorage.setItem("vitalis_token", newToken);
    localStorage.setItem("vitalis_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("vitalis_token");
    localStorage.removeItem("vitalis_user");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur de <AuthProvider>",
    );
  }
  return context;
}
