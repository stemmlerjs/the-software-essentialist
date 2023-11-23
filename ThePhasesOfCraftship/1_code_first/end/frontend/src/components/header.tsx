import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <div>
    <img src="https://em-content.zobj.net/source/twitter/376/brick_1f9f1.png"></img>
  </div>
);
const TitleAndSubmission = () => (
  <div>
    <h1>Domain-Driven Designers</h1>
    <h3>Where awesome domain driven designers are made</h3>
    <Link to={"/submit"}>submit</Link>
  </div>
);

const Join = () => (
  <div>
    <Link to="/join">Join</Link>
  </div>
);

export const Header = ({ children }: any) => <header className="flex">{children}</header>;