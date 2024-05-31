/**
 * Introduce 에 들어갈 것은
 * 내 Github Profile 하고
 * 자기 소개 , 뭘 자기 소개 할까?
 * 프론트엔드를 공부하고 있는 뭐 어쩌구고
 * 내가 생각하는 모토 이런거 쓸까 .,. ? ㅋ 촌스러워
 */

// TODO 짱구린 색상 센스 어떻게 할지 생각해보기
const Emphasis = 'text-indigo-200';

const Profile = () => (
  <section className='flex flex-col justify-center items-center space-y-4 ml-12'>
    <div
      style={{
        backgroundImage: `url('/asset/profile.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='w-32 h-32 rounded-full bg-no-repeat bg-center'
    ></div>
  </section>
);

const Title = () => (
  <section className='py-4'>
    <section className='text-xl'>
      <p className='block mb-2 font-semibold'>
        열심히 <span className={Emphasis}>공부</span>한 내용을{' '}
        <span className={Emphasis}>기록</span>하고{' '}
        <span className={Emphasis}>공유</span>
        하여
      </p>
      <p className='block mb-2 font-semibold'>
        함께 <span className={Emphasis}>성장</span> 하고싶어 만든{' '}
      </p>
      <p className='block  mb-2  font-semibold'>
        <span className={Emphasis}>기술 블로그</span>입니다.
      </p>
    </section>
  </section>
);

const Introduce = () => {
  return (
    <section className='flex justify-around mt-24 mx-0 sm:mx-auto w-full sm:w-3/4 lg:w-full'>
      <Title />
      <Profile />
    </section>
  );
};

export default Introduce;
