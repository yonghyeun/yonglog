import Introduce from '@/components/Introduce';
import CategoryList from '@/components/Category';
import SideBar from '@/components/Sidebar';

const Page = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className='mx-0 sm:mx-auto w-full  lg:w-1/2'>
      <div className='hidden md:block'>
        <Introduce />
      </div>
      <CategoryList />
      {/* 게시글 리스트와 SideBar를 위치시키기 위함 */}
      <section className='w-full lg:w-[120%] flex gap-5 h-[150vh]'>
        {/* TODO page 생성 후 border 지우기 */}
        <section className='border bg-white w-full lg :w-8/12'>
          {children}
        </section>
        <div className='hidden lg:block lg:flex-2 sticky top-0 w-4/12'>
          <SideBar />
        </div>
      </section>
    </section>
  );
};

export default Page;
