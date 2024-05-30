// TODO MDX 의 시리즈 이름 가져와서 하기
const serieseList = [
  '리액트 공식문서 톺아보기 (12)',
  'NextJS 공식문서 톺아보기 (14)',
  '상태관리 (15)',
  '자료구조 및 알고리즘 (16)',
  '네트워크 (24)',
  '운영체제 (10)',
];

// TODO 라우팅 기능 넣기
// TODO 경로에 따라 활성 비활성화 상태 넣기
const Seriese = ({ title }: { title: string }) => (
  <li className='mb-2'>{title}</li>
);

const SideBar = () => {
  return (
    <section className='sticky flex-2 top-[5rem] right-0'>
      <h2 className='text-indigo-200 font-bold text-xl mb-2'>시리즈</h2>
      <ul>
        {serieseList.map((title, id) => (
          <Seriese title={title} key={id} />
        ))}
      </ul>
    </section>
  );
};

export default SideBar;
