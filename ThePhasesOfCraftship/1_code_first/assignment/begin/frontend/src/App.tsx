import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/mainPage';
import { RegisterPage } from './pages/RegistrationPage';
import { ToastContainer } from 'react-toast';
import { UserProvider } from './contexts/usersContext';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <meta name='color-scheme' content='light only' />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
      <ToastContainer position='top-right' delay={3 * 1000} />
    </>
  );
}

export default App;
