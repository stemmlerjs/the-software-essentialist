import { Navigate } from 'react-router-dom';
import { useStore } from '@/shared/store/storesContext';
import { observer } from 'mobx-react-lite';
import { OverlaySpinner } from '@/shared/spinner/overlaySpinner';

interface OnboardingGuardProps {
  children: React.ReactNode;
}

/**
 * Technicaly, guards like this are incoming adapters which can be tested if they're mocked appropriately.
 * Alternatively, we can always encapsulate this logic into an onboardingGuard presenter.
 */

export const OnboardingGuard = observer(({ children }: OnboardingGuardProps) => {
  const { auth } = useStore();
  
  if (auth.isLoading) {
    return <OverlaySpinner isActive={true} />;
  }

  const isAuthenticated = auth.isAuthenticated();
  const hasCompletedOnboarding = auth.hasCompletedOnboarding();

  // If they're authenticated but haven't completed onboarding, send them to onboarding
  if (isAuthenticated && !hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  // If they're on the onboarding page but have completed it, redirect to home
  if (isAuthenticated && hasCompletedOnboarding && window.location.pathname === '/onboarding') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
});