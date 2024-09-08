import { PostMeta } from '@/types/post';
import { useEffect, useState } from 'react';

import type { Comment } from '@/types/api';

const useGetComments = (issueNumber: PostMeta['issueNumber']) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        /* 해당 요청은 abonglog api 엔드포인트를 향해 간다. */
        const response = await fetch(`/api/comments/${issueNumber}`, {
          method: 'GET',
        });
        const data = await response.json();
        setComments(data);
      } catch (e) {
        console.error(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [issueNumber]);

  return { comments, setComments, isLoading, isError };
};

export default useGetComments;
