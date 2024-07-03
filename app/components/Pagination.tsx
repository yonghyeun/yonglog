import ActiveLink from './client/ActiveLink';

import { getPageList } from '@/app/lib/pagination';
import { PostInfo } from '@/types/post';

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

const Pagination = async ({
  posts,
  page,
}: {
  posts: PostInfo[];
  page?: string;
}) => {
  const currentPage = Number(page || '1');
  const { avaliablePage, totalPages } = getPageList(currentPage, posts);

  return (
    <nav className='flex justify-center' aria-label='page navigation'>
      <ul className='list-style-none flex'>
        {currentPage > 1 && (
          <>
            <li>
              <ActiveLink
                newParams={{ page: '1' }}
                classNames={paginationClasses.leftDouble}
                replace={false}
                aria-label='Go to first Page'
              >
                <span className='visually-hidden'>Go to page 1</span>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                newParams={{ page: String(currentPage - 1) }}
                classNames={paginationClasses.left}
                replace={false}
                aria-label='Go to previous Page'
              >
                <span className='visually-hidden'>Go to previous Page</span>
              </ActiveLink>
            </li>
          </>
        )}
        {avaliablePage.map((page, id) => (
          <li key={id}>
            <ActiveLink
              newParams={{ page: String(page) }}
              classNames={paginationClasses.indigator}
              replace={false}
              aria-label='Go to current Page'
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
                replace={false}
                aria-label='Go to Next Page'
              >
                <span className='visually-hidden'>Go to Next Page</span>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                newParams={{ page: String(totalPages) }}
                classNames={paginationClasses.rightDouble}
                replace={false}
                aria-label='Go to Last Page'
              >
                <span className='visually-hidden'>Go to Last Page</span>
              </ActiveLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
