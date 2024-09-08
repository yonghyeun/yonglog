export const getCookie = (cookieName: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const cookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));

  return cookie ? cookie.split('=')[1] : null;
};

export const deleteCookie = (cookieName: string) => {
  if (typeof document === 'undefined') {
    return;
  }
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
};
