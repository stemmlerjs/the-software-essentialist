import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { OverlaySpinner } from '../shared/components/overlaySpinner';

export const RegisterPage = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      }
    });
  }, []);

  return <OverlaySpinner isActive={true} />;
};
