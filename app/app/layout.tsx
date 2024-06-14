import './globals.css';
import GlobalNav from '@/components/GlobalNav';

import type { Metadata } from 'next';

import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'yonglog',
  description: '프론트엔드 개발블로그예용',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value.split(' ')[0];
  console.log(JSON.stringify(cookieStore));
  console.log(theme);

  return (
    <html lang='kr' data-theme={theme}>
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
