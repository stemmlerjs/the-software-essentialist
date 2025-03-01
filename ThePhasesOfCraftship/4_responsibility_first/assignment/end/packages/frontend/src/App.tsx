import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { RegisterPage } from "./pages/registerPage";
import { SpinnerProvider } from "./shared/contexts/spinnerContext";
import { UserProvider } from "./shared/contexts/userContext";
import { FirebaseProvider } from './shared/auth/FirebaseProvider';
import { OnboardingPage } from "./pages/onboardingPage";

function App() {
  return (
    <SpinnerProvider>
      <UserProvider>
        <BrowserRouter>
          <FirebaseProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/join" element={<RegisterPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Routes>
          </FirebaseProvider>
        </BrowserRouter>
      </UserProvider>
    </SpinnerProvider>
  );
}

export default App;
