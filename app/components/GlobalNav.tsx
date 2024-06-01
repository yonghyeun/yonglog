import { FaSearch, FiMoon, FiSun, FaGithub } from './Icons';

// TODO Search , Theme , Github 컴포넌트 생성하기
const GlobalNav = () => {
  return (
    <nav className='fixed top-0 left-0 right-0  lg: py-3 bg-gray-900'>
      <ul className='flex justify-between items-center shadow-md mx-0 sm:mx-auto w-full sm:w-3/4 lg:w-1/2'>
        <li>
          <h1 className='text-2xl font-bold flex items-start'>yonglog</h1>
        </li>
        <ul className='flex gap-4 items-center'>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            <FaSearch size={20} />
          </li>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            <FiMoon size={20} />
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
