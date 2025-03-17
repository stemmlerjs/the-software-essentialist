
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { usePresenters } from '../../shared/presenters/presentersContext';
import { OverlaySpinner } from '@/shared/spinner/overlaySpinner';

export const RegisterPage = observer(() => {
  const { registration: presenter } = usePresenters()
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const signIn = async () => {
      // TODO: use the registration presenter for signing in state
      if (!signingIn) {
        setSigningIn(true);
        try {
          await presenter.registerWithGoogle();
        } catch (error) {
          console.error('Auth error:', error);
          // Optionally reset signingIn state if needed
          setSigningIn(false);
        }
      }
    };

    signIn();
  }, [signingIn]);

  return <OverlaySpinner isActive={true} />;
})
