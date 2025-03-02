import { createContext, useContext, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../../config';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/root/StoreContext';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseContext = createContext(auth);

export const useFirebase = () => useContext(FirebaseContext);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider = observer(({ children }: FirebaseProviderProps) => {
  const { auth: authStore } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const idToken = await user.getIdToken();
        // Update auth store with user info
        const currentUser = await authStore.getCurrentUser();
        if (currentUser) {
          authStore.setCurrentUser(currentUser);
        }
      } else {
        // User is signed out
        authStore.setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [authStore]);

  return (
    <FirebaseContext.Provider value={auth}>
      {children}
    </FirebaseContext.Provider>
  );
}); 