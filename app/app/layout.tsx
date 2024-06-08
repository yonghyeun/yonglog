import './globals.css';
import GlobalNav from '@/components/GlobalNav';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'yonglog',
  description: '프론트엔드 개발블로그예용',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
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
