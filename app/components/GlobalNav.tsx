import Link from 'next/link';
import ThemeButton from './client/ThemeButton';
import { FaGithub } from './Icons';
import SearchZone from './client/SearchZone';

const GlobalNav = () => {
  return (
    <nav
      id='GNB'
      className='fixed z-[999] top-0 left-0 right-0  lg: py-3 bg-indigo-950 text-white'
    >
      <ul className='flex justify-between items-center shadow-md mx-0 sm:mx-auto w-full sm:w-3/4 lg:w-1/2'>
        <li>
          <h1 className='text-2xl font-bold flex items-start '>
            <Link href='/'>abonglog</Link>
          </h1>
        </li>
        <ul className='flex gap-4 items-center'>
          <li>
            <SearchZone />
          </li>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            <ThemeButton />
          </li>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            <FaGithub size={20} />
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default GlobalNav;
