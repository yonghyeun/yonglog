'use client';

import { GITHUB_LOGIN_ENDPOINT } from '@/app/constant/comments';

import useToken from '@/app/hooks/useToken';

export const Login = ({ postId }: { postId: string }) => {
  const CLIENT_ID = 'Ov23liRzfTkgNGuuHNdQ';
  const REDIRECT_URI = 'http://localhost:3000/OAuth';
  const SCOPES = 'public_repo read:discussion write:discussion';
  const randomState = Math.floor(Math.random() * 10000);

  const authorizationUrl = `${GITHUB_LOGIN_ENDPOINT}?client_id=${CLIENT_ID}&state=${randomState}_${postId}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
  return <a href={authorizationUrl}>Login With Github</a>;
};

const Comments = ({ postId }: { postId: string }) => {
  const { token, setToken } = useToken();

  return (
    <section id='comment'>
      <section>
        <p className='border'>댓글 1</p>
        <p className='border'>댓글 2</p>
      </section>
      <form action=''>
        <textarea className='w-full' />
        <div className='flex justify-end'>
          <button type='submit'>등록하기</button>
        </div>
      </form>
      <div>
        {token ? (
          <button
            onClick={() => {
              window.cookieStore.delete('token');
              window.localStorage.removeItem('token');
              setToken('');
            }}
          >
            logout
          </button>
        ) : (
          <Login postId={postId} />
        )}
      </div>
    </section>
  );
};

export default Comments;
