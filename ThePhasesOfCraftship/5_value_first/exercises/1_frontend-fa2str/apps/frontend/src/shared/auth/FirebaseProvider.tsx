
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../contexts/storeContext';
import { FirebaseService } from '@/modules/users/externalServices/firebaseService';
import { appConfig } from '@/config';

// Initialize Firebase
const firebase = new FirebaseService(appConfig.firebase);

const FirebaseContext = createContext(firebase);

export const useFirebase = () => useContext(FirebaseContext);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider = observer(({ children }: FirebaseProviderProps) => {
  const { users } = useStore();

  useEffect(() => {
    // TODO: decouple this
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     // User is signed in
    //     const idToken = await user.getIdToken();
    //     // Update auth store with user info
    //     const currentUser = await authStore.getCurrentUser();
    //     if (currentUser) {
    //       authStore.setCurrentUser(currentUser);
    //     }
    //   } else {
    //     // User is signed out
    //     authStore.setCurrentUser(null);
    //   }
    // });

    // return () => unsubscribe();
  }, [users]);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
}); 