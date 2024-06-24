import AccordionsWithState from './client/AccordionsWithState';

import { getSeriesArray } from '@/app/lib/post';

import type { PostInfo } from '@/types/post';

const SeriesAccordions = async ({ meta }: { meta: PostInfo['meta'] }) => {
  const { series, postId: currentPostId } = meta;
  const allSeries = await getSeriesArray(series);

  return (
    <AccordionsWithState
      seriesTitle={series}
      items={allSeries}
      currentPostId={currentPostId}
    />
  );
};

export default SeriesAccordions;
