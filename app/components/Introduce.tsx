import Image from 'next/image';
const Profile = () => (
  <section className='flex flex-col justify-center items-center space-y-4 ml-12'>
    <Image
      src='/asset/profile.jpg'
      alt='profile'
      width='150'
      height='150'
      style={{ borderRadius: '20px' }}
    />
  </section>
);

const Title = () => (
  <section className='py-4'>
    <section className='text-xl font-bold'>
      <p className='block mb-2 '>열심히 공부한 내용을 기록 하고 공유 하여</p>
      <p className='block mb-2 '>함께 성장 하고싶어 만든 </p>
      <p className='block  mb-2  '>기술 블로그입니다.</p>
    </section>
  </section>
);

const Introduce = () => {
  return (
    <section className='border-b-[1px] border-[#c1c8cf] flex justify-around mt-12 py-12 mx-0  sm:mx-auto w-full sm:w-3/4 lg:w-full'>
      <Title />
      <Profile />
    </section>
  );
};

export default Introduce;
