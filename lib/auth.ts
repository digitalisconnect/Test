// ---------------------------------------------------------------------------
// Demo authentication helper.
//
// SEAM FOR A REAL BACKEND:
// Replace the localStorage-backed session below with real calls to your
// auth provider (e.g. POST /api/signup, POST /api/login, cookie-based
// sessions). Keep the same shape (`Session`, `getSession`, `setSession`,
// `clearSession`) so pages do not need to change when this happens.
// ---------------------------------------------------------------------------

export interface Session {
  email: string;
  ownerName: string;
  restaurantSlug: string;
}

const SESSION_KEY = "monmenu_session_v1";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // ignore storage failures (private browsing, quota)
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
