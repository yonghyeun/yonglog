const SearchTitle = ({ text, postNum }: { text: string; postNum: number }) => {
  return (
    <div className=' mt-12 py-12 mx-0  sm:mx-auto w-full sm:w-3/4 lg:w-full'>
      <p className='text-[16px] text-gray-500'>abonglog Search</p>
      <h1 className='text-[48px] font-black'>
        <span className='gradient-text'>{text}</span>에 대한 게시글 본문 검색
        결과
      </h1>
      <p className='text-[16px] text-gray-500'>
        {postNum}개의 게시글이 검색 되었어요
      </p>
    </div>
  );
};

export default SearchTitle;
