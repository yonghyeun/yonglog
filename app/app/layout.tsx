import './globals.css';
import GlobalNav from '@/components/GlobalNav';

import type { Metadata } from 'next';

import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'yonglog',
  description: '프론트엔드 개발블로그예용',
};

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
          <GlobalNav /> {/* position : fixed */}
        </header>
        <main>{children}</main>
        <footer className='flex justify-center py-4'>
          <p>&copy; 2024 Yonghyeun. Created using Next.js.</p>
        </footer>
      </body>
    </html>
  );
}
