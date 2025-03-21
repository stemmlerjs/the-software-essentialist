import logo from "../../shared/assets/dddforumlogo.png";
import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { appSelectors, toClass } from "../../shared/selectors";
import { useEffect, useState } from "react";
import { UserLoginLayoutViewModel } from "./userLoginLayoutVm";
import { usePresenters } from "../presenters/presentersContext";
import { OverlaySpinner } from "../spinner/overlaySpinner";

export const Content = ({ children }: any) => (
  <div className="content-container">{children}</div>
);

// All components which use observables must use 'observer'
export const Layout = observer(({ children }: any) => {
  const { layout } = usePresenters();
  const location = useLocation();
  const [vm, setVmToLocalState] = useState<UserLoginLayoutViewModel>();

  useEffect(() => {
    layout.load((userLoginVm) => {
      setVmToLocalState(userLoginVm);
    });
  }, [layout.userLoginVm]); // We observe the view model in the presenter

  return (
    <>
      <header
        id="header"
        className="flex align-center"
        style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
      >
        <div id="app-logo">
          <img src={logo}></img>
        </div>
        <div id="title-container">
          <h1>Domain-Driven Designers</h1>
          <h3>Where awesome domain driven designers are made</h3>
          <Link to={"/submit"}>submit</Link>
        </div>
        {location.pathname !== "/join" && (
          <div id="header-action-button">
            {vm?.isAuthenticated ? (
              <div
                className="username-logout-container"
                style={{
                  color: "white",
                  background: "black",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                {vm.username && (
                  <div className={toClass(appSelectors.header.selector)}>
                    {`${vm.username} / `}
                  </div>
                )}
                <u>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => layout.signOut()}
                  >
                    Logout
                  </div>
                </u>
              </div>
            ) : (
              <Link to="/join">Join</Link>
            )}
          </div>
        )}
      </header>
      <Content>{children}</Content>
      <OverlaySpinner isActive={false} />
    </>
  );
});
