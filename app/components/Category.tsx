import Link from 'next/link';

import { getAllTags } from '@/app/lib/identifer';
import { getNewSearchParms } from '@/app/lib/route';
import type { SearchParams } from '@/types/global';
// TODO Route 하는 Link 컴포넌트로 구성하기
// TODO Active 한 상태에 따라 뭐 어쩌구 저쩌구 하기
const Category = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link
      href={href}
      className='border border-gray-300 rounded-l-3xl rounded-r-3xl text-center px-4 py-2 focus:outline-none font-light text-sm'
    >
      {name}
    </Link>
  );
};
const tagList = getAllTags();

// TODO 태그 별 라우팅 하는 로직 추가하기
const CategoryList = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <section className=' px-4 sm:px-8 md:px-16 lg:px-32 mt-24 sm:mt-24 md:mt-24 lg:mt-24 mb-12 sm:mb-12 md:mb-6 lg:mb-24'>
      <ul className='flex flex-wrap gap-2.5'>
        {tagList.map(([tagName, _], id) => {
          const href = getNewSearchParms(searchParams, { tag: tagName });
          return (
            <li key={id}>
              <Category name={tagName} href={href} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CategoryList;
