import CategoryList from '@/components/Category';
import SideBar from '@/components/Sidebar';
import Introduce from '@/components/Introduce';
import Pagination from '@/components/Pagination';
import { PostList } from '@/components/PostList';

import type { SearchParams } from '@/types/global.d.ts';

// TODO 추후 위치 바꾸기

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  /* 서버 컴포넌트의 props.searchParams 는 Object 객체이다.
  컴포넌트나 메소드 내에서 URLSearchParams 를 이용하기 때문에 복사본 생성
  */
  const _searchParams = new URLSearchParams(searchParams);

  return (
    <section className='mx-0 sm:mx-auto w-full lg:w-1/2'>
      <div className='hidden md:block'>
        <Introduce />
      </div>
      <CategoryList />
      <section className='w-full lg:w-[120%] flex gap-5'>
        <section className=' bg-black-200 w-full lg:w-8/12 px-4'>
          <PostList searchParams={_searchParams} />
          <Pagination searchParams={_searchParams} />
        </section>
        <div className='hidden lg:block lg:flex-2 sticky top-0 w-4/12'>
          <SideBar />
        </div>
      </section>
    </section>
  );
};

export default Page;
