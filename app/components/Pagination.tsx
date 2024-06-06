import ActiveLink from './client/ActiveLink';

import { getPageList } from '@/app/lib/pagination';
import { selectPosts } from '@/app/lib/post';

const paginationClasses = {
  indigator: {
    default: 'px-2 mr-2 font-normal  hover:bg-gray-200 rounded-md',
    active: 'px-2 mr-2 bg-indigo-500 text-white  rounded-md',
  },

  leftDouble: {
    default: 'bg-left-double-arrow mr-2',
    active: 'bg-left-double-arrow mr-2',
  },

  left: {
    default: 'bg-left-arrow mr-2',
    active: 'bg-left-arrow mr-2',
  },

  right: {
    default: 'bg-right-arrow mr-2',
    active: 'bg-right-arrow mr-2',
  },

  rightDouble: {
    default: 'bg-right-double-arrow mr-2',
    active: 'bg-right-double-arrow mr-2',
  },
};

const Pagination = ({ searchParams }: { searchParams: URLSearchParams }) => {
  const currentPage = Number(searchParams.get('page') || '1');

  const totalPosts = selectPosts(searchParams);
  const { avaliablePage, totalPages } = getPageList(currentPage, totalPosts);

  return (
    <nav className='flex justify-center' aria-label='page navigation'>
      <ul className='list-style-none flex'>
        {currentPage > 1 && (
          <>
            <li>
              <ActiveLink
                newParams={{ page: '1' }}
                classNames={paginationClasses.leftDouble}
              ></ActiveLink>
            </li>
            <li>
              <ActiveLink
                newParams={{ page: String(currentPage - 1) }}
                classNames={paginationClasses.left}
              ></ActiveLink>
            </li>
          </>
        )}
        {avaliablePage.map((page, id) => (
          <li key={id}>
            <ActiveLink
              newParams={{ page: String(page) }}
              classNames={paginationClasses.indigator}
            >
              {page}
            </ActiveLink>
          </li>
        ))}
        {currentPage < totalPages && (
          <>
            <li>
              <ActiveLink
                newParams={{ page: String(currentPage + 1) }}
                classNames={paginationClasses.right}
              ></ActiveLink>
            </li>
            <li>
              <ActiveLink
                newParams={{ page: String(totalPages) }}
                classNames={paginationClasses.rightDouble}
              ></ActiveLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
