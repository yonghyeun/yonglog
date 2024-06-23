import type { Cookie } from '@/types/global';

export const getTokenInLocalStorage = async () => {
  return localStorage.getItem('token');
};

export const getTokenInCookie = async () => {
  const cookies: Cookie[] = await (window as any).cookieStore.getAll();
  return cookies.find((cookie) => cookie.name === 'token')?.value;
};

export const storeTokenToLocalStorage = async (token: Cookie['value']) => {
  localStorage.setItem('token', token);
};
