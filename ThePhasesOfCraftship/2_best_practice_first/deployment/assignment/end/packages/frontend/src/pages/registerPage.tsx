
import { Layout } from "../components/layout";
import {
  RegistrationForm,
} from "../components/registrationForm";
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../contexts/spinnerContext";
import { OverlaySpinner } from "../components/overlaySpinner";
import { CreateUserParams } from "@dddforum/shared/src/api/users";
import { api } from "../App";

type ValidationResult = {
  success: boolean;
  errorMessage?: string;
}

function validateForm (input: CreateUserParams): ValidationResult {
  if (input.email.indexOf('@') === -1) return { success: false, errorMessage: "Email invalid" };
  if (input.username.length < 2) return { success: false, errorMessage: "Username invalid" };
  return { success: true }
}

export const RegisterPage = () => {
  const { setUser } = useUser();
  const navigate = useNavigate()
  const spinner = useSpinner();

  const handleSubmitRegistrationForm = async (input: CreateUserParams, addToList: boolean) => {
    // Validate the form
    const validationResult = validateForm(input);

    // If the form is invalid
    if (!validationResult.success) {
      // Show an error toast (for invalid input)
      return toast.error(validationResult.errorMessage, {
        toastId: `failure-toast`
      });
    }

    spinner.activate();

    try {
      const response = await api.users.register(input);
      
      if (!response.success) {
        switch (response.error.code) {
          case "UsernameAlreadyTaken":
            spinner.deactivate();
            return toast.error('Account already exists', { toastId: `failure-toast` });
          case "EmailAlreadyInUse":
            spinner.deactivate();
            return toast.error('Email already in use', { toastId: `failure-toast` });
          default:
            // Client processing error
            throw new Error('Unknown error: ' + response.error.code)
        }
      }
      
      if (addToList) {
        await api.marketing.addEmailToList(input.email);
      }

      // Save the user details to the cache
      setUser(response.data as any);
      // Stop the loading spinner
      spinner.deactivate();
      // Show the toast
      toast('Success! Redirecting home.', {
        toastId: `success-toast`
      })
      // In 3 seconds, redirect to the main page
      setTimeout(() => { navigate('/') }, 3000)
    } catch (err) {
      // If the call failed
      // Stop the spinner
      spinner.deactivate();
      // Show the toast (for unknown error)
      return toast.error('Some backend error occurred', {
        toastId: `failure-toast`
      });
    }

  };

  return (
    <Layout>
      <ToastContainer/>
      <div>Create Account</div>
      <RegistrationForm
        onSubmit={(input: CreateUserParams, allowMarketingEmails: boolean) =>
          handleSubmitRegistrationForm(input, allowMarketingEmails)
        }
      />
      <OverlaySpinner isActive={spinner.spinner?.isActive}/>
    </Layout>
  );
};
