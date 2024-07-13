'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch } from '@/components/Icons';

const SearchZone = () => {
  const [isSerach, setIsSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const handleClick = () => {
    setIsSearch(!isSerach);
  };

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const translateX = isSerach ? '0' : '180';

  return (
    <div className='w-[200px] h-[40px] overflow-hidden'>
      <div
        className={`flex transition-transform`}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <FaSearch
          className='my-[10px] mr-[10px] text-base hover:text-blue-500 cursor-pointer font-semibold'
          size={20}
          onClick={handleClick}
        />
        <div className='flex w-[170px] font-semibold'>
          <input
            className='w-[100px] px-2 bg-transparent border-b-[2px] focus:outline-none'
            type='text'
            onChange={handleText}
          />
          <Link
            className='flex items-center justify-center ml-[5px]  px-2  border-none bg-indigo-800 rounded-2xl hover:bg-indigo-500'
            href={searchText ? `/search?text=${searchText}` : '#'}
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchZone;
