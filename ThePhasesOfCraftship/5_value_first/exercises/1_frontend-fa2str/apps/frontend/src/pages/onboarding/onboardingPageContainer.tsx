import { Navigate } from 'react-router-dom';
import { useStore } from '@/shared/store/storesContext';
import { observer } from 'mobx-react-lite';
import { OverlaySpinner } from '@/shared/spinner/overlaySpinner';
import { OnboardingPage } from './onboardingPage';

interface OnboardingPageGuardProps {
  children: React.ReactNode;
}

export const OnboardingPageContainer = observer(({ children }: OnboardingPageGuardProps) => {
  const { auth } = useStore();
  
  if (auth.isLoading) {
    return <OverlaySpinner isActive={true} />;
  }

  // If not authenticated, redirect to join
  if (!auth.isAuthenticated()) {
    return <Navigate to="/join" replace />;
  }

  // If they've already completed onboarding, send them home
  if (auth.hasCompletedOnboarding()) {
    return <Navigate to="/" replace />;
  }

  return <OnboardingPage/>
}); 