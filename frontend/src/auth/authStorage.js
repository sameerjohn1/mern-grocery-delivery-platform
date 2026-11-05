export const AUTH_EVENT = "GreenCart-auth-change";
export const REDIRECT_KEY = "GreenCart-redirect-after-login";

const TOKEN_KEY = "token";
const USER_KEY = "GreenCart-user";
const AUTH_FLAG_KEY = "GreenCart-auth";

const LEGACY_AUTH_KEYS = [
  "freshmart-auth",
  "freshmart-user",
  "freshmart-redirect-after-login",
];

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  const savedUser = localStorage.getItem(USER_KEY);
  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
};

export const storeRedirect = (path) => {
  if (path) {
    localStorage.setItem(REDIRECT_KEY, path);
  }
};

export const consumeRedirect = (fallback = "/") => {
  const path = localStorage.getItem(REDIRECT_KEY);
  localStorage.removeItem(REDIRECT_KEY);
  return path || fallback;
};

export const clearLegacyAuthKeys = () => {
  LEGACY_AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
};

export const setSession = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user || null));
  localStorage.setItem(AUTH_FLAG_KEY, "true");
  clearLegacyAuthKeys();
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(AUTH_FLAG_KEY);
  localStorage.removeItem(REDIRECT_KEY);
  clearLegacyAuthKeys();
  window.dispatchEvent(new Event(AUTH_EVENT));
};
