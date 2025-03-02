import logo from "../../../shared/assets/dddforumlogo.png";
import { Link, useLocation } from "react-router-dom";
import { appSelectors, toClass } from "../../../shared/selectors";
import { useAuthStore } from '../../../shared/auth/useAuthStore';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
  const { currentUser, isAuthenticated, signOut } = useAuthStore();
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
          {isAuthenticated ? (
            <div>
              <div className={toClass(appSelectors.header.selector)}>
                {currentUser?.username}
              </div>
              <u>
                <div onClick={signOut}>Logout</div>
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
