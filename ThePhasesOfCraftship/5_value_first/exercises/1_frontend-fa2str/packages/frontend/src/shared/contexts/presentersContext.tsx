import { createContext, useContext } from 'react';
import { Presenters } from './presenters';

const PresenterContext = createContext<Presenters | null>(null);

export const PresenterProvider: React.FC<{
  presenters: Presenters;
  children: React.ReactNode;
}> = ({ presenters, children }) => {
  return (
    <PresenterContext.Provider value={presenters}>
      {children}
    </PresenterContext.Provider>
  );
};

export const usePresenters = () => {
  const store = useContext(PresenterContext);
  if (!store) {
    throw new Error('usePresenters must be used within a PresenterProvider');
  }
  return store;
}; 