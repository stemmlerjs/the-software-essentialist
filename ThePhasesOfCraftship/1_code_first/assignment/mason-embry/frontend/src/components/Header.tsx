import { Link } from 'react-router-dom';

import bricks from '../assets/bricks.png';

const Header = () => (
  <header
    className={
      'tw-container tw-mx-auto tw-p-4 tw-pt-6 tw-flex tw-justify-center tw-items-center tw-gap-8'
    }
  >
    <img src={bricks} alt={'Red bricks'} className={'tw-h-16'} />

    <div className={'tw-text-center'}>
      <h1 className={'tw-text-5xl tw-font-medium'}>Domain-Driven Designers</h1>
      <div className={'tw-text-lg tw-font-medium'}>
        Where awesome Domain-Driven Designers are made
      </div>
    </div>

    <Link
      to={'/register'}
      className={
        'tw-bg-black tw-text-white tw-text-lg tw-font-medium tw-px-2 tw-py-1 tw-text-right tw-w-32 '
      }
    >
      Join
    </Link>
  </header>
);

export { Header };
