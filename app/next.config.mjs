import nextMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: 'github-dark',
  keepBackground: true,
};

const withMDX = nextMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  typescript: { ignoreBuildErrors: true }, // dev 모드 시 type 오류 없다면 빌드 시 타입 오류 제거
  env: {
    POSTS_PER_PAGES: process.env.POSTS_PER_PAGES, // 배포 시 env.local 의 파일을 env 파일로 사용
  },
};

export default withMDX(nextConfig);
