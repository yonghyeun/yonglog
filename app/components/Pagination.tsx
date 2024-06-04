import { getPageList } from '@/app/lib/pagination';
import { getAllPosts } from '@/app/lib/post';
import { getNewSearchParms } from '@/app/lib/route';
import { SearchParams } from '@/types/global';
import Link from 'next/link';

const Pagination = ({ searchParams }: { searchParams: SearchParams }) => {
  const currentPage = Number(searchParams.page || '1');

  const totalPosts = getAllPosts();
  const { avaliablePage, totalPages } = getPageList(currentPage, totalPosts);

  return (
    <nav className='flex justify-center' aria-label='page navigation'>
      <ul className='list-style-none flex'>
        {currentPage > 1 && (
          <>
            <li>
              <Link
                href={getNewSearchParms(searchParams, { page: '1' })}
                className='bg-left-double-arrow mr-2'
              ></Link>
            </li>
            <li>
              <Link
                href={getNewSearchParms(searchParams, {
                  page: String(currentPage - 1),
                })}
                className='bg-left-double-arrow mr-2'
              ></Link>
            </li>
          </>
        )}
        {avaliablePage.map((page, id) => (
          <li key={id}>
            <a href='/' className='mr-4'>
              {page}
            </a>
          </li>
        ))}
        {currentPage < totalPages && (
          <>
            <li>
              <Link
                href={getNewSearchParms(searchParams, {
                  page: String(currentPage + 1),
                })}
                className='bg-right-arrow mr-2'
              ></Link>
            </li>
            <li>
              <Link
                href={getNewSearchParms(searchParams, {
                  page: String(totalPages),
                })}
                className='bg-right-double-arrow mr-2'
              ></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
