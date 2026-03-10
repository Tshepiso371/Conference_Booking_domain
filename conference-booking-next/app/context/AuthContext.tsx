"use client";
import { jwtDecode } from "jwt-decode";
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

type TokenPayload = {
    sub: string;
    role: string;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Hydrate from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const decoded = jwtDecode<any>(storedToken);
      setToken(storedToken);
      setUser({
  username: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode<any>(token);
    console.log("Decoded token:", decoded);
    setToken(token);
    setUser({
  username: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
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