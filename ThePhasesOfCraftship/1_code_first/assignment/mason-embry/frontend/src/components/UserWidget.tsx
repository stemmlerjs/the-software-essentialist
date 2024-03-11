import { Link } from 'react-router-dom';

import { useUser } from '../iDontKnowWhereToPutThis/UserContext.tsx';

const UserWidget = () => {
  const { user } = useUser();

  return user ? (
    <div>
      <div>{user.username}</div>
      <Link
        to={'/logout'}
        className={
          'tw-underline tw-text-blue-600 hover:tw-text-blue-800 visited:tw-text-purple-600 tw-text-sm'
        }
      >
        logout
      </Link>
    </div>
  ) : (
    <Link
      to={'/register'}
      className={
        'tw-bg-black tw-text-white tw-text-lg tw-font-medium tw-px-2 tw-py-1 tw-text-right tw-w-32 '
      }
    >
      Join
    </Link>
  );
};

export { UserWidget };
