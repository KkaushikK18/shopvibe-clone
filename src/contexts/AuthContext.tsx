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
    // Simple validation - in real app, this would call an API
    if (email && password.length >= 6) {
      const userData = { email, name: email.split("@")[0] };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      toast.success("Login successful!");
      return true;
    }
    toast.error("Invalid credentials");
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    if (email && password.length >= 6 && name) {
      const userData = { email, name };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      toast.success("Account created successfully!");
      return true;
    }
    toast.error("Please fill all fields correctly");
    return false;
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
