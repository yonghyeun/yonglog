import SearchTitle from '@/components/SearchTitle';

import postSearchEngine from '../lib/postSearchEngine';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { text: string; page: string };
}) => {
  const { text, page } = searchParams;

  const searchedPostInfo = await postSearchEngine.searchPosts(text);

  return (
    <>
      <section className='mx-0 sm:mx-auto w-full lg:w-1/2'>
        <SearchTitle text={text} />
      </section>
    </>
  );
};

export default SearchPage;
