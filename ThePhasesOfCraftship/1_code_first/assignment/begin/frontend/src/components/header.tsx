import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { useUser } from '../contexts/usersContext';
import logo from '../icons/logo.png';

const Logo = () => (
  <div className='mr-10 flex flex-col items-center max-w-20'>
    <img src={logo} className='' />
  </div>
);

const TitleAndSubmission = () => (
  <div className='pr-6 flex flex-col'>
    <h1 className='text-3xl font-bold'>Domain-Driver Designers</h1>
    <b className='font-semibold text-lg'>
      Where awesome domain driven designers are made
    </b>
    <Link to='/submit' className='underline text-purple-600'>
      submit
    </Link>
  </div>
);

const HeaderActionButton = ({ user }: { user: User | null }) => (
  <div>
    {user ? (
      <div>
        <div>{user.username}</div>
        <u>
          <div>logout</div>
        </u>
      </div>
    ) : (
      <Link to='/join' className='text-white bg-black min-w-20 p-2 text-right'>
        Join
      </Link>
    )}
  </div>
);

const shouldShowActionButton = (pathName: string): boolean => {
  return pathName !== '/join';
};

export const Header = ({ pathName }: { pathName: string }) => {
  const { user } = useUser();

  return (
    <header className='justify-between flex items-center py-6'>
      <div className='flex align-center justify-around'>
        <Logo />
        <TitleAndSubmission />
      </div>
      {shouldShowActionButton(pathName) && <HeaderActionButton user={user} />}
    </header>
  );
};
