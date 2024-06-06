import ActiveLink from './client/ActiveLink';

import { getAllSeries } from '@/app/lib/identifer';

const sideBarClasses = {
  default: 'font-normal',
  active: 'text-indigo-500 font-semibold',
};

const SideBar = () => {
  const serieseList = getAllSeries();
  return (
    <section className='sticky flex-2 top-[5rem] right-0'>
      <h2 className='text-gray-900 font-bold text-xl mb-2'>시리즈</h2>
      <ul>
        {serieseList.map(([seriesName, count], id) => (
          <ActiveLink
            newParams={{ series: seriesName }}
            classNames={sideBarClasses}
            key={id}
            toFirstPage
          >
            {`${seriesName} (${count})`}
          </ActiveLink>
        ))}
      </ul>
    </section>
  );
};

export default SideBar;