import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';

const App = () => (
  <div
    className={
      'tw-absolute tw-inset-0 tw-bg-slate-100 tw-flex tw-flex-col tw-overflow-auto'
    }
  >
    <Header />

    <main className={'tw-flex-1'}>
      <Outlet />
    </main>

    <Footer />

    <ToastContainer />
  </div>
);

export { App };
