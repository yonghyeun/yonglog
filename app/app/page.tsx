import CategoryList from '@/components/Category';
import SideBar from '@/components/Sidebar';
import Introduce from '@/components/Introduce';
import Pagination from '@/components/Pagination';
import { PostList } from '@/components/PostList';
import { getAllPosts } from './lib/post';

import type { SearchParams } from '@/types/global.d.ts';

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  // searchParms.page가 없을 땐 page 를 1로 고정
  if (!searchParams['page']) {
    searchParams.page = '1';
  }

  const allPosts = getAllPosts();
  return (
    <section className='mx-0 sm:mx-auto w-full lg:w-1/2'>
      <div className='hidden md:block'>
        <Introduce />
      </div>
      <CategoryList searchParams={searchParams} />
      {/* 게시글 리스트와 SideBar를 위치시키기 위함 */}
      <section className='w-full lg:w-[120%] flex gap-5'>
        {/* TODO page 생성 후 border 지우기 */}
        <section className=' bg-black-200 w-full lg:w-8/12 px-4'>
          <PostList postList={allPosts} />
          <Pagination searchParams={searchParams} />
        </section>
        <div className='hidden lg:block lg:flex-2 sticky top-0 w-4/12'>
          <SideBar searchParams={searchParams} />
        </div>
      </section>
    </section>
  );
};

export default Page;
