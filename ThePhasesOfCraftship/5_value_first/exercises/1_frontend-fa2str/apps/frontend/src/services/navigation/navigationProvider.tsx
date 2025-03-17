import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '@/shared/store/storesContext';

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider = observer(({ children }: NavigationProviderProps) => {
  const navigate = useNavigate();
  const { navigation } = useStore();

  useEffect(() => {
    navigation.setNavigateFunction(navigate);
  }, [navigate]);

  return <>{children}</>;
}); 