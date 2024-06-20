import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

import nextMDX from '@next/mdx';
/** @type {import('rehype-pretty-code').Options} */

const withMDX = nextMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js', 'mjs'],
  typescript: { ignoreBuildErrors: true }, // dev 모드 시 type 오류 없다면 빌드 시 타입 오류 제거
  images: {
    domains: ['abonglog.vercel.app', 'abonglog.me'],
  },
};

export default withMDX(nextConfig);
