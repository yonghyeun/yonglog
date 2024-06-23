import { useEffect, useState } from 'react';

import {
  getTokenInCookie,
  getTokenInLocalStorage,
  storeTokenToLocalStorage,
} from '../lib/browser';

const useToken = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    (async function () {
      const tokenInCookie = await getTokenInCookie();

      if (tokenInCookie) {
        storeTokenToLocalStorage(tokenInCookie);
      }

      const tokenInLocalStorage = await getTokenInLocalStorage();

      if (tokenInLocalStorage) {
        setToken(tokenInLocalStorage);
      }
    })();
  }, []);

  return { token, setToken };
};

export default useToken;
