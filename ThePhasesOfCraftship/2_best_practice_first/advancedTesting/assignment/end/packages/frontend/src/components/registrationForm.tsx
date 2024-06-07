import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateUserCommand } from '@dddforum/shared/src/api/users'

interface RegistrationFormProps {
  onSubmit: (formDetails: CreateUserCommand, allowMarketingEmails: boolean) => void;
}

export const RegistrationForm = (props: RegistrationFormProps) => {
  const [email, setEmail] = useState("email");
  const [username, setUsername] = useState("username");
  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");
  const [allowMarketingEmails, setAllowMarketingEmails] = useState(false);

  const toggleAllowMarketingEmails = () => {
    setAllowMarketingEmails(!allowMarketingEmails);
  };

  const handleSubmit = () => {
    props.onSubmit({
      email,
      username,
      firstName,
      lastName,
    }, allowMarketingEmails);
  };

  return (
    <div>
      <input
        className="registration email"
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="registration username"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        className="registration first-name"
        type="text"
        placeholder="first name"
        onChange={(e) => setFirstName(e.target.value)}
      ></input>
      <input
        className="registration last-name"
        type="text"
        placeholder="last name"
        onChange={(e) => setLastName(e.target.value)}
      ></input>
      <br/>
      <br/>
      <div>
        <button
          onClick={() => handleSubmit()}
          className="registration submit-button"
          type="submit"
        >
          Submit
        </button>
        <label>
          <input
            className="registration marketing-emails"
            type="checkbox"
            checked={allowMarketingEmails}
            onChange={() => toggleAllowMarketingEmails()}
          />
          Want to be notified about events & discounts?
        </label>
      </div>
      <br />
      <div className="to-login">
        <div>Already have an account?</div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
