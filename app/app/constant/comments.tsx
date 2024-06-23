export const GITHUB_LOGIN_ENDPOINT = 'https://github.com/login/oauth/authorize';
export const REDIRECT_URI: string =
  process.env.NODE_ENV === 'development'
    ? `${process.env.DEV_BASE_URI}/${process.env.REDIRECT_URI}`
    : `${process.env.PUB_BASE_URI}/${process.env.REDIRECT_URI}`;
export const SCOPES = process.env.SCOPES;
export const CLIENT_ID = process.env.CLIENT_ID as string;
