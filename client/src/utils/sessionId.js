// ==================================================
// IDENTIFIANT DE SESSION ANONYME
// ==================================================
//
// Genere un identifiant unique stocke dans localStorage,
// pour retrouver l'historique propre a ce navigateur
// sans systeme de compte utilisateur.

const SESSION_KEY = "vitalis_session_id";

export function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId =
      "session_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}
