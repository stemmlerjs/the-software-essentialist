import { Layout } from '../components/layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';
import { RegistrationInput } from '../types/RegistrationInput';
import { api } from '../api';
import { useUser } from '../contexts/usersContext';
import { RegistrationForm } from '../components/registrationForm';
import { apiErrorDisplayMap } from '../constants/apiErrorDisplayMap';

export const RegisterPage = () => {
  const { setUser } = useUser();
  const navigateTo = useNavigate();

  const testSubmitFormData = async (registrationInput: RegistrationInput) => {
    const response = await api.register(registrationInput);

    if (response.success) {
      setUser(response.data);
      toast('Success! Redirecting home.');
      setTimeout(() => navigateTo('/'), 3 * 1000);
    } else {
      toast(apiErrorDisplayMap[response.error], {
        backgroundColor: 'red',
      });
    }
  };

  return (
    <Layout>
      <div className='px-24'>
        <p className='text-lg font-semibold'>Create Account</p>

        <RegistrationForm
          onSubmit={(registrationInput) =>
            testSubmitFormData(registrationInput)
          }
        />
      </div>
    </Layout>
  );
};
