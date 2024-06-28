import GithubAPIModel from '@/app/lib/GithubAPIModel';

import { NextRequest, NextResponse } from 'next/server';

import type { Comment } from '@/types/api';

type Response = { [key in string]: any };

/**
 * /api/comments/{issueNumber} 에 대한 GET 요청
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

/**
 * /api/comments/{issueNumber} 에 대한 POST 요청
 * 리소스 오너의 AccessToken 을 이용하여 GithubAPI로 {issueNumber} 에 댓글을 작성
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { issueNumber: string } },
) {
  const { issueNumber } = params;
  const token = req.headers.get('authorization');
  const { body } = await req.json();
  const endPoint = `/repos/yonghyeun/yonglog/issues/${issueNumber}/comments`;

  if (!token) {
    return NextResponse.json('로그인 후 사용해주세요 !', { status: 500 });
  }

  /* 리소스 오너의 토큰 값을 이용해 모델 인스턴스 생성 */
  try {
    const ClientAPIModel = new GithubAPIModel(token);

    const originalResponse = await ClientAPIModel.POST<Response>(endPoint, {
      additionalHeaders: {
        Accept: 'application/vnd.github.html+json',
      },
      body: JSON.stringify({
        body,
      }),
    });

    const newComment: Comment = {
      userName: originalResponse.user.login,
      avatarUrl: originalResponse.user.avatar_url,
      createAt: originalResponse.created_at,
      bodyHtml: originalResponse.body_html,
    };

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('깃허브 API 사용 시 문제가 발생했습니다.', error);
    return NextResponse.json(
      '댓글을 등록하는데 실패했습니다. 다시 시도해주세요',
      { status: 500 },
    );
  }
}
