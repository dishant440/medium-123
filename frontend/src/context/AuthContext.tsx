import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);

  const login = () => {
    setisAuthenticated(true);
  };

  const logout = () => {
    setisAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  
  export { AuthProvider, useAuth };