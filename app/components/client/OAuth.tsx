'use client';

const GITHUB_LOGIN_ENDPOINT = 'https://github.com/login/oauth/authorize';
const REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/OAuth'
    : 'https://abonglog.me/OAuth';
const scopes = 'public_repo read:discussion write:discussion';

export const Login = ({
  clientId,
  postId,
}: {
  clientId: string;
  postId: string;
}) => {
  const randomState = Math.floor(Math.random() * 10000);
  const authorizationUrl = `${GITHUB_LOGIN_ENDPOINT}?client_id=${clientId}&state=${randomState}_${postId}&redirect_uri=${REDIRECT_URI}&scope=${scopes}`;
  return <a href={authorizationUrl}>Login With Github</a>;
};
