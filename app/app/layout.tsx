import './globals.css';

import GlobalNav from '@/components/GlobalNav';

import type { Metadata } from 'next';

const layoutMeta = {
  title: 'abonglog',
  description:
    '프론트엔드 기술 블로그입니다. 열심히 공부한 내용을 기록하고 공유하여 함께 성장하고 싶습니다.',
  author: 'choiyonghyeun',
  keywords: 'front-end, react,nextjs,html,css',
  image:
    'https://abonglog.vercel.app/_next/image?url=%2Fasset%2Fprofile.jpg&w=256&q=75',
  icon: '/asset/favicon.ico',
};

export const metadata: Metadata = {
  title: layoutMeta.title,
  description: layoutMeta.description,
  authors: {
    name: layoutMeta.author,
  },
  keywords: layoutMeta.keywords,
  icons: {
    icon: layoutMeta.icon,
  },
  robots: 'index follow',
  openGraph: {
    title: layoutMeta.title,
    description: layoutMeta.description,
    url: 'abonsolg.me',
    type: 'article',
    images: layoutMeta.image,
  },
  twitter: {
    title: layoutMeta.title,
    description: layoutMeta.description,
    images: layoutMeta.image,
  },
};

/* Client 단에서 서버 렌더링 결과가 hydration 될 때 실행되는 IIFF */
const setThemeFromLocalStorage = `(function () {
  const theme = localStorage.getItem('theme') || 'light';
  const contentColor = theme === 'light' ? 'rgb(248, 240, 252)' : '#111';

  document.documentElement.setAttribute('data-theme', theme);
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  }
})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
      <head>
        {/* 구글 검색 엔진 등록 위한 메타 태그 */}
        <meta
          name='google-site-verification'
          content='7O0-gfyTg8JG154_G2ceeUM5SyOAQ1R9tH4W9BHoP7U'
        />
        {/* 모바일 유저의 인터페이스를 변경하기 위한 메타 태그 */}
        <meta name='theme-color' content='rgb(248,240,252)' />
        <script
          dangerouslySetInnerHTML={{ __html: setThemeFromLocalStorage }}
        ></script>
      </head>
      <body>
        <header>
          <GlobalNav />
        </header>
        <main>{children}</main>
        <footer className='flex justify-center py-4'>
          <p>&copy; 2024 Yonghyeun. Created using Next.js.</p>
        </footer>
      </body>
    </html>
  );
}
