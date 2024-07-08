import { useSearchParams } from 'react-router-dom';
import { PostComponent } from '@/components/Post';

import { useAppSelector } from '@/hooks';

const PostPage = () => {
  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get('title');

  const searchedPost = useAppSelector((state) => {
    return state.posts.posts.find(({ title }) => title === searchTitle);
  });

  if (!searchedPost) {
    return (
      <section className='main-page'>
        <p> Page is Not founded !</p>
      </section>
    );
  }

  return (
    <section className='main-page'>
      <h1>{searchedPost.author} 가 작성한 게시글</h1>
      <PostComponent post={searchedPost} witheContent />
    </section>
  );
};

export default PostPage;
