
import { useEffect, useState } from 'react';
import { OverlaySpinner } from '../shared/components/overlaySpinner';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RegistrationPresenter } from '../modules/users/application/registrationPresenter';

export const RegisterPage = observer(({ presenter }: { presenter: RegistrationPresenter }) => {
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
