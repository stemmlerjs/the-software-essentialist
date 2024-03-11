import * as Form from '@radix-ui/react-form';
import { FormEvent } from 'react';

export interface RegisterDTO {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

const RegisterForm = ({
  onSubmit,
}: {
  onSubmit: (registerDTO: RegisterDTO) => void;
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    onSubmit(data as unknown as RegisterDTO);
  };

  return (
    <Form.Root className={'tw-mt-4'} onSubmit={handleSubmit}>
      <Form.Field className="tw-grid" name="email">
        <div>
          <Form.Label>Email</Form.Label>
          <Form.Message
            match="valueMissing"
            className={'tw-text-red-500 tw-text-sm tw-ml-2'}
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            match="typeMismatch"
            className={'tw-text-red-500 tw-text-sm tw-ml-2'}
          >
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={'tw-px-2 tw-py-1 tw-border tw-border-black'}
            type="email"
            required
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="tw-grid tw-mt-2" name="username">
        <div>
          <Form.Label>User name</Form.Label>
          <Form.Message
            match="valueMissing"
            className={'tw-text-red-500 tw-text-sm tw-ml-2'}
          >
            Please enter your username
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            required
            className={'tw-px-2 tw-py-1 tw-border tw-border-black'}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="tw-grid tw-mt-2" name="firstName">
        <div>
          <Form.Label>First name</Form.Label>
          <Form.Message
            match="valueMissing"
            className={'tw-text-red-500 tw-text-sm tw-ml-2'}
          >
            Please enter your first name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            required
            className={'tw-px-2 tw-py-1 tw-border tw-border-black'}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="tw-grid tw-mt-2" name="lastName">
        <div>
          <Form.Label>Last name</Form.Label>
          <Form.Message
            match="valueMissing"
            className={'tw-text-red-500 tw-text-sm tw-ml-2'}
          >
            Please enter your last name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            required
            className={'tw-px-2 tw-py-1 tw-border tw-border-black'}
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <button
          className={
            'tw-border tw-bg-black tw-font-medium tw-text-white tw-px-2 tw-py-1 tw-mt-4'
          }
        >
          Submit
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export { RegisterForm };
