import { SearchParams } from '@/types/global';
import type { PostInfo } from '@/types/post';

import Image from 'next/image';

export const PostItem = ({ meta }: { meta: PostInfo['meta'] }) => (
  <div className='my-4 px-4 pb-8 border-b-[1px] border-[#c1c8cf] flex justify-between '>
    <div className='w-5/6'>
      <p className='text-gray-500 mb-2 text-sm'>
        <span className='mr-2'>{meta.date}</span>
        <span className='mr-2'>{meta?.series}</span>
      </p>
      <h1 className='text-3xl font-bold leading-10 mb-2 break-words whitespace-normal'>
        {meta.title}
      </h1>
      <p>{meta.description}</p>
    </div>
    <div className='flex justify-center items-center'>
      {meta.seriesThumbnail && (
        <Image
          src={meta.seriesThumbnail}
          alt='series-thumbnail'
          width={60}
          height={60}
        />
      )}
    </div>
  </div>
);

export const PostList = ({
  postList,
  page,
}: {
  postList: Array<PostInfo>;
  page: SearchParams['page'];
}) => {
  const POSTS_PER_PAGES = Number(process.env.POSTS_PER_PAGES);
  const offSet = Math.max(0, (Number(page) - 1) * POSTS_PER_PAGES);

  const slicedPostList = postList.slice(offSet, offSet + POSTS_PER_PAGES);
  return slicedPostList.map(({ meta }, id) => (
    <PostItem meta={meta} key={id} />
  ));
};
