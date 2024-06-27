import GithubAPIModel from '@/app/lib/GithubAPIModel';

import { NextRequest, NextResponse } from 'next/server';

import type { Comment } from '@/types/api';

type Response = { [key in string]: any };

/**
 * /api/comments/{issueNumber} 에 대한 GET요청
 * 나의 AccessToken 을 이용하여 GithubAPI로 {issueNumber} 에 달린 댓글을 가져와
 * 경량화하여 클라이언트에게 response함
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { issueNumber: string } },
): Promise<NextResponse<Comment[]>> {
  const PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN as string;
  const ServerAPIModel = new GithubAPIModel(PERSONAL_ACCESS_TOKEN);

  const { issueNumber } = params;
  const endPoint = `/repos/yonghyeun/yonglog/issues/${issueNumber}/comments`;
  /* 요청을 보낼 때 받을 response의 미디어 타입을 html+json으로 변경하자 */
  const originalResponse = await ServerAPIModel.GET<Response[]>(endPoint, {
    Accept: 'application/vnd.github.html+json',
  });

  const commentList: Comment[] = originalResponse.map(
    ({ user, created_at, body_html }) => ({
      userName: user.login,
      avatarUrl: user.avatar_url,
      createAt: created_at,
      bodyHtml: body_html,
    }),
  );
  return NextResponse.json(commentList, { status: 200 });
}
