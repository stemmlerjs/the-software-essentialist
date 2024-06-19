import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateUserParams } from '@dddforum/shared/src/api/users'
import { appSelectors, toClass } from "../shared/selectors";

interface RegistrationFormProps {
  onSubmit: (formDetails: CreateUserParams, allowMarketingEmails: boolean) => void;
}

export const RegistrationForm = (props: RegistrationFormProps) => {

  const selectors = appSelectors.registration.registrationForm;

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
        className={toClass(selectors.email.selector)}
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className={toClass(selectors.username.selector)}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        className={toClass(selectors.firstname.selector)}
        type="text"
        placeholder="first name"
        onChange={(e) => setFirstName(e.target.value)}
      ></input>
      <input
        className={toClass(selectors.lastname.selector)}
        type="text"
        placeholder="last name"
        onChange={(e) => setLastName(e.target.value)}
      ></input>
      <br/>
      <br/>
      <div>
        <button
          onClick={() => handleSubmit()}
          className={toClass(selectors.submit.selector)}
          type="submit"
        >
          Submit
        </button>
        <label>
          <input
            className={toClass(selectors.marketingCheckbox.selector)}
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
