import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { RegisterPage } from "./pages/registerPage";
import { SpinnerProvider } from "./shared/contexts/spinnerContext";
import { FirebaseProvider } from './shared/auth/FirebaseProvider';
import { OnboardingPage } from "./pages/onboardingPage";
import { ErrorBoundary } from "./shared/error/errorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
      <SpinnerProvider>
        <BrowserRouter>
          
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/join" element={<RegisterPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Routes>
          
        </BrowserRouter>
      </SpinnerProvider>
      </FirebaseProvider>
    </ErrorBoundary>
  );
};

export default App;
