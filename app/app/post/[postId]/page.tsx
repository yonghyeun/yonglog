import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import PostTitle from '@/components/PostTitle';
import SeriesAccordions from '@/components/SeriesAccordions';
import PostSideBar from '@/components/PostSideBar';
import PostPagination from '@/components/PostPagination';
import Comments from '@/components/client/GiscusComments';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';
import { LoadingContnet } from '@/components/Loading';

import { useMDXComponents } from '../../lib/mdxComponents';
import { getAllPosts, getPostContent } from '../../lib/post';
import { Metadata } from 'next';

export function generateStaticParams(): { postId: string }[] {
  const allPost = getAllPosts();
  return allPost.map(({ meta }) => ({ postId: String(meta.postId) }));
}

export function generateMetadata(params: { postId: string }): Metadata {
  console.log(params);
  if (!getPostContent(params.postId)) return { title: '와이러노' };
  const { meta } = getPostContent(params.postId);

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `abonglog.me/post/${params.postId}`,
      images: meta.validThumbnail,
      type: 'article',
      publishedTime: new Date(meta.time).toISOString(),
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: meta.validThumbnail,
    },
  };
}

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { meta, content } = getPostContent(params.postId);
  const components = useMDXComponents({}, meta.path);

  return (
    <>
      <title>{meta.title}</title>
      <header className='pt-14 mb-12' id='page-header'>
        <PostTitle meta={meta} />
      </header>
      <main className='w-[100%] lg:w-[150%] flex'>
        <section className='px-7 w-[100%] lg:px-14 lg:w-[70%] lg:mr-[2rem]'>
          <SeriesAccordions meta={meta} />
          <Suspense fallback={<LoadingContnet />}>
            <MDXRemote
              source={content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: 'material-theme-darker',
                      },
                    ],
                  ],
                },
              }}
            />
          </Suspense>
        </section>
        <section className='hidden lg:block'>
          <PostSideBar content={content} />
        </section>
      </main>
      <footer id='page-footer' className='border-t-[2px] mt-6'>
        <PostPagination meta={meta} />
        <Comments />
      </footer>
    </>
  );
};

export default PostPage;
