
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication for now - will be replaced with real auth later
  useEffect(() => {
    // Check for saved user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem("schoolierUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock successful login
      const mockUser: User = {
        id: "user-123",
        name: "John Doe",
        email: email,
        role: "student",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D9488&color=fff",
      };
      setCurrentUser(mockUser);
      localStorage.setItem("schoolierUser", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Mock successful registration
      const mockUser: User = {
        id: "user-123",
        name: name,
        email: email,
        role: "student",
        avatar: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=0D9488&color=fff`,
      };
      setCurrentUser(mockUser);
      localStorage.setItem("schoolierUser", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem("schoolierUser");
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: currentUser !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
