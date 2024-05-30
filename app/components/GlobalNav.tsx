const GlobalNav = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 px-12 lg:px-16 py-3'>
      <ul className='flex justify-between items-center shadow-md mx-0 sm:mx-auto w-full sm:w-3/4 lg:w-1/2'>
        <li>
          <h1 className='text-xl font-bold'>yonglog</h1>
        </li>
        <ul className='flex gap-4'>
          <li className='text-base hover:text-blue-500 cursor-pointer'>1</li>
          <li className='text-base hover:text-blue-500 cursor-pointer'>2</li>
          <li className='text-base hover:text-blue-500 cursor-pointer'>3</li>
        </ul>
      </ul>
    </nav>
  );
};

export default GlobalNav;
