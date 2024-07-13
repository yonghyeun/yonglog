const SearchTitle = ({ text, postNum }: { text: string; postNum: number }) => {
  return (
    <div className='px-2 py-12 mt-12 flex flex-col'>
      <p className='text-[16px] text-gray-500'>abonglog Search</p>
      <h1 className='text-[48px] font-black'>
        <span className='gradient-text'>{text}</span>
      </h1>
      <p className='text-[16px] text-gray-500'>
        {postNum}개의 게시글이 검색 되었어요
      </p>
    </div>
  );
};

export default SearchTitle;
