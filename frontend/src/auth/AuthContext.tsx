import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { login as requestLogin } from '../services/authApi';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('accessToken'));

  const logout = useCallback(() => {
    sessionStorage.removeItem('accessToken');
    setToken(null);
  }, []);

  useEffect(() => {
    window.addEventListener('auth-expired', logout);
    return () => window.removeEventListener('auth-expired', logout);
  }, [logout]);

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: Boolean(token),
    login: async (username, password) => {
      const response = await requestLogin(username, password);
      sessionStorage.setItem('accessToken', response.accessToken);
      setToken(response.accessToken);
    },
    logout,
  }), [token, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}
