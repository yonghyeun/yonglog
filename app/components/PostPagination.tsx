import Link from 'next/link';

import type { PostInfo } from '@/types/post';
import postProvider from '@/app/lib/postProvider';

const PostPagination = async ({ meta }: { meta: PostInfo['meta'] }) => {
  const { series, postId: currentPostId } = meta;
  const allSeries = await postProvider.getSeriesArray(series);

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
            <span className='max-w-[150px] sm:max-w-[200px] md:max-w-[300px]  rounded-xl px-2 py-2 h-full flex justify-center align-center bg-indigo-700 text-white hover:bg-indigo-500'>
              <Link href={String(prevMeta.postId)}>{prevMeta.title}</Link>
            </span>
          )}
        </li>
        <li data-theme className=''>
          {nextPost && (
            <span className='max-w-[150px] sm:max-w-[200px] md:max-w-[300px]  rounded-xl px-2 py-2 h-full flex justify-center align-center bg-indigo-700 hover:bg-indigo-500'>
              <Link href={String(nextMeta.postId)}>{nextMeta.title}</Link>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default PostPagination;
