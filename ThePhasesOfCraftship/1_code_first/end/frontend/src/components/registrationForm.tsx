import React from "react";
import { Link } from "react-router-dom";

export const RegistrationForm = () => (
  <div>
    <input
      className="registration email"
      type="email"
      placeholder="email"
    ></input>
    <input
      className="registatation-input username"
      type="text"
      placeholder="username"
    ></input>
    <input
      className="registration-input password"
      type="password"
      placeholder="password"
    ></input>
    <div>
      <div className="to-login">
        <div>Already have an account?</div>
        <Link to="/login">Login</Link>
      </div>
      <button className="submit-button" type="submit">
        Submit
      </button>
    </div>
  </div>
);
