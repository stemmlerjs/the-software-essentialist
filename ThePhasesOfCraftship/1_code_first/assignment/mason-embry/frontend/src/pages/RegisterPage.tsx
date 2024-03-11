import * as Form from '@radix-ui/react-form';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className={'tw-container tw-mx-auto tw-p-4 tw-max-w-screen-md'}>
      <h2 className={'tw-text-xl'}>Create account</h2>

      <Form.Root className={'tw-mt-4'}>
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

        <Form.Field className="tw-grid" name="username">
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

        <Form.Field className="tw-grid" name="firstname">
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

        <Form.Field className="tw-grid" name="lastname">
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
