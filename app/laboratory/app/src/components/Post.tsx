import { Link } from 'react-router-dom';
import type { Post, ReactionNum } from '@/global';

import RemogiButton from '@/feature/posts/ui/Remogi';

export const PostComponent = ({
  post,
  witheContent = false,
}: {
  post: Post;
  witheContent?: boolean;
}) => {
  return (
    <section className='post'>
      <h1>{post.title}</h1>
      {witheContent && <p>{post.content}</p>}
      <p className='post-date'>{post.date}</p>
      <p>
        by <span>{post.author}</span>
      </p>
      <div className='emogi-list'>
        {Object.entries(post.reactions).map(([emogi, num], idx) => (
          <RemogiButton
            key={idx}
            title={post.title}
            reaction={emogi as keyof ReactionNum}
            num={num}
          />
        ))}
      </div>
      <Link to={`post?title=${post.title}`}>View</Link>
      <Link to={`edit?title=${post.title}`}>Edit</Link>
    </section>
  );
};
