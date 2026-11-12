import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AUTH_EVENT,
  clearLegacyAuthKeys,
  clearSession as clearStoredSession,
  getStoredUser,
  getToken,
  setSession as persistSession,
} from "./authStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    clearLegacyAuthKeys();

    const syncAuth = () => {
      setToken(getToken());
      setUser(getStoredUser());
    };

    syncAuth();
    window.addEventListener(AUTH_EVENT, syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener(AUTH_EVENT, syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const login = useCallback((nextToken, nextUser) => {
    persistSession(nextToken, nextUser);
    setToken(nextToken);
    setUser(nextUser || null);
  }, []);

  const logout = useCallback(() => {
    clearStoredSession();
    setToken(null);
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// The provider and its context hook intentionally share this module.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
