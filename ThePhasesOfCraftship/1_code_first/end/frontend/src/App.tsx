import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { RegisterPage } from "./pages/registerPage";

function App() {
  return (
    <BrowserRouter>
      <meta name="color-scheme" content="light only"></meta>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/join" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
