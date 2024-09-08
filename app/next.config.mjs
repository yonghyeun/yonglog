import nextMDX from '@next/mdx';
import withBundleAnalyzer from '@next/bundle-analyzer';
/** @type {import('rehype-pretty-code').Options} */

const withMDX = nextMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  // ! warn stric mode 나중에 변경하기
  reactStrictMode: false,
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js', 'mjs'],
  typescript: { ignoreBuildErrors: true }, // dev 모드 시 type 오류 없다면 빌드 시 타입 오류 제거
  images: {
    domains: ['abonglog.vercel.app', 'abonglog.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: false, // ! 매번 npm run dev 를 할 때 마다 bundle analyzer 를 보고 싶다면 true 로 변경
});

export default withBundleAnalyzerConfig(withMDX(nextConfig));
