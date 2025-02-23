
import logo from "../../../shared/assets/dddforumlogo.png";
import { Link } from "react-router-dom";
import { navLoginPresenter } from "../../../main";
import { useEffect, useState } from "react";
import { observe } from "mobx";
import { UserLoginViewModel } from "../application/userLoginViewModel";
import { appSelectors, toClass } from "../../../shared/selectors";

export const Header = () => {
  const [vm, setLoginVm] = useState<UserLoginViewModel | null>(null);
  
  useEffect(() => {
    async function loadVm() {
      observe(navLoginPresenter, 'userLogin', (obj) => {
        setLoginVm(obj.newValue);
      });

      await navLoginPresenter.load();
    }
    loadVm();
  }, []);

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
      {vm?.pathname !== "/join" ? (
        <div id="header-action-button">
        {vm?.isAuthenticated ? (
          <div>
            <div className={toClass(appSelectors.header.selector)}>{vm.username}</div>
            <u>
              <div>logout</div>
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
};
