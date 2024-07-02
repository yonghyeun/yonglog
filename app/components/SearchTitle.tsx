const SearchTitle = ({ text }: { text: string }) => {
  return (
    <div className=' mt-12 py-12 mx-0  sm:mx-auto w-full sm:w-3/4 lg:w-full'>
      <p className='text-[16px] text-gray-500'>abonglog Search</p>
      <h1 className='text-[48px] font-black'>
        검색어에 대한 검색 결과:<span className='gradient-text'>{text}</span>
      </h1>
    </div>
  );
};

export default SearchTitle;
