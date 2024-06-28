'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import Image from 'next/image';
import useGetComments from '@/app/hooks/useGetComments';
import Spinner from '@/components/Spinner';
import { Login, Logout } from './OAuth';

import type { PostMeta } from '@/types/post';
import type { Comment } from '@/types/api';
import { getCookie } from '@/app/lib/cookie';
import { cookies } from 'next/headers';

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

const CommentForm = ({
  token,
  setToken,
  setComments,
  postId,
  issueNumber,
}: {
  token: string | null;
  setToken: Dispatch<SetStateAction<typeof token>>;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  postId: PostMeta['postId'];
  issueNumber: PostMeta['issueNumber'];
}) => {
  const placeholder = token
    ? '마크다운 문법을 이용해 댓글 작성이 가능합니다 \n\n 궁금하신 점이나 틀린 부분이 있다면 부담없이 말씀해주세요 :)'
    : ` 로그인 후 사용해주세요 ! \n\n 로그인은 yonghyuen/abonglog에 대한 깃허브 액세스 토큰을 발급 받아 작동합니다. \r\n 액세스 토큰에 대한 범위는 abonglog 레파지토리에 대해서만 유효하니 걱정마세요 :)`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/comments/${issueNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          body: formData.get('comment'),
        }),
      });

      const data = await response.json();

      setComments((prevComment) => [...prevComment, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='mt-4 rounded-2xl overflow-hidden' data-comment-theme>
      <div className='px-4 py-4'>
        {token ? <Logout setToken={setToken} /> : <Login postId={postId} />}
      </div>
      <form
        className={` ${!token ? 'pointer-events-none' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className='px-4 pt-4 '>
          <label htmlFor='comment' className='sr-only'>
            your comment
          </label>
          <textarea
            name='comment'
            id='comment'
            className='w-full px-4 py-4 bg-gray-300 text-[#111] rounded-lg h-[150px] border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none'
            placeholder={placeholder}
            data-theme
          />
        </div>
        <div className='flex justify-end pr-4 py-2'>
          <button
            type='submit'
            className='px-2 py-1 bg-indigo-800 hover:bg-indigo-700 text-white rounded-xl'
            disabled={!token}
          >
            submit
          </button>
        </div>
      </form>
    </section>
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
  const { comments, setComments, isLoading } = useGetComments(issueNumber);
  const [token, setToken] = useState(() => {
    return getCookie('token');
  });

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
      <CommentForm
        token={token}
        setToken={setToken}
        setComments={setComments}
        postId={postId}
        issueNumber={issueNumber}
      />
    </section>
  );
};

export default Comments;
