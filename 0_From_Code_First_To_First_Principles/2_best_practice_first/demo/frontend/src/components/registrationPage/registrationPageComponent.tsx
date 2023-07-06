import React, { useState } from "react";
import axios from "axios";
import { RegistrationForm } from "../../models/registrationForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export interface RegistrationFormProps {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

const RegistrationPageComponent = () => {
  const navigate = useNavigate();
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
    let registrationFormOrError = RegistrationForm.create(
      registrationFormProps
    );

    if (registrationFormOrError instanceof Error) {
      // If the form is invalid, then we have to throw a failure toast
      return;
    }

    // Make the request
    try {
      await axios({
        method: "POST",
        url: "http://localhost:3000/users/new",
        data: registrationFormOrError.toCreateUserDTO(),
      });

      toast.success("Created! Good stuff.", {
        toastId: "success-toast",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error("Ahh, something went wrong", {
        toastId: "error-toast",
      });
      console.log(err);
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
      <button
        onClick={() => submitForm(formState)}
        className="submit registration"
      >
        Submit
      </button>
    </div>
  );
};

export default RegistrationPageComponent;
