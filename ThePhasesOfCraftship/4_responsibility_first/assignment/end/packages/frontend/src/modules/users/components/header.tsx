
import logo from "../../../shared/assets/dddforumlogo.png";
import { Link, useLocation } from "react-router-dom";
import { appSelectors, toClass } from "../../../shared/selectors";
import { observer } from 'mobx-react-lite';
import { navLoginPresenter } from "../../../main";
import { useEffect, useState } from "react";
import { UserLoginViewModel } from "../application/userLoginViewModel";

export const Header = observer(() => {
  const [vm, setVm] = useState<UserLoginViewModel>();

  useEffect(() => {
    navLoginPresenter.load((userLoginVm) => {
      setVm(userLoginVm);
    })
    console.log('ran use effcect')
  }, [navLoginPresenter])

  console.log(vm?.isAuthenticated, vm?.username);
  const location = useLocation();

  return (
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
  );
});
