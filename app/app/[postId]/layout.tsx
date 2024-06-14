const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className='break-all  mx-auto max-w-screen-lg xl:max-w-[800px] md:max-w-full px-4'>
      {children}
    </article>
  );
};

export default PostLayout;
