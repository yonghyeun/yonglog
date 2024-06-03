import CategoryList from '@/components/Category';
import SideBar from '@/components/Sidebar';
import Introduce from '@/components/Introduce';
import Pagination from '@/components/Pagination';
import { PostList } from '@/components/PostList';
import { getAllPosts } from './lib/post';

const Page = async () => {
  const allPosts = getAllPosts();
  return (
    <section className='mx-0 sm:mx-auto w-full lg:w-1/2'>
      <div className='hidden md:block'>
        <Introduce />
      </div>
      <CategoryList />
      {/* 게시글 리스트와 SideBar를 위치시키기 위함 */}
      <section className='w-full lg:w-[120%] flex gap-5'>
        {/* TODO page 생성 후 border 지우기 */}
        <section className=' bg-black-200 w-full lg:w-8/12 px-4'>
          <PostList postList={allPosts} />
          <Pagination />
        </section>
        <div className='hidden lg:block lg:flex-2 sticky top-0 w-4/12'>
          <SideBar />
        </div>
      </section>
    </section>
  );
};

export default Page;
