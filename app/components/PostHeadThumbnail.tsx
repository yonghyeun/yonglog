import Image from 'next/image';
import type { PostMeta } from '@/types/post';

type Props = {
  imageSrc: PostMeta['validThumbnail'];
  title: PostMeta['title'];
};

const PostHeadThumbnail = ({ imageSrc, title }: Props) => {
  if (!imageSrc) {
    return;
  }
  return (
    <span className='grid justify-center items-center  mx-auto w-full my-8'>
      <Image
        src={imageSrc}
        alt={`${title}의 썸네일`}
        width={800}
        height={600}
        sizes='
        (max-width: 640px) 100vw,      
        (max-width: 768px) 100vw,      
        (max-width: 1024px) 100vw,     
        (max-width: 1280px) 800px,     
        800px                          
      '
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '800px',
          maxHeight: '400px',
          borderRadius: '8px',
          display: 'block',
        }}
      />
      <span className={`italic block text-center text-[90%]`}>{title}</span>
    </span>
  );
};

export default PostHeadThumbnail;
