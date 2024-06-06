import { useMDXComponents } from '../lib/mdxComponents';

import { getPostContent } from '../lib/post';
import { MDXRemote } from 'next-mdx-remote/rsc';

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { meta, content } = getPostContent(params.postId);
  const components = useMDXComponents({}, meta.path);
  return (
    <>
      <section>
        {Object.entries(meta).map(([key, value], id) => {
          return (
            <h1 key={id}>
              {key} : {value}
            </h1>
          );
        })}
      </section>
      <section>
        <MDXRemote source={content} components={components} />
      </section>
    </>
  );
};

export default PostPage;
