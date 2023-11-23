import React from "react";
import logo from '../assets/dddforumlogo.png'
import { Link, useLocation, useRoutes } from "react-router-dom";

const Logo = () => (
  <div id="app-logo">
    <img src={logo}></img>
  </div>
);
const TitleAndSubmission = () => (
  <div id="title-container">
    <h1>Domain-Driven Designers</h1>
    <h3>Where awesome domain driven designers are made</h3>
    <Link to={"/submit"}>submit</Link>
  </div>
);

const HeaderActionButton = () => (
  <div id="header-action-button">
    <Link to="/join">Join</Link>
  </div>
);

const shouldShowActionButton = (pathName: string) => {
  return pathName !== '/join';
}

export const Header = ({ }) => {
  const location = useLocation();
  
  
  return (
    <header id="header" className="flex align-center">
      <Logo/>
      <TitleAndSubmission/>
      {shouldShowActionButton(location.pathname) ? <HeaderActionButton/> : ''}
    </header>
  );
  
}