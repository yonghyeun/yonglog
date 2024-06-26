import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

/**
 * markdown , mdx 문자열을 분석하여 MDXRemote 에게 전달 할 source를 생성
 */
export const serializeMdx = async (source: string) => {
  const { serialize } = await import('next-mdx-remote/serialize');

  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
          },
        ],
      ],
      format: 'mdx',
    },
  });
};
