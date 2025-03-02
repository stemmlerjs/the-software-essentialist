import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { PostsPage } from "./modules/posts/postsPage";
import { RegisterPage } from "./modules/registration/registerPage";
import { SpinnerProvider } from "./shared/contexts/spinnerContext";
import { FirebaseProvider } from './shared/auth/FirebaseProvider';
import { OnboardingPage } from "./modules/onboarding/onboardingPage";
import { ErrorBoundary } from "./shared/error/errorBoundary";
import { StoreProvider } from "./stores/root/StoreContext";
import { authStore, onboardingPresenter, postsPresenter, registrationPresenter, rootStore } from "./main";
import { AuthProvider } from "./stores/auth/authContext";

const App = () => {
  return (
    <ErrorBoundary>
      <StoreProvider store={rootStore}>
        <AuthProvider store={authStore}>
        <FirebaseProvider>
          <SpinnerProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PostsPage presenter={postsPresenter} />} />
                <Route path="/join" element={<RegisterPage presenter={registrationPresenter} />} />
                <Route path="/onboarding" element={<OnboardingPage presenter={onboardingPresenter} />} />
              </Routes>
            </BrowserRouter>
          </SpinnerProvider>
        </FirebaseProvider>
        </AuthProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
};

export default App;
