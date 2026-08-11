// ==================================================
// ROUTE PROTEGEE
// ==================================================
//
// Bloque l'acces a une page si l'utilisateur n'est pas
// connecte, meme en tapant l'URL directement dans le
// navigateur. Redirige vers /inscription en memorisant
// la page visee, pour y revenir apres connexion.

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Le temps de verifier localStorage au premier chargement
  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/inscription" state={{ from: location.pathname }} replace />
    );
  }

  return children;
}

export default ProtectedRoute;
