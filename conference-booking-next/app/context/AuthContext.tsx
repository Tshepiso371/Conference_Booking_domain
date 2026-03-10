"use client";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

type User = {
  username: string;
  role: string;
};

type TokenPayload = {
  sub: string;
  unique_name: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const decoded = jwtDecode<TokenPayload>(storedToken);

      setToken(storedToken);

      setUser({
        username: decoded.unique_name,
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      });
    }
  }, []);

  const login = (token: string) => {

    localStorage.setItem("token", token);

    const decoded = jwtDecode<TokenPayload>(token);

    setToken(token);

    setUser({
      username: decoded.unique_name,
      role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    });
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