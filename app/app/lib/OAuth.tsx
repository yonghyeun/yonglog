import { redirect } from 'next/navigation';

type GitHubTokenResponse = {
  access_token: string;
  scope: string;
  token_type: string;
  error?: string;
};

export const Authorization = async (code: string, callbackPostID: string) => {
  const Authorization_ENDPOINT = 'https://github.com/login/oauth/access_token';
  const CLIENT_ID = process.env.CLIENT_ID as string;
  const CLIENT_SECRET = process.env.CLIENT_SECRET as string;

  // TODO 배포시에 변경하기
  const callbackURI = `http://localhost:3000/post/${callbackPostID}`;

  try {
    const response = await fetch(Authorization_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('깃허브 인증 서버에 문제가 있습니다.다시 시도해주세요');
    }

    const data: GitHubTokenResponse = await response.json();

    if (data.error || !data.access_token) {
      throw new Error(data.error);
    }

    const { access_token } = data;
    console.log('access_token 은~~!!');
    console.log(access_token);
    redirect(callbackURI);
  } catch (error) {
    console.error(error);
    redirect(callbackURI);
  }
};
