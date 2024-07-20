import { useMutation } from '@tanstack/react-query';
import useSessionStore from './store';

type UserSession = {
  userName: string;
  token: string;
};

const useAuth = () => {
  const sessionStore = useSessionStore();

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
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    },
    retry: (failureCount, error) => {
      if (error.message.includes('Network response was not ok')) {
        return failureCount < 3;
      }
      if (error.message.includes('Server State was not ok')) {
        return failureCount < 3;
      }
      return false;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),

    onError: () => {},
    onSuccess: (data: UserSession) => {
      sessionStore.setToken(data.token);
      sessionStore.setUserName(data.userName);
    },
  });

  return mutation;
};

export default useAuth;
