import type { Metadata } from 'next';
import './globals.css';

import GlobalNav from '@/components/GlobalNav';

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
        <GlobalNav /> {/* position : fixed */}
        {children}
      </body>
    </html>
  );
}
