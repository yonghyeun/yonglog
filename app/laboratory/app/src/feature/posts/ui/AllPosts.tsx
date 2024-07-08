import { useAppSelector } from '@/hooks';

import { PostComponent } from '@/components/Post';

const AllPosts = () => {
  const { posts } = useAppSelector((state) => state.posts);

  return (
    <section className='post-wrapper'>
      {posts.map((post, idx) => (
        <PostComponent post={post} key={idx} />
      ))}
    </section>
  );
};

export default AllPosts;
