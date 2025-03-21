import { render, screen } from '@testing-library/react';
import { OnboardingGuard } from './onboardingGuard';
import { useStore } from '@/shared/store/storesContext';
import { MemoryRouter } from 'react-router-dom';

// Mock the store context
jest.mock('@/shared/store/storesContext', () => ({
  useStore: jest.fn()
}));

// Mock mobx-react-lite to handle the observer HOC
jest.mock('mobx-react-lite', () => ({
  observer: (component: any) => component
}));

describe('OnboardingGuard', () => {
  const mockUseStore = useStore as jest.Mock;
  
  // Helper function to setup common test scenarios
  const setupTest = (storeOverrides = {}) => {
    const defaultStore = {
      auth: {
        isLoading: false,
        isAuthenticated: () => false,
        hasCompletedOnboarding: () => false
      },
      navigation: {
        currentPath: '/'
      },
      ...storeOverrides
    };

    mockUseStore.mockReturnValue(defaultStore);

    return render(
      <MemoryRouter>
        <OnboardingGuard>
          <div data-testid="protected-content">Protected Content</div>
        </OnboardingGuard>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading spinner when auth is loading', () => {
    setupTest({
      auth: {
        isLoading: true,
        isAuthenticated: () => false,
        hasCompletedOnboarding: () => false
      }
    });

    expect(screen.getByTestId('overlay-spinner')).toBeInTheDocument();
  });

  it('should render children when user is not authenticated', () => {
    setupTest({
      auth: {
        isLoading: false,
        isAuthenticated: () => false,
        hasCompletedOnboarding: () => false
      }
    });

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('should redirect to onboarding when authenticated but not completed onboarding', () => {
    setupTest({
      auth: {
        isLoading: false,
        isAuthenticated: () => true,
        hasCompletedOnboarding: () => false
      }
    });

    // We can verify the redirect by checking the current location
    expect(window.location.pathname).toBe('/onboarding');
  });

  it('should redirect to home when authenticated, completed onboarding, and within onboarding flow', () => {
    setupTest({
      auth: {
        isLoading: false,
        isAuthenticated: () => true,
        hasCompletedOnboarding: () => true
      },
      navigation: {
        currentPath: '/onboarding'
      }
    });

    expect(window.location.pathname).toBe('/');
  });

  it('should render children when authenticated and completed onboarding', () => {
    setupTest({
      auth: {
        isLoading: false,
        isAuthenticated: () => true,
        hasCompletedOnboarding: () => true
      }
    });

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('should handle error states gracefully', () => {
    setupTest({
      auth: {
        isLoading: false,
        isAuthenticated: () => {
          throw new Error('Auth error');
        },
        hasCompletedOnboarding: () => false
      }
    });

    // Depending on your error handling strategy, you might want to:
    // 1. Show an error message
    // 2. Redirect to an error page
    // 3. Or fall back to showing the children
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });
}); 