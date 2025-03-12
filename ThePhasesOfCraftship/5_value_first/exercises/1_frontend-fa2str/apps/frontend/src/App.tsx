import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { PostsPage } from "./modules/posts/postsPage";
import { RegisterPage } from "./modules/registration/registerPage";
import { SpinnerProvider } from "./shared/contexts/spinnerContext";
import { OnboardingPage } from "./modules/onboarding/onboardingPage";
import { ErrorBoundary } from "./shared/error/errorBoundary";

import { PresenterProvider } from "./shared/contexts/presentersContext";
import { AuthProvider } from "./shared/stores/auth/authContext";
import { SubmissionPage } from "./modules/submission/submissionPage";
// import { authStore, presenters, rootStore } from "./main";
import { StoreProvider } from "./shared/contexts/storeContext";
import { FirebaseProvider } from "./shared/auth/firebaseProvider";

const App = () => {
  return (
    <ErrorBoundary>
      <div>test</div>
      {/* <StoreProvider store={rootStore}>
        <div>test</div>
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
      </StoreProvider> */}
    </ErrorBoundary>
  );
};

export default App;
