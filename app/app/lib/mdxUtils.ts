import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

/**
 * markdown , mdx 문자열을 분석하여 MDXRemote 에게 전달 할 source를 생성
 */
export const serializeMdx = (source: string) => {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'maerial-theme-darker',
          },
        ],
      ],
      format: 'mdx',
    },
  });
};
