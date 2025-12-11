import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, me } from '../services/auth';
import { setAuthToken } from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setAuthToken(savedToken);
      (async () => {
        try {
          const data = await me();
          console.log("Fetched user on mount:", data);
          setUser(data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);

    // Extract token from login response
    const token =
      data.access_token ||
      data.token ||
      data.data?.token;

    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
    }

    // Fetch full user info after login
    const userData = await me();
    console.log("Fetched user after login:", userData);
    setUser(userData);

    return data;
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Logout API failed, clearing locally anyway:", err);
    }
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
