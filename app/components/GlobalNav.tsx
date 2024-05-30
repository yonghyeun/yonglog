// TODO Search , Theme , Github 컴포넌트 생성하기
const GlobalNav = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 px-12 lg:px-16 py-3 bg-gray-900'>
      <ul className='flex justify-between items-center shadow-md mx-0 sm:mx-auto w-full sm:w-3/4 lg:w-1/2'>
        <li>
          <h1 className='text-2xl font-bold'>yonglog</h1>
        </li>
        <ul className='flex gap-4'>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            Search
          </li>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            Theme
          </li>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            Github
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default GlobalNav;
