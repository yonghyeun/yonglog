'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import Image from 'next/image';
import useGetComments from '@/app/hooks/useGetComments';
import Spinner from '@/components/Spinner';
import { Login, Logout } from './OAuth';

import type { PostMeta } from '@/types/post';
import type { Comment } from '@/types/api';
import { getCookie } from '@/app/lib/cookie';

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
    <section className='px-16 py-2'>
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
          '<p>아직 댓글이 존재하지 않습니다. 댓글이 달릴 시 해당 댓글은 사라집니다 :)</p>',
      }}
    />
  );
};

const CommentForm = ({
  setComments,
  postId,
  issueNumber,
}: {
  setComments: Dispatch<SetStateAction<Comment[]>>;
  postId: PostMeta['postId'];
  issueNumber: PostMeta['issueNumber'];
}) => {
  const [token, setToken] = useState(() => {
    return getCookie('token');
  });

  const placeholder = token
    ? '마크다운 문법을 이용해 댓글 작성이 가능합니다 \n\n 궁금하신 점이나 틀린 부분이 있다면 부담없이 말씀해주세요 :)'
    : ` 로그인 후 사용해주세요 :)   `;

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
      alert(error);
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
            댓글 등록하기
          </button>
        </div>
      </form>
    </section>
  );
};

const CommentFooter = ({
  issueNumber,
}: {
  issueNumber: PostMeta['issueNumber'];
}) => {
  return (
    <p className='flex justify-end italic pt-1'>
      해당 댓글 리스트들은
      <a
        href={`https://github.com/yonghyeun/yonglog/issues/${issueNumber}`}
        className='underline px-[4px]'
      >
        해당 이슈
      </a>
      에서 확인 및 수정 가능합니다.
    </p>
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
        setComments={setComments}
        postId={postId}
        issueNumber={issueNumber}
      />
      <CommentFooter issueNumber={issueNumber} />
    </section>
  );
};

export default Comments;
