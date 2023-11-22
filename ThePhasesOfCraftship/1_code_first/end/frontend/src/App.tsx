import { useState } from "react";
import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";

const Header = ({ children }: any) => <header>{children}</header>;
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header>
        <Logo />
        <TitleAndSubmission />
        <Join />
      </Header>
    </BrowserRouter>
  );
}

export default App;
