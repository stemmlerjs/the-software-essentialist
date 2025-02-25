import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { createAPIClient } from '@dddforum/shared/src/api'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { RegisterPage } from "./pages/registerPage";
import { appConfig } from "./config";
import { SpinnerProvider } from "./shared/contexts/spinnerContext";
import { UserProvider } from "./shared/contexts/userContext";
import { Auth0ProviderWithNavigate } from './shared/auth/Auth0Provider';
import { CallbackPage } from "./pages/callbackPage";
import { OnboardingPage } from "./pages/onboardingPage";

export const api = createAPIClient(appConfig.apiURL);

function App() {
  return (
    <SpinnerProvider>
      <UserProvider>
        <BrowserRouter>
          <Auth0ProviderWithNavigate>
            <meta name="color-scheme" content="light only"></meta>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/join" element={<RegisterPage />} />
              <Route path="/callback" element={<CallbackPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Routes>
          </Auth0ProviderWithNavigate>
        </BrowserRouter>
      </UserProvider>
    </SpinnerProvider>
  );
}

export default App;
