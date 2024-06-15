import type { PostInfo } from '@/types/post';

const PostTitle = ({ meta }: { meta: PostInfo['meta'] }) => {
  const { title, tag, date, series } = meta;
  return (
    <>
      <section className='mb-4 py-4 border-b-[2px]  border-gray-300 '>
        <h1 className=' break-all text-wrap text-4xl py-4  leading-tight font-black  '>
          {title}
        </h1>
        <p className='text-gray-500 flex justify-end'>{series}</p>
      </section>
      <section className='flex justify-between'>
        <p>
          {tag.map((pTag, id) => {
            return (
              <span
                key={id}
                className='mr-3 px-2 py-1 bg-gray-400 text-white rounded-l-3xl rounded-r-3xl  '
              >
                {pTag}
              </span>
            );
          })}
        </p>
        <p>{date}</p>
      </section>
    </>
  );
};

export default PostTitle;
