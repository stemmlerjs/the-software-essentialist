import React, { useState } from "react";
import axios from 'axios'
import { RegistrationForm } from "../../models/registrationForm";

export interface RegistrationFormProps {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

const RegistrationPageComponent = () => {
  const [formState, setFormState] = useState<RegistrationFormProps>({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
  });

  function onFormStateChanged(newState: string, field: string) {
    setFormState({
      ...formState,
      [field]: newState,
    });
  }

  async function submitForm(registrationFormProps: RegistrationFormProps) {
    // Validate the form
    let registrationFormOrError = RegistrationForm.create(registrationFormProps);

    if (registrationFormOrError instanceof Error) {
      // If the form is invalid, then we have to throw a failure toast
      return;
    }

    // Make the request
    try {
      let response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/users/new',
        data: registrationFormOrError.toCreateUserDTO()
      });

      // If it goes through successfully, then 
        // show a success toast
        // after 2 seconds, redirect to the main page

      console.log(response)

    } catch (err) {
      // If it fails, then show a failure toast
      console.log(err);
    }
      
  }

  return (
    <div>
      <h1>Registration Page</h1>
      <input
        onChange={(e) => onFormStateChanged(e.target.value, "email")}
        value={formState.email}
        className="email registration"
        type="email"
      />
      <input
        onChange={(e) => onFormStateChanged(e.target.value, "firstName")}
        value={formState.firstName}
        className="first-name registration"
        type="text"
      />
      <input
        onChange={(e) => onFormStateChanged(e.target.value, "lastName")}
        value={formState.lastName}
        className="last-name registration"
        type="text"
      />
      <input
        onChange={(e) => onFormStateChanged(e.target.value, "userName")}
        value={formState.userName}
        className="username registration"
        type="text"
      />
      <button onClick={() => submitForm(formState)} className="submit registration">
        Submit
      </button>
    </div>
  );
};

export default RegistrationPageComponent;
