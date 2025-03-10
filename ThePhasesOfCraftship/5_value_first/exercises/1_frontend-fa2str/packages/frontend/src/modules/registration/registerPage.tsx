
import { useEffect, useState } from 'react';
import { OverlaySpinner } from '../../shared/components/overlaySpinner';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { usePresenters } from '../../shared/contexts/presentersContext';

export const RegisterPage = observer(() => {
  const { registration: presenter } = usePresenters()
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const signIn = async () => {
      if (!signingIn) {
        setSigningIn(true);
        try {
          await presenter.registerWithGoogle(navigate);
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
