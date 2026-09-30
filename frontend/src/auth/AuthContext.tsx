import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { login as requestLogin } from '../services/authApi';

interface AuthContextValue {
  isAuthenticated: boolean;
  username: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => {
    const storedToken = sessionStorage.getItem('accessToken');
    if (!sessionStorage.getItem('accountRole')) sessionStorage.removeItem('accessToken');
    return sessionStorage.getItem('accountRole') ? storedToken : null;
  });
  const [username, setUsername] = useState(() => sessionStorage.getItem('accountUsername'));
  const [role, setRole] = useState(() => sessionStorage.getItem('accountRole'));

  const logout = useCallback(() => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('accountRole');
    sessionStorage.removeItem('accountUsername');
    setToken(null);
    setRole(null);
    setUsername(null);
  }, []);

  useEffect(() => {
    window.addEventListener('auth-expired', logout);
    return () => window.removeEventListener('auth-expired', logout);
  }, [logout]);

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: Boolean(token),
    username,
    role,
    login: async (username, password) => {
      const response = await requestLogin(username, password);
      sessionStorage.setItem('accessToken', response.accessToken);
      sessionStorage.setItem('accountUsername', response.username);
      sessionStorage.setItem('accountRole', response.role);
      setToken(response.accessToken);
      setUsername(response.username);
      setRole(response.role);
    },
    logout,
  }), [token, username, role, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}
