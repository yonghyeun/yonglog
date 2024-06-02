import { getPageList } from '@/app/lib/pagination';
import { getAllPosts } from '@/app/lib/post';

const Pagination = () => {
  const currentPage = 8; // 추후에 props 로 받도록 수정 예정

  const totalPosts = getAllPosts();
  const { avaliablePage, totalPages } = getPageList(currentPage, totalPosts);

  return (
    <nav className='flex justify-center' aria-label='page navigation'>
      <ul className='list-style-none flex'>
        {currentPage > 1 && (
          <>
            <li>
              <a className='bg-left-double-arrow mr-2'></a>
            </li>
            <li>
              <a className='bg-left-arrow mr-4'></a>
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
              <a className='bg-right-arrow mr-2'></a>
            </li>
            <li>
              <a className='bg-right-double-arrow mr-4'></a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
