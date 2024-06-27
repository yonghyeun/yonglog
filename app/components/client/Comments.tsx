'use client';

import Image from 'next/image';
import useGetComments from '@/app/hooks/useGetComments';
import Spinner from '@/components/Spinner';
import OAuth from './OAuth';

import type { PostMeta } from '@/types/post';
import type { Comment } from '@/types/api';
import useLogin from '@/app/hooks/useLogin';

const UserProfile = ({ comment }: { comment: Comment }) => (
  <div className='flex justify-between'>
    <div className='flex'>
      <Image
        src={comment.avatarUrl}
        width={50}
        height={50}
        alt={`${comment.userName}의 프로필 사진`}
        style={{
          borderRadius: '20px',
          marginRight: '10px',
        }}
      />
      <span className='flex items-center font-semibold'>
        @{comment.userName}
      </span>
    </div>
    <span className='text-[80%]'>
      <i>{new Date(comment.createAt).toDateString()}</i>
    </span>
  </div>
);

const CommentBody = ({ bodyHtml }: { bodyHtml: Comment['bodyHtml'] }) => {
  return (
    <section className='px-10 py-2'>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </section>
  );
};

const Comment = ({ comment }: { comment: Comment }) => {
  return (
    <section className='px-4 py-4 mt-4 rounded-2xl' data-comment>
      <UserProfile comment={comment} />
      <CommentBody bodyHtml={comment.bodyHtml} />
    </section>
  );
};

const CommentList = ({
  comments,
  date,
}: {
  comments: Comment[];
  date: PostMeta['date'];
}) => {
  return (
    <section>
      {comments.length === 0 ? (
        <YonghyeunComment date={date} />
      ) : (
        comments.map((comment, idx) => <Comment comment={comment} key={idx} />)
      )}
    </section>
  );
};

const YonghyeunComment = ({ date }: { date: PostMeta['date'] }) => {
  return (
    <Comment
      comment={{
        userName: 'yonghyeun',
        avatarUrl: 'https://avatars.githubusercontent.com/u/123540354?v=',
        createAt: date,
        bodyHtml:
          '<p>아직 댓글이 존재하지 않습니다. 댓글이 달릴 시 해당 댓글은 사라집니다 :).</p>',
      }}
    />
  );
};

const Comments = ({
  issueNumber,
  date,
  postId,
}: {
  issueNumber: PostMeta['issueNumber'];
  date: PostMeta['date'];
  postId: PostMeta['postId'];
}) => {
  const { comments, isLoading } = useGetComments(issueNumber);
  const [{ token, setToken }, { isLogin, setIsLogin }] = useLogin();

  if (isLoading) {
    return (
      <div className='flex flex-col items-center'>
        <Spinner />
        <p>댓글을 가져오고 있어요</p>
      </div>
    );
  }

  return (
    <section>
      <CommentList comments={comments} date={date} />
      <OAuth isLogin={isLogin} setIsLogin={setIsLogin} postId={postId} />
    </section>
  );
};

export default Comments;
