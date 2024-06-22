import { Login } from '@/components/client/OAuth';

const Comments = ({ postId }: { postId: string }) => {
  const CLIENT_ID = process.env.CLIENT_ID as string;
  return (
    <section>
      <Login clientId={CLIENT_ID} postId={postId} />
    </section>
  );
};

export default Comments;
