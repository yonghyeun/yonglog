import { NextRequest, NextResponse } from 'next/server';

import GithubAPIModel from '@/app/lib/GithubAPIModel';

import type { AccessToken } from '@/types/api';

const BASE_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://abonglog.me';

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get('code') as string;
  const callbackPostId = searchParams.get('state')?.split('_')[1] as string;

  const tokenModel = new GithubAPIModel('');

  try {
    /* abonglog backend -> Github Autorization server */
    // TODO 응답값 보고 타입 선언하기
    const data = await tokenModel.POST<AccessToken>(
      '/login/ouath/access_token',
      {
        body: JSON.stringify({
          client_id: process.env.CLIENT_ID as string,
          client_secret: process.env.CLIENT_SECRET as string,
          code: code,
        }),
      },
    );

    if (!data.access_token) {
      throw new Error('토큰이 발급되지 않았습니다.');
    }

    const { access_token } = data;

    /* abonglog backend -> abonglog frontend */
    const res = NextResponse.redirect(
      `${BASE_URI}/post/${callbackPostId}#comment`,
    );
    res.cookies.set('token', access_token, {
      // ! Access token을 프론트엔드에서 localStorage에 저장하기 위해 httpOnly false
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/post',
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`${BASE_URI}/post/${callbackPostId}`, {
      status: 302,
    });
  }
};
