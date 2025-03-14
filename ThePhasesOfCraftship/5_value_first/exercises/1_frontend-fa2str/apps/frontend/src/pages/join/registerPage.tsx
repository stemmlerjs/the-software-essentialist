
import { useEffect, useState } from 'react';
import { OverlaySpinner } from '../../services/spinner/overlaySpinner';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { usePresenters } from '../../shared/presenters/presentersContext';

export const RegisterPage = observer(() => {
  const { registration: presenter } = usePresenters()
  // const navigate = useNavigate(); // TODO: get this to the presenter with dep injection
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const signIn = async () => {
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
