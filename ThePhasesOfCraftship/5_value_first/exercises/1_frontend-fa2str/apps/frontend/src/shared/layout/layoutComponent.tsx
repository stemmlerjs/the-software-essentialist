import { OverlaySpinner } from '../../services/spinner/overlaySpinner';
import logo from "../../shared/assets/dddforumlogo.png";
import { Link, useLocation } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { appSelectors, toClass } from '../../shared/selectors';
import { navLoginPresenter } from '../../main';
import { useEffect, useState } from 'react';
import { UserLoginLayoutViewModel } from './userLoginLayoutVm';

export const Content = ({ children }: any) => (
  <div className='content-container'>
    {children}
  </div>
)

// All components which use observables must use 'observer'
export const Layout = observer(({ children }: any) => {
  const location = useLocation();
  const [vm, setVmToLocalState] = useState<UserLoginLayoutViewModel>();

  useEffect(() => {
    navLoginPresenter.load((userLoginVm) => {
      setVmToLocalState(userLoginVm);
    })
  }, [navLoginPresenter.userLoginVm]) // We observe the view model in the presenter

  return (
    <>
      <header id="header" className="flex align-center">
        <div id="app-logo">
          <img src={logo}></img>
        </div>
        <div id="title-container">
          <h1>Domain-Driven Designers</h1>
          <h3>Where awesome domain driven designers are made</h3>
          <Link to={"/submit"}>submit</Link>
        </div>
        {location.pathname !== "/join" ? (
          <div id="header-action-button">
            {vm?.isAuthenticated ? (
              <div>
                <div className={toClass(appSelectors.header.selector)}>
                  {vm.username}
                </div>
                <u>
                  <div onClick={navLoginPresenter.signOut}>Logout</div>
                </u>
              </div>
            ) : (
              <Link to="/join">Join</Link>
            )}
          </div>
        ) : (
          ""
        )}
      </header>
      <Content>
        {children}
      </Content>
      <OverlaySpinner isActive={false}/>
    </>
  )  
});