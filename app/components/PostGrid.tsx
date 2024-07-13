import Image from 'next/image';

import type { PostMeta } from '@/types/post';
import Link from 'next/link';

const PostCard = ({ postMeta }: { postMeta: PostMeta }) => {
  const { title, description, validThumbnail, series, postId } = postMeta;

  return (
    <Link href={`https://abonglog.me/post/${postId}`}>
      <div data-card className='max-w-sm  rounded-xl overflow-hidden shadow-md'>
        <div className='w-full h-[300px] relative'>
          <Image
            src={validThumbnail}
            alt={title}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{title}</div>
          <p className='text- text-base'>{description}</p>
          <p className='py-2 text-sm text-end'>{series}</p>
        </div>
      </div>
    </Link>
  );
};

const PostGrid = ({ postMetas }: { postMetas: PostMeta[] }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {postMetas.map((postMeta, idx) => (
        <div key={idx} className='flex justify-center item-center'>
          <PostCard postMeta={postMeta} />
        </div>
      ))}
    </section>
  );
};

export default PostGrid;
