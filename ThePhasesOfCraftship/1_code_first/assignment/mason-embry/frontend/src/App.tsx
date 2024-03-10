import { Outlet } from 'react-router-dom';

import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';

const App = () => (
  <div className={'tw-absolute tw-inset-0 tw-bg-slate-100 tw-flex tw-flex-col'}>
    <Header />

    <main className={'tw-flex-1'}>
      <Outlet />
    </main>

    <Footer />
  </div>
);

export { App };
