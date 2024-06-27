import { useEffect, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import {
  getTokenInCookie,
  getTokenInLocalStorage,
  storeTokenToLocalStorage,
} from '../lib/browser';

const useLogin = (): [
  { token: string; setToken: Dispatch<SetStateAction<string>> },
  { isLogin: boolean; setIsLogin: Dispatch<SetStateAction<boolean>> },
] => {
  const [token, setToken] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      const tokenInCookie = await getTokenInCookie();

      if (tokenInCookie) {
        storeTokenToLocalStorage(tokenInCookie);
      }

      const tokenInLocalStorage = await getTokenInLocalStorage();

      if (tokenInLocalStorage) {
        setToken(tokenInLocalStorage);
        setIsLogin(true);
      }
    })();
  }, []);

  return [
    { token, setToken },
    { isLogin, setIsLogin },
  ];
};

export default useLogin;
