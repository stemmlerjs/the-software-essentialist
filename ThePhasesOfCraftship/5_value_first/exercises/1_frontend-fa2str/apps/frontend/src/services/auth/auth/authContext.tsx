
import React, { createContext, useContext } from 'react';
import { AuthService } from '../authService';
const AuthContext = createContext<AuthService | null>(null);

interface AuthProviderProps {
  service: AuthService;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ service, children }) => {
  return (
    <AuthContext.Provider value={service}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 