import Image from "next/image";
const Profile = () => (
  <section className="flex flex-col justify-center items-center space-y-4 ml-12">
    <Image
      src="/asset/profile.png"
      alt="profile"
      width="150"
      height="150"
      style={{ borderRadius: "20px" }}
    />
  </section>
);

const Title = () => (
  <section className="py-4">
    <section className="text-xl font-bold">
      <p className="block mb-2">열심히 공부한 내용을 기록 하고 공유 하여</p>
      <p className="block mb-2">함께 성장 하고싶어 만든 </p>
      <p className="block  mb-2">기술 블로그입니다.</p>
    </section>
  </section>
);

const Introduce = () => {
  return (
    <section className="border-b-[1px] border-[#c1c8cf] mt-12 pt-12  pb-4 mx-0 flex flex-col sm:mx-auto w-full sm:w-3/4 lg:w-full">
      <div className="flex justify-around">
        <Title />
        <Profile />
      </div>
      <div className="flex gap-2">
        <a
          href="https://velog.io/@yonghyeun/posts"
          className="border border-gray-400 rounded-l-3xl rounded-r-3xl text-center px-4 py-2 focus:outline-none font-light text-sm
          italic"
        >
          Velog
        </a>
        <a
          href="https://www.highlightcode.site/"
          className="border border-gray-400 rounded-l-3xl rounded-r-3xl text-center px-4 py-2 focus:outline-none font-light text-sm
    italic"
        >
          HighlightCode
        </a>
      </div>
    </section>
  );
};

export default Introduce;
