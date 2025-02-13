
import { ToastContainer } from 'react-toastify';
import { CreateUserParams } from "@dddforum/shared/src/api/users";
import { useSpinner } from '../shared/contexts/spinnerContext';
import { Layout } from '../shared/components/layout';
import { RegistrationForm } from '../shared/components/registrationForm';
import { OverlaySpinner } from '../shared/components/overlaySpinner';
import { registrationPresenter } from '../main';


export const RegisterPage = () => {

  const spinner = useSpinner();

  return (
    <Layout>
      <ToastContainer/>
      <div>Create Account</div>
      <RegistrationForm
        onSubmit={(input: CreateUserParams, allowMarketingEmails: boolean) =>
          registrationPresenter.submitForm(input, allowMarketingEmails, {
            onStart: () => spinner.activate(),
            onSuccess: () => spinner.deactivate(),
            onFailure: () => spinner.deactivate()
          })
        }
      />
      <OverlaySpinner isActive={spinner.spinner?.isActive}/>
    </Layout>
  );
};
