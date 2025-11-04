import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, name: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple in-memory user storage (for demo purposes)
const STORAGE_KEY = "amazon_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    try {
      // Simple validation - in real app, this would call an API
      if (!email || !password) {
        toast.error("Please enter email and password");
        return false;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }

      // Check if user exists in localStorage (for demo)
      const existingUsers = JSON.parse(localStorage.getItem("amazon_users") || "[]");
      const userExists = existingUsers.find((u: any) => u.email === email);

      if (!userExists) {
        toast.error("Account not found. Please register first.");
        return false;
      }

      if (userExists.password !== password) {
        toast.error("Incorrect password. Please try again.");
        return false;
      }

      const userData = { email: userExists.email, name: userExists.name };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      toast.success(`Welcome back, ${userExists.name}!`);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
      return false;
    }
  };

  const register = (email: string, password: string, name: string): boolean => {
    try {
      if (!email || !password || !name) {
        toast.error("Please fill all fields");
        return false;
      }

      if (name.length < 2) {
        toast.error("Name must be at least 2 characters");
        return false;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("amazon_users") || "[]");
      const userExists = existingUsers.find((u: any) => u.email === email);

      if (userExists) {
        toast.error("An account with this email already exists. Please login.");
        return false;
      }

      // Save user to localStorage
      const newUser = { email, password, name };
      existingUsers.push(newUser);
      localStorage.setItem("amazon_users", JSON.stringify(existingUsers));

      const userData = { email, name };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      toast.success(`Welcome to Amazon, ${name}!`);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
