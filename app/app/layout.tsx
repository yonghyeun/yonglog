import './globals.css';
import GlobalNav from '@/components/GlobalNav';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'yonglog',
  description: '프론트엔드 개발블로그예용',
};

/* Client 단에서 서버 렌더링 결과가 hydration 될 때 실행되는 IIFF */
const setThemeFromLocalStorage = `(function () {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
      <head>
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
