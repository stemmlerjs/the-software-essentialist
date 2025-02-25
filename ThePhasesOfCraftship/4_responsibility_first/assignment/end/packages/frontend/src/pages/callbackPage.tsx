import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OverlaySpinner } from '../shared/components/overlaySpinner';

export const CallbackPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/onboarding');
    }
  }, [isLoading, isAuthenticated, navigate]);

  return <OverlaySpinner isActive={true} />;
}; 