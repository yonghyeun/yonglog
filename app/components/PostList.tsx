import Link from 'next/link';
import Image from 'next/image';
import postProvider from '@/app/lib/postProvider';
import type { PostInfo } from '@/types/post';

export const PostItem = ({ meta }: { meta: PostInfo['meta'] }) => (
  <Link
    href={{
      pathname: `post/${String(meta.postId)}`,
    }}
    className='my-4 px-4 pb-8 border-b-[1px] border-[#c1c8cf] flex justify-between '
  >
    <div className='flex justify-center items-center mr-10  '>
      <Image
        src={meta.validThumbnail}
        alt='series-thumbnail'
        width={150}
        height={150}
      />
    </div>
    <div className='w-5/6 flex flex-col justify-between'>
      <section>
        <h1 className='text-3xl font-bold leading-10 mb-2 break-words whitespace-normal'>
          {meta.title}
        </h1>
        <p className='text-l'>{meta.description}</p>
      </section>
      <p className='flex justify-between text-gray-500 my-2 text-sm'>
        <span className='mr-2'>{meta?.series}</span>
        <span className='mr-2'>{meta.date}</span>
      </p>
    </div>
  </Link>
);

export const PostList = async ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const page = searchParams.get('page') || '1';
  const postList = await postProvider.selectPost(searchParams);

  const POSTS_PER_PAGES = Number(process.env.POSTS_PER_PAGES);
  const offSet = Math.max(0, (Number(page) - 1) * POSTS_PER_PAGES);

  const slicedPostList = postList.slice(offSet, offSet + POSTS_PER_PAGES);

  return slicedPostList.map(({ meta }, id) => (
    <PostItem meta={meta} key={id} />
  ));
};
