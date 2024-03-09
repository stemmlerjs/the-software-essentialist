import { Link } from 'react-router-dom';
import { RegistrationInput } from '../types/RegistrationInput';
import { toast } from 'react-toast';
import { useState } from 'react';

type RegistrationFormProps = {
  onSubmit: (formData: RegistrationInput) => void;
};

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationInput>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  });

  const updateFormData = (
    field: keyof typeof formData,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const isFormValid = validateForm(formData);

        if (!isFormValid.success) {
          return toast(isFormValid.errorMessage, {
            backgroundColor: 'red',
          });
        }

        onSubmit(formData);
      }}
      className='flex flex-col space-y-2 pt-2'
    >
      <input
        value={formData.email}
        onChange={(e) => updateFormData('email', e)}
        type='email'
        placeholder='email'
        className='border-2 rounded-md py-2 pl-2.5 border-gray-800'
      />
      <input
        value={formData.username}
        onChange={(e) => updateFormData('username', e)}
        placeholder='username'
        className='border-2 rounded-md py-2 pl-2.5 border-gray-800'
      />
      <input
        value={formData.firstName}
        onChange={(e) => updateFormData('firstName', e)}
        placeholder='first name'
        className='border-2 rounded-md py-2 pl-2.5 border-gray-800'
      />
      <input
        value={formData.lastName}
        onChange={(e) => updateFormData('lastName', e)}
        placeholder='last name'
        className='border-2 rounded-md py-2 pl-2.5 border-gray-800'
      />

      <div className='py-1'>
        <div className=''>
          <p className='font-semibold'>Already have an account?</p>
          <Link to='/login' className='text-purple-600'>
            Login
          </Link>
        </div>

        <button
          type='submit'
          className='bg-gray-200 py-2 px-4 rounded-md mt-2.5'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

type ValidationResult =
  | {
      success: true;
    }
  | {
      success: false;
      errorMessage: string;
    };

function validateForm(input: RegistrationInput): ValidationResult {
  if (!input.email.includes('@'))
    return { success: false, errorMessage: 'Invalid email' };
  if (input.username.length < 2)
    return { success: false, errorMessage: 'Invalid username' };

  return { success: true };
}
