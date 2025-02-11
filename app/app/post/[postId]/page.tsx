import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";
import { Metadata } from "next";

import PostTitle from "@/components/PostTitle";
import SeriesAccordions from "@/components/SeriesAccordions";
import PostSideBar from "@/components/PostSideBar";

import PostPagination from "@/components/PostPagination";
import Comments from "@/components/client/Comments";
import { LoadingContent } from "@/components/Loading";

import { getMdxComponents } from "@/lib/getMdxComponents";
import postProvider from "@/lib/postProvider";
import PostHeadThumbnail from "@/components/PostHeadThumbnail";

export async function generateStaticParams(): Promise<{ postId: string }[]> {
  const allPost = await postProvider.getAllPosts();
  return allPost.map(({ meta }) => ({ postId: String(meta.postId) }));
}

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const { meta } = await postProvider.getPostContent(params.postId);

  const baseUrl = "https://abonglog.me";

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(baseUrl), // metadataBase 설정
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/post/${meta.postId}`,
      images: [
        {
          url: meta.validThumbnail,
          alt: meta.title,
        },
      ],
      type: "article",
      publishedTime: new Date(meta.time).toISOString(),
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: meta.validThumbnail,
    },
  };
}

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const { meta, content } = await postProvider.getPostContent(params.postId);

  const components = getMdxComponents({}, meta.path);

  return (
    <>
      <header className="pt-14 mb-12" id="page-header">
        <PostTitle meta={meta} />
      </header>
      <main className="w-[100%] lg:w-[150%] flex">
        <section className=" w-[100%]  lg:w-[70%] lg:mr-[2rem]">
          <SeriesAccordions meta={meta} />
          <Suspense fallback={<LoadingContent />}>
            <PostHeadThumbnail
              imageSrc={meta.validThumbnail}
              title={meta.title}
            />
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
                        theme: "github-dark-dimmed",
                      },
                    ],
                  ],
                },
              }}
            />
          </Suspense>
        </section>
        <section className="hidden lg:block">
          <PostSideBar content={content} />
        </section>
      </main>
      <footer id="page-footer" className="border-t-[2px] mt-6">
        <PostPagination meta={meta} />
        <Comments
          issueNumber={meta.issueNumber}
          date={meta.date}
          postId={meta.postId}
        />
      </footer>
    </>
  );
};

export default PostPage;
