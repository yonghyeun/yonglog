import { PostMeta } from '@/types/post';
import { useEffect, useState } from 'react';

const useGetComments = (issueNumber: PostMeta['issueNumber']) => {
  //! TODO issueResponse 로 타입 설정 하기
  const [comments, setComments] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`/posts/api/${issueNumber}`);
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
