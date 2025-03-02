import React, { createContext, useContext } from 'react';
import { AuthStore } from './authStore';

const AuthContext = createContext<AuthStore | null>(null);

interface AuthProviderProps {
  store: AuthStore;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ store, children }) => {
  return (
    <AuthContext.Provider value={store}>
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