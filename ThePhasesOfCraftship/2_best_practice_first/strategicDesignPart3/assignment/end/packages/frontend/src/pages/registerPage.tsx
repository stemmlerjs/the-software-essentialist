
import { Layout } from "../components/layout";
import {
  RegistrationForm,
  RegistrationInput,
} from "../components/registrationForm";
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../contexts/spinnerContext";
import { OverlaySpinner } from "../components/overlaySpinner";
import { api } from "../api";


type ValidationResult = {
  success: boolean;
  errorMessage?: string;
}

function validateForm (input: RegistrationInput): ValidationResult {
  if (input.email.indexOf('@') === -1) return { success: false, errorMessage: "Email invalid" };
  if (input.username.length < 2) return { success: false, errorMessage: "Username invalid" };
  return { success: true }
}

export const RegisterPage = () => {
  const { setUser } = useUser();
  const navigate = useNavigate()
  const spinner = useSpinner();

  const handleSubmitRegistrationForm = async (input: RegistrationInput) => {
    // Validate the form
    const validationResult = validateForm(input);

    // If the form is invalid
    if (!validationResult.success) {
      // Show an error toast (for invalid input)
      return toast.error(validationResult.errorMessage);
    }

    // If the form is valid
    // Start loading spinner
    spinner.activate();
    try {
      // Make API call
      const response = await api.users.register(input);
      if (!response.success) {
        switch (response.error.code){
          case 'EmailAlreadyInUse':
            return toast.error('This email is already in use. Perhaps you want to log in?');
          case 'UsernameAlreadyTaken':
            return toast.error('Please try a different username, this one is already taken.');
          case 'ValidationError':
            // We could further improve this with more refined types to specify which 
            // form field was invalid.
            return toast.error(response.error.message);
          case "ServerError":
          default:
            return toast.error('Some backend error occurred');
        }
      }

      setUser(response.data);
      // Stop the loading spinner
      spinner.deactivate();
      // Show the toast
      toast('Success! Redirecting home.')
      // In 3 seconds, redirect to the main page
      setTimeout(() => { navigate('/') }, 3000)
    } catch (err) {
      // If the call failed
      // Stop the spinner
      spinner.deactivate();
      // Show the toast (for unknown error)
      return toast.error('Some backend error occurred');
    }
  };

  return (
    <Layout>
      <ToastContainer/>
      <RegistrationForm
        onSubmit={(input: RegistrationInput) =>
          handleSubmitRegistrationForm(input)
        }
      />
      <OverlaySpinner isActive={spinner.spinner?.isActive}/>
    </Layout>
  );
};
