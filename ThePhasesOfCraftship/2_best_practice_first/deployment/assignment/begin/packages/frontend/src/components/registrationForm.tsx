import { useState } from "react";
import { Link } from "react-router-dom";

export type RegistrationInput = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface RegistrationFormProps {
  onSubmit: (formDetails: RegistrationInput) => void;
}

export const RegistrationForm = (props: RegistrationFormProps) => {
  const [email, setEmail] = useState('email');
  const [username, setUsername] = useState('username');
  const [firstName, setFirstName] = useState('firstName');
  const [lastName, setLastName] = useState('lastName');

  const handleSubmit = () => {
    props.onSubmit({
      email, username, firstName, lastName
    })
  }

  return (
    <div>
      <input
        className="registration email"
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="registatation-input username"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        className="registatation-input username"
        type="text"
        placeholder="first name"
        onChange={(e) => setFirstName(e.target.value)}
      ></input>
      <input
        className="registatation-input username"
        type="text"
        placeholder="last name"
        onChange={(e) => setLastName(e.target.value)}
      ></input>
      <div>
        <div className="to-login">
          <div>Already have an account?</div>
          <Link to="/login">Login</Link>
        </div>
        <button onClick={() => handleSubmit()} className="submit-button" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}
