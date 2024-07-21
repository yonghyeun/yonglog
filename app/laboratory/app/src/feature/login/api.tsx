import { useMutation } from '@tanstack/react-query';
import useSessionStore from './store';
import { useState } from 'react';

type UserSession = {
  userName: string;
  token: string;
};

const useAuth = () => {
  const sessionStore = useSessionStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ id, password }: { id: string; password: string }) => {
      const response = await fetch('http://localhost:3000/api/dev/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Unhandled Error');
      }

      const data = await response.json();
      return data;
    },
    retry: (failureCount, error) => {
      if (error.message.includes('서버나 네트워크 상황이 불안정합니다.')) {
        return failureCount < 3;
      }
      return false;
    },
    retryDelay: 1000,
    onError: (error) => {
      setErrorMessage(error.message);
      window.alert(error.message);
    },
    onSuccess: (data: UserSession) => {
      sessionStore.setToken(data.token);
      sessionStore.setUserName(data.userName);
      setErrorMessage(null);
    },
  });

  return { mutation, errorMessage };
};

export default useAuth;
