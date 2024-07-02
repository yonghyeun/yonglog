---
title: 'NextJS로 만든 기술블로그에서 검색 기능 구현하기'
description: 나중에 입력하자
thumb: public/posts/개발 블로그 개발 여정/21. 기술블로그 SEO 최적화 part2/image-1.png
tag:
  - react
  - nextjs
seriesHeader: "해당 포스트는 NextJS를 이용하여 개발 블로그를 만들며 작성한 포스트입니다.\r\n\r\n기술 블로그의 전체 코드는 [yonglog github](https://github.com/yonghyeun/yonglog) 에서 확인 하실 수 있습니다."
postId: 142770
date: Tue Jul 02 2024
time: 1719915261799
issueNumber: 293
---

# 검색 기능 구현하기 전 준비

이제 거의 마지막 기능 구현이 될 것 같다. :)

검색 기능을 구현하기 위해 이전 포스트에서 리팩토링을 거쳤다.

내가 생각 하는 플로우 차트는 다음과 같다.

![GNB에 존재하는 Search Icon](image.png)

해당 아이콘을 클릭하면 조그만 모달창이 뜨고 , 해당 모달 창에 검색어를 입력하면 `/search?text=입력한 검색어` 로 이동 되게 하는 것이다.

이후 `/search` 경로에 대한 페이지를 생성해주면 될 것 같다. :)

# 입력 창 UI 생성하기

```tsx title="@/components/client/SearchZone.tsx" {15,16, 12}
'use client';

import { useState } from 'react';
import { FaSearch } from '@/components/Icons';

const SearchZone = () => {
  const [isSerach, setIsSearch] = useState<boolean>(false);
  const handleClick = () => {
    setIsSearch(!isSerach);
  };

  const translateX = isSerach ? '280px' : '0px';

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
          />
          <button className='ml-[5px]  w-[60px]  border-none bg-indigo-800 rounded-2xl hover:bg-indigo-500'>
            search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchZone;
```

```tsx title="@/components/GlobalNav.tsx" {4,21}#add {20}#remove
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
            <FaSearch />
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
```

![클릭 유무에 따라 나타나는 검색창 필드](inputcomponent.gif)

이전엔 `GNB` 에서 `<FaSearch />` 아이콘만 존재하였지만 이젠 상태 값에 따라 입력 필드가 나타나는 `SearchZone` 컴포넌트로 수정해주었다.

입력 필드가 슝슝 나타나게 하는 것은 단순히 `overflow-hidden` 기능과 `transform - translate-x` 기능을 이용해서 구현해주었다.

처음에는 모달창으로 구현할까 했는데 개인적으로 페이지에서 모달창이 있으면 좀 답답한 느낌이 들어서 그냥 `translate` 로 슝슝 나타나게 해줬다.

# 라우팅 기능 추가하기

이제 입력창에 입력된 글자로 라우팅을 시켜주도록 하자

`search` 버튼을 누르면 `input` 필드에 입력된 입력값을 서치파라미터로 하는 `/search` 도메인으로 라우팅 시켜주도록 하자

> **왜 `/search` 경로를 추가로 생성했는가 ?**
>
> 많은 고민을 했었다. 원래는 기존 `/` 경로에서 입력되는 입력값에 따라 게시글들을 필터링 하는 로직을 구현 하려고 했었다.
>
> 그 방법을 선택하지 않은 이유는 다른 `searchParams` 들과 추가하고자 하는 `searchParam` 이 충돌하기 때문이였다.
>
> 해결하기 위한 다른 방법이 있을 거 같기도 했지만 가장 쉽게 해결 되는 방법을 선택했다. 블로그의 다양성도 늘릴 수 있기도 하고 말이다. :)

```tsx title="라우팅 기능이 추가된 SearchZone" {4, 9,15-17 , 33-34 , 36-41}#add
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

  const translateX = isSerach ? '280px' : '0px';

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
```

이후 `Search` 버튼을 `Link` 컴포넌트로 변경하여 라우팅을 가능하게 하고 `input` 필드에 적힌 `SearchText` 값을 이용해 라우팅을 하도록 했다.

`useRouter` 나 이것 저것을 써볼까 싶기도 했는데 그냥 `Link` 컴포넌트를 이용하는 것이 가장 직관적인 방법인 것 같았다.

조건부적으로 라우팅 기능을 어떻게 할까 ? 싶었는데 그냥 삼항 연산자로 라우팅 기능을 끄고 싶을 땐 `#` 로 가버리게 해버렸다.

# /search 경로에 대한 페이지 생성하기
