'use client';

import Image from 'next/image';
import useGetComments from '@/app/hooks/useGetComments';

import type { PostMeta } from '@/types/post';
import type { Comment } from '@/types/api';

const UserProfile = ({ comment }: { comment: Comment }) => (
  <div className='flex justify-between'>
    <div className='flex'>
      <Image
        src={comment.avatarUrl}
        width={30}
        height={30}
        alt={`${comment.userName}의 프로필 사진`}
        style={{
          borderRadius: '20px',
          marginRight: '10px',
        }}
      />
      <span className='font-semibold'>@{comment.userName}</span>
    </div>
    <span className='text-[80%]'>
      <i>{new Date(comment.createAt).toDateString()}</i>
    </span>
  </div>
);

// TODO MDX 기능 추가하기
const CommentBody = ({ body }: { body: Comment['body'] }) => {
  return (
    <section className='px-10 py-2'>
      <p>{body}</p>
    </section>
  );
};

const Comment = ({ comment }: { comment: Comment }) => {
  return (
    <section className='px-4 py-4 mt-4 rounded-lg' data-comment>
      <UserProfile comment={comment} />
      <CommentBody body={comment.body} />
    </section>
  );
};

const Comments = ({
  issueNumber,
}: {
  issueNumber: PostMeta['issueNumber'];
}) => {
  const { comments } = useGetComments(issueNumber);

  return (
    <section>
      {comments.map((comment, idx) => (
        <Comment comment={comment} key={idx} />
      ))}
    </section>
  );
};

export default Comments;
