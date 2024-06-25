'use client';

import useGetComments from '@/app/hooks/useGetComments';
import type { PostMeta } from '@/types/post';

// import { GITHUB_LOGIN_ENDPOINT } from '@/app/constant/comments';

// import useToken from '@/app/hooks/useToken';

// export const Login = ({ postId }: { postId: string }) => {
//   const CLIENT_ID = 'Ov23liRzfTkgNGuuHNdQ';
//   const REDIRECT_URI = 'http://localhost:3000/OAuth';
//   const SCOPES = 'public_repo read:discussion write:discussion';
//   const randomState = Math.floor(Math.random() * 10000);

//   const authorizationUrl = `${GITHUB_LOGIN_ENDPOINT}?client_id=${CLIENT_ID}&state=${randomState}_${postId}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
//   return <a href={authorizationUrl}>Login With Github</a>;
// };

const Comments = ({
  issueNumber,
}: {
  issueNumber: PostMeta['issueNumber'];
}) => {
  const { comments } = useGetComments(issueNumber);

  return <h1> {comments.message}</h1>;
};

export default Comments;
