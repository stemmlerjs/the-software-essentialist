// UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your user data
interface SpinnerData {
  isActive: boolean;
}

// Create a context with initial data
const SpinnerContext = createContext<{
  spinner: SpinnerData;
  activate: React.Dispatch<React.SetStateAction<void>>;
  deactivate: React.Dispatch<React.SetStateAction<void>>;
}>({
  spinner: { isActive: false },
  activate: () => null,
  deactivate: () => null,
});

// Custom hook to access the user context
export const useSpinner = () => {
  return useContext(SpinnerContext);
};

// Context provider component
export const SpinnerProvider: React.FC<{children: ReactNode }> = ({ children }) => {
  const [spinner, setSpinner] = useState<SpinnerData>({ isActive: false });
  const activate = () => {
    setSpinner({ isActive: true });
  }
  
  const deactivate = () => {
    setSpinner({ isActive: false });
  }

  return (
    <SpinnerContext.Provider value={{ spinner, activate, deactivate }}>
      {children}
    </SpinnerContext.Provider>
  );
};