import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const STORAGE_KEY = "auth";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const storedAuth = localStorage.getItem(STORAGE_KEY);
      return storedAuth ? JSON.parse(storedAuth) : null;
    } catch (err) {
      console.error("Failed to parse stored auth:", err);
      return null;
    }
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
