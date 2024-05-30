/**
 * Introduce 에 들어갈 것은
 * 내 Github Profile 하고
 * 자기 소개 , 뭘 자기 소개 할까?
 * 프론트엔드를 공부하고 있는 뭐 어쩌구고
 * 내가 생각하는 모토 이런거 쓸까 .,. ? ㅋ 촌스러워
 */
const Introduce = () => {
  return (
    <div className='mt-12 border-2 border-solid border-sky-500 px-12 lg:px-16 py-3 mx-0 sm:mx-auto w-full sm:w-3/4 lg:w-1/2 '>
      {/* 이 값은 GlobalNav의 높이에 따라 조정 가능 */}
      <h2 className='text-2xl font-semibold'>나는야 최용현</h2>
      <p className='text-lg mt-4'>나의 기술 블로그라네</p>
    </div>
  );
};

export default Introduce;
