import { useEffect, useState } from 'react';
import { observe } from 'mobx';
import { useAuth } from './authContext';
import { UserDm } from '../../modules/users/domain/userDm';

export const useAuthStore = () => {
  const authStore = useAuth();
  const [currentUser, setCurrentUser] = useState<UserDm | null>(authStore.currentUser);
  const [isLoading, setIsLoading] = useState(authStore.isLoading);

  useEffect(() => {
    const disposer = observe(authStore, (change) => {
      if (change.name === 'currentUser') {
        setCurrentUser(change.object.currentUser);
      }
      if (change.name === 'isLoading') {
        setIsLoading(change.object.isLoading);
      }
    });

    return () => disposer();
  }, [authStore]);

  return {
    currentUser,
    isAuthenticated: authStore.isAuthenticated,
    isLoading,
    signOut: () => authStore.signOut(),
  };
}; 