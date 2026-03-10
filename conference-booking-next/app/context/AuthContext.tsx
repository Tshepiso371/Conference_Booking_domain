"use client";

import { createContext, useContext, useState, useEffect } from "react";

type User = {
  username: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Hydrate from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setUser({ username: "Employee" }); // simple placeholder user
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser({ username: "Employee" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}