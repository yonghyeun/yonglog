const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className='break-words  mx-auto max-w-screen-lg px-4'>
      {children}
    </article>
  );
};

export default PostLayout;
