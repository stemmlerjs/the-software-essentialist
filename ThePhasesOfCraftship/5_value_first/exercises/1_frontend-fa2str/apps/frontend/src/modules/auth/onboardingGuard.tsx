
import { Navigate } from 'react-router-dom';
import { useStore } from '@/shared/store/storesContext';
import { observer } from 'mobx-react-lite';
import { OverlaySpinner } from '@/shared/spinner/overlaySpinner';

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export const OnboardingGuard = observer(({ children }: OnboardingGuardProps) => {
  const { auth } = useStore();
  
  const isLoading = auth.isLoading;
  const isAuthenticated = auth.isAuthenticated();
  const hasCompletedOnboarding = auth.hasCompletedOnboarding();

  if (isLoading) {
    return <OverlaySpinner isActive={true}/>
  }

  if (isAuthenticated && !hasCompletedOnboarding && !isLoading) {
    console.log('redirecting to onboarding')
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
});