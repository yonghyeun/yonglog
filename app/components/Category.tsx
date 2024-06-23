import ActiveLink from './client/ActiveLink';

import { getAllTags } from '@/app/lib/identifer';

const CategoryClassNames = {
  default:
    'border border-gray-300 rounded-l-3xl rounded-r-3xl text-center px-4 py-2 focus:outline-none font-light text-sm',
  active:
    'bg-indigo-800 text-white  rounded-l-3xl rounded-r-3xl text-center px-4 py-2 focus:outline-none  mb-2 text-sm ',
};

const CategoryList = async () => {
  const tagList = await getAllTags();
  return (
    <section className=' px-4 sm:px-8 md:px-16 lg:px-32 mt-24 sm:mt-24 md:mt-24 lg:mt-24 mb-12 sm:mb-12 md:mb-6 lg:mb-24'>
      <ul className='flex flex-wrap gap-2.5'>
        {tagList.map(([tagName, _], id) => {
          const newParams = {
            tag: tagName,
          };
          return (
            <li className='mt-2' key={id}>
              <ActiveLink
                newParams={newParams}
                classNames={CategoryClassNames}
                toFirstPage
              >
                {tagName}
              </ActiveLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CategoryList;
