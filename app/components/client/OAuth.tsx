'use client';
import { deleteCookie } from '@/app/lib/cookie';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';

/*
Client 사이드에서 실행 될 곳에서는 process.env가 사용 불가능하기 때문에 전역 변수로 생성
해당 변수들은 유출되어도 문제가 없는 변수들이다.
*/
const CLIENT_ID = 'Ov23liRzfTkgNGuuHNdQ';
const GITHUB_LOGIN_ENDPOINT = 'https://github.com/login/oauth/authorize';
const REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/OAuth'
    : 'https://abonglog.me/api/OAuth';
const scopes = 'public_repo read:discussion write:discussion';

export const Login = ({ postId }: { postId: number }) => {
  const randomState = Math.floor(Math.random() * 10000);
  const authorizationUrl = `${GITHUB_LOGIN_ENDPOINT}?client_id=${CLIENT_ID}&state=${randomState}_${postId}&redirect_uri=${REDIRECT_URI}&scope=${scopes}`;

  return (
    <Link
      href={authorizationUrl}
      className='px-2 py-2 bg-indigo-800 text-white rounded-xl hover:bg-indigo-500'
    >
      Github로 로그인하기
    </Link>
  );
};

export const Logout = ({
  setToken,
}: {
  setToken: Dispatch<SetStateAction<string | null>>;
}) => {
  const handleLogout = () => {
    deleteCookie('token');
    setToken(null);
  };

  return (
    <button
      onClick={handleLogout}
      className='px-2 py-1 bg-indigo-800 text-white rounded-xl hover:bg-indigo-500'
    >
      로그아웃 하기
    </button>
  );
};
