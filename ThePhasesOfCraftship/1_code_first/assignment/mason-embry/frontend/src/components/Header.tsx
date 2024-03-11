import { Link } from 'react-router-dom';

import bricks from '../assets/bricks.png';
import { UserWidget } from './UserWidget.tsx';

const Header = () => {
  return (
    <header
      className={
        'tw-container tw-mx-auto tw-p-4 tw-pt-6 tw-flex tw-justify-center tw-items-center tw-gap-8'
      }
    >
      <img src={bricks} alt={'Red bricks'} className={'tw-h-16'} />

      <div className={'tw-text-center'}>
        <Link to={'/'}>
          <h1 className={'tw-text-5xl tw-font-medium'}>
            Domain-Driven Designers
          </h1>
        </Link>
        <div className={'tw-text-lg tw-font-medium'}>
          Where awesome Domain-Driven Designers are made
        </div>
        <Link
          to={'/submit'}
          className={
            'tw-underline tw-text-blue-600 hover:tw-text-blue-800 visited:tw-text-purple-600 tw-text-sm'
          }
        >
          submit
        </Link>
      </div>

      <UserWidget />
    </header>
  );
};

export { Header };
