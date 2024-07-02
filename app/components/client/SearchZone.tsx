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

  const translateX = isSerach ? '280' : '0';
  console.log(translateX);

  return (
    <div className='w-[300px] h-[40px] overflow-hidden'>
      <div
        className={`flex transition-transform`}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <FaSearch
          className='my-[10px] mr-[10px] text-base hover:text-blue-500 cursor-pointer font-semibold'
          size={20}
          onClick={handleClick}
        />
        <div className='flex w-[270px] font-semibold'>
          <input
            className='w-[200px] px-2 bg-transparent border-b-[2px] focus:outline-none'
            type='text'
            onChange={handleText}
            placeholder='검색어를 입력해주세요 :)'
          />
          <Link
            className='flex items-center justify-center ml-[5px]  w-[60px]  border-none bg-indigo-800 rounded-2xl hover:bg-indigo-500'
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
