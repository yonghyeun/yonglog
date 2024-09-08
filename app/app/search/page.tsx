import SearchTitle from '@/components/SearchTitle';
import PostGrid from '@/components/PostGrid';

import postSearchEngine from '../../lib/postSearchEngine';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { text: string };
}) => {
  const { text } = searchParams;
  const searchedPostMeta = await postSearchEngine.searchPosts(text);

  return (
    <>
      <section className='mx-0 sm:mx-auto w-full lg:w-[800px]'>
        <SearchTitle text={text} postNum={searchedPostMeta.length} />
        <PostGrid postMetas={searchedPostMeta} />
      </section>
    </>
  );
};

export default SearchPage;
