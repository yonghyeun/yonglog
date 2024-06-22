import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get('code') as string;
  const callbackPostId = searchParams.get('state')?.split('_')[1] as string;

  const ENDPOINT = process.env.GITHUB_ACCESSTOKEN_ENDPOINT as string;
  const BASE_URI =
    process.env.NODE_ENV === 'development'
      ? (process.env.DEV_BASE_URI as string)
      : (process.env.PUB_BASE_URI as string);
  const CLIENT_ID = process.env.CLIENT_ID as string;
  const CLIENT_SECRET = process.env.CLIENT_SECRET as string;

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: `${BASE_URI}/post/${callbackPostId}`,
      }),
    });

    if (!response.ok) {
      throw new Error('네트워크 상태가 좋지 않습니다. 잠시 후 시도해주세요');
    }

    const data = await response.json();
    if (data.error || !data.access_token) {
      throw new Error(data.error && '임시 코드의 유효기간이 모두 지났습니다.');
    }

    const { access_token } = data;

    const res = NextResponse.redirect(`${BASE_URI}/post/${callbackPostId}`);
    res.cookies.set('token', access_token, {
      // ! httpOnly 가 false여서 탈취 위험이 존재함
      // ! 하지만 쿠키 값을 클라이언트 단에서 localStorage에 저장하기 위해 false
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/post',
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`${BASE_URI}/post/${callbackPostId}`);
  }
};

/**
 * /OAuth 처리 후 리다이렉트 되는 request 들을 intercept
 */
export const config = {
  matcher: '/OAuth',
};
