import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { RegisterDTO, RegisterForm } from '../components/RegisterForm.tsx';
import { api } from '../iDontKnowWhereToPutThis/api.ts';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (registerDTO: RegisterDTO) => {
    // Frontend validation is handled by the RegisterForm component

    await toast.promise(
      api.createUser(registerDTO),
      {
        pending: 'Registering user 🤞',
        success: 'User registered successfully 🎉 Redirecting... 🚀',
        error: 'Error registering user 🤯',
      },
      {
        hideProgressBar: true,
      },
    );

    setTimeout(() => {
      toast.dismiss();
      navigate('/');
    }, 2000);
  };

  return (
    <div className={'tw-container tw-mx-auto tw-p-4 tw-max-w-screen-md'}>
      <h2 className={'tw-text-xl'}>Create account</h2>

      <RegisterForm onSubmit={handleSubmit} />

      <h2 className={'tw-mt-4'}>Already have an account?</h2>
      <Link
        to={'/login'}
        className={
          'tw-underline tw-text-blue-600 hover:tw-text-blue-800 visited:tw-text-purple-600'
        }
      >
        Login
      </Link>
    </div>
  );
};

export { RegisterPage };
