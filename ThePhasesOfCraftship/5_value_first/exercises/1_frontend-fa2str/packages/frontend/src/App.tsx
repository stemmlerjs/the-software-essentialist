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
import { authStore, presenters, rootStore } from "./main";
import { PresenterProvider } from "./shared/contexts/presentersContext";
import { StoreProvider } from "./shared/stores/root/StoreContext";
import { AuthProvider } from "./shared/stores/auth/authContext";
import { SubmissionPage } from "./modules/submission/submissionPage";

const App = () => {
  return (
    <ErrorBoundary>
      <StoreProvider store={rootStore}>
        <AuthProvider store={authStore}>
          <FirebaseProvider>
            <PresenterProvider presenters={presenters}>
              <SpinnerProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<PostsPage />} />
                    <Route path="/join" element={<RegisterPage />} />
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    <Route path="/submit" element={<SubmissionPage />} />
                  </Routes>
                </BrowserRouter>
              </SpinnerProvider>
            </PresenterProvider>
          </FirebaseProvider>
        </AuthProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
};

export default App;
