import PostTitle from '@/components/PostTitle';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../lib/mdxComponents';
import { getPostContent } from '../lib/post';

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { meta, content } = getPostContent(params.postId);
  const components = useMDXComponents({}, meta.path);

  return (
    <>
      <header className='pt-14 mb-12'>
        <PostTitle meta={meta} />
      </header>
      <main className='px-14'>
        <MDXRemote source={content} components={components} />
      </main>
    </>
  );
};

export default PostPage;
