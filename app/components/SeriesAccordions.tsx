import postProvider from '@/app/lib/postProvider';
import AccordionsWithState from './client/AccordionsWithState';
import SeriesHeader from './SeriesHeader';

import type { PostInfo } from '@/types/post';

const SeriesAccordions = async ({ meta }: { meta: PostInfo['meta'] }) => {
  const { series, postId: currentPostId, seriesHeader } = meta;
  const allSeries = await postProvider.getSeriesArray(series);

  return (
    <section className='rounded-xl bg-indigo-950 text-slate-50 px-4 py-4 mb-12 '>
      <p className='text-2xl mb-2'>
        이 글은 <b className='font-semibold'>{series}</b>의 게시글이예요
      </p>
      <SeriesHeader seriesHeader={seriesHeader} />
      <AccordionsWithState items={allSeries} currentPostId={currentPostId} />
    </section>
  );
};

export default SeriesAccordions;
