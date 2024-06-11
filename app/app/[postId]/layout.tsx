const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className='break-words  mx-auto max-w-screen-lg xl:max-w-[960px] px-4'>
      {children}
    </article>
  );
};

export default PostLayout;
