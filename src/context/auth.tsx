"use client";
import { useRouter } from "next/navigation";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface AuthContextProviderProps {
  children: ReactNode;
}
interface User {
  fullname: string;
  email: string;
  password: string;
}
interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof localStorage !== undefined) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [router]);

  const login = () => {
    console.log("Login Function");
    router.push("/dashboard");
  };
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
