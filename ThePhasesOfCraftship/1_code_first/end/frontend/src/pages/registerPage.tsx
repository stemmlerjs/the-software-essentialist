import React from "react";
import { Layout } from "../components/layout";
import {
  RegistrationForm,
  RegistrationInput,
} from "../components/registrationForm";

export const RegisterPage = () => {

  const handleSubmitRegistrationForm = (input: RegistrationInput) => {
    // Validate the form
    
    // If the form is invalid
      // Show an error toast (for invalid input)

    // If the form is valid, start isLoading
    // Make the API call

      // If the API call is successful
        // Save the user details to the cache
        // Stop the spinner
        // Show the toast
        // In 3 seconds, redirect to the main page

    // If the call failed
      // Stop the spinner
      // Show the toast (for unknown error)
  };

  return (
    <Layout>
      <div>Create Account</div>
      <RegistrationForm
        onSubmit={(input: RegistrationInput) =>
          handleSubmitRegistrationForm(input)
        }
      />
    </Layout>
  );
};
