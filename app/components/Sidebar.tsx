import postProvider from '@/lib/postProvider';
import ActiveLink from './client/ActiveLink';

const sideBarClasses = {
  default: 'font-normal',
  active: 'text-indigo-500 font-semibold',
};

const SideBar = async () => {
  const serieseList = await postProvider.getAllSeresList();
  return (
    <section className='sticky flex-2 top-[5rem] right-0'>
      <h2 className='font-bold text-xl mb-2' data-sidebar-title>
        시리즈
      </h2>
      <ul>
        {serieseList.map(([seriesName, count], id) => (
          <li key={id}>
            <ActiveLink
              newParams={{ series: seriesName }}
              classNames={sideBarClasses}
              toFirstPage
            >
              {`${seriesName} (${count})`}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SideBar;
