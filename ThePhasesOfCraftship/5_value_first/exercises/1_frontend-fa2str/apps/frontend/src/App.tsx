import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "./shared/error/errorBoundary";

import { StoreProvider } from "./shared/store/storesContext";
import { PresenterProvider } from "./shared/presenters/presentersContext";
import { SpinnerProvider } from "./services/spinner/spinnerContext";

import { SubmissionPage } from "./pages/submission/submissionPage";
import { RegisterPage } from "./pages/join/registerPage";
import { OnboardingPage } from "./pages/onboarding/onboardingPage";
import { PostsPage } from "./modules/posts/postsPage";
import { presenters, stores } from "./main";

const App = () => {
  return (
    <ErrorBoundary>
      <StoreProvider stores={stores}>
        <SpinnerProvider>
            <PresenterProvider presenters={presenters}>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<PostsPage />} />
                    <Route path="/join" element={<RegisterPage />} />
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    <Route path="/submit" element={<SubmissionPage />} />
                  </Routes>
                </BrowserRouter>
            </PresenterProvider>
          </SpinnerProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
};

export default App;
