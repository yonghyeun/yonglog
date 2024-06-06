const PostLayout = ({
  params,
  children,
}: {
  params: { postId: string };
  children: React.ReactNode;
}) => {
  return (
    <article className='break-words mt-20 mx-auto max-w-screen-lg px-4'>
      {children}
    </article>
  );
};

export default PostLayout;
