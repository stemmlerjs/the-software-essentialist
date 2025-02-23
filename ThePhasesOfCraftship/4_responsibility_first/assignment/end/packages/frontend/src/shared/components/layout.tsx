import { Content } from './content';
import { Header } from '../../modules/users/components/header'
import { OverlaySpinner } from './overlaySpinner';

export const Layout = ({ children }: any) => (
  <>
    <Header/>
    <Content>
      {children}
    </Content>
    <OverlaySpinner isActive={false}/>
  </>
)
