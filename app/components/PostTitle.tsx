import type { PostInfo } from '@/types/post';

const PostTitle = ({ meta }: { meta: PostInfo['meta'] }) => {
  const { title, tag, date, series } = meta;
  return (
    <>
      <section className='mb-4 py-4 border-b-[2px]  border-gray-300 '>
        <h1 className=' text-5xl py-4 font-semibold'>{title}</h1>
        <p className='text-gray-500 flex justify-end'>{series}</p>
      </section>
      <section className='flex justify-between'>
        <p>
          {tag.map((pTag, id) => {
            return (
              <span
                key={id}
                className='mr-2 border px-2 py-1 bg-gray-300 rounded-lg '
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
