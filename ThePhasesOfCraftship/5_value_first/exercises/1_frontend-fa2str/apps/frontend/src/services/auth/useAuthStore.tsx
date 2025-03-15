
import { useEffect, useState } from 'react';
import { observe } from 'mobx';

import { useStore } from '@/shared/store/storesContext';
import { UserDm } from '@/modules/members/domain/userDm';

export const useAuthStore = () => {
  const { auth } = useStore()
  const [currentUser, setCurrentUser] = useState<UserDm | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState(auth.isLoading);

  useEffect(() => {
    const disposer = observe(auth, (change) => {
      if (change.name === 'currentUser') {
        setCurrentUser(change.object.currentUser);
      }
      if (change.name === 'isLoading') {
        setIsLoading(change.object.isLoading);
      }
    });

    return () => disposer();
  }, [auth]);

  return {
    currentUser,
    isAuthenticated: auth.isAuthenticated,
    isLoading,
    signOut: () => auth.signOut(),
  };
}; 