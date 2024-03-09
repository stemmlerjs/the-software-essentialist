import { Header } from './header';

export const Content = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className='container mx-auto px-24'>
    <Header pathName={location.pathname} />
    <Content>{children}</Content>
  </div>
);
