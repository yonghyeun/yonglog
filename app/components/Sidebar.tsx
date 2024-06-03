// TODO MDX 의 시리즈 이름 가져와서 하기
import { getAllSeries } from '@/app/lib/identifer';

// TODO 라우팅 기능 넣기
// TODO 경로에 따라 활성 비활성화 상태 넣기
const Seriese = ({ title }: { title: string }) => (
  <li className='mb-2'>{title}</li>
);

const SideBar = () => {
  const serieseList = getAllSeries();
  return (
    <section className='sticky flex-2 top-[5rem] right-0'>
      <h2 className='text-gray-900 font-bold text-xl mb-2'>시리즈</h2>
      <ul>
        {serieseList.map(([seriesName, count], id) => (
          <Seriese title={`${seriesName} (${count})`} key={id} />
        ))}
      </ul>
    </section>
  );
};

export default SideBar;
