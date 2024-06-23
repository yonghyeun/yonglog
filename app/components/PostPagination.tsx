import Link from 'next/link';

import type { PostInfo } from '@/types/post';
import { getSeriesArray } from '@/app/lib/post';

const PostPagination = async ({ meta }: { meta: PostInfo['meta'] }) => {
  const { series, postId: currentPostId } = meta;
  const allSeries = await getSeriesArray(series);

  const baseIdx = allSeries.findIndex(
    ({ meta: { postId } }) => postId === currentPostId,
  );
  const [prevPost, nextPost] = [allSeries[baseIdx - 1], allSeries[baseIdx + 1]];
  const prevMeta = prevPost?.meta || null;
  const nextMeta = nextPost?.meta || null;
  return (
    <nav className='mt-10 text-slate-50'>
      <ul className='flex justify-between'>
        <li data-theme className=''>
          {prevPost && (
            <span className='w-[200px] rounded-xl px-2 py-1 flex justify-center align-center bg-indigo-950 text-white'>
              <Link href={String(prevMeta.postId)}>{prevMeta.title}</Link>
            </span>
          )}
        </li>
        <li data-theme className=''>
          {nextPost && (
            <span className='w-[200px] rounded-xl px-2 py-2 flex justify-center align-center bg-indigo-950'>
              <Link href={String(nextMeta.postId)}>{nextMeta.title}</Link>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default PostPagination;
