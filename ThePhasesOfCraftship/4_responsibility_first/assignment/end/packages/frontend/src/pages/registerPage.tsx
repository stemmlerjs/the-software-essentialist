
import { useEffect, useState } from 'react';
import { OverlaySpinner } from '../shared/components/overlaySpinner';
import { registrationPresenter } from '../main';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const signIn = async () => {
      if (!signingIn) {
        setSigningIn(true);
        try {
          await registrationPresenter.registerWithGoogle(navigate);
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
};
