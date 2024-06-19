import AccordionsWithState from './client/AccordionsWithState';

import { getSeriesArray } from '@/app/lib/post';

import type { PostInfo } from '@/types/post';

const SeriesAccordions = ({ meta }: { meta: PostInfo['meta'] }) => {
  const { series, postId: currentPostId } = meta;
  const allSeries = getSeriesArray(series);

  return (
    <AccordionsWithState
      seriesTitle={series}
      items={allSeries.toReversed()}
      currentPostId={currentPostId}
    />
  );
};

export default SeriesAccordions;
