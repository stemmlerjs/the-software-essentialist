import { Stores } from '@/shared/store/stores';
import { createContext, useContext } from 'react';

const StoreContext = createContext<Stores | null>(null);

export const StoreProvider: React.FC<{
  stores: Stores;
  children: React.ReactNode;
}> = ({ stores, children }) => {
  return (
    <StoreContext.Provider value={stores}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
}; 