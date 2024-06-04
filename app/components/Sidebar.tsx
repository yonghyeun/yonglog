import Link from 'next/link';

import { getAllSeries } from '@/app/lib/identifer';
import { getNewSearchParms } from '@/app/lib/route';

import type { SearchParams } from '@/types/global';

// TODO 라우팅 기능 넣기
// TODO 경로에 따라 활성 비활성화 상태 넣기
const Seriese = ({
  title,
  searchParams,
}: {
  title: string;
  searchParams: SearchParams;
}) => (
  <li className='mb-2'>
    <Link href={getNewSearchParms(searchParams, { series: title })}>
      {title}
    </Link>
  </li>
);

const SideBar = ({ searchParams }: { searchParams: SearchParams }) => {
  const serieseList = getAllSeries();
  return (
    <section className='sticky flex-2 top-[5rem] right-0'>
      <h2 className='text-gray-900 font-bold text-xl mb-2'>시리즈</h2>
      <ul>
        {serieseList.map(([seriesName, count], id) => (
          <Seriese
            title={`${seriesName} (${count})`}
            searchParams={searchParams}
            key={id}
          />
        ))}
      </ul>
    </section>
  );
};

export default SideBar;
