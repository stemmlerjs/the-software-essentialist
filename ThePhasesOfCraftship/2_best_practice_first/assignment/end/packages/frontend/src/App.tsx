import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { createAPIClient } from '@dddforum/shared/src/api'

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { RegisterPage } from "./pages/registerPage";
import { UserProvider } from "./contexts/userContext";
import { SpinnerProvider } from "./contexts/spinnerContext";

const apiUrl = import.meta.env.VITE_API_URL;
export const api = createAPIClient(apiUrl);

function App() {
  return (
    <SpinnerProvider>
      <UserProvider>
        <BrowserRouter>
          <meta name="color-scheme" content="light only"></meta>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/join" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </SpinnerProvider>
  );
}

export default App;
