---
title: SSG를 이용한 블로그에서 적절하게 테마 변경하기
description: 몇 가지 이유들로 ThemeProvider는 쓰고 싶지 않았어요
tag:
  - nextjs
postId: 809045
date: Sat Jun 15 2024
time: 1718381009479
---

기술 블로그들에 항상 존재하는 다크모드 테마 기능을 추가해보려고 한다.

사실 요즘 같은 시대에 다크모드가 존재하지 않는 페이지를 보기 힘들 정도로 `UX` 관점에서 다크모드는 중요한 역할을 한다.

그래서 ! 나도 다크모드를 생성해보려고 한다.

# 기본 아이디어

## Context는 이용하고 싶지 않았다.

```tsx title="대충 만들어본 가상의 ThemeProvider" {1-22}#add
'use client';

import { createContext, useState } from 'react';

const ThemeContext = createContext<{ theme: string; handleTheme: () => void }>({
  theme: 'light',
  handleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

```tsx title="/layout.tsx" {8,19}#add
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
      <ThemeProvider>
      {/* ThemeProvider 하위는 모두 Client Component 로 취급*/}
        <body>
          <header>
            <GlobalNav />
          </header>
          <main>{children}</main>
          <footer className='flex justify-center py-4'>
            <p>&copy; 2024 Yonghyeun. Created using Next.js.</p>
          </footer>
        </body>
      </ThemeProvider>
    </html>
  );
```

사실 다크모드를 구현하는 가장 쉬운 방법은 모든 컴포넌트를 클라이언트 컴포넌트로 생성해두고 가장 최상단에 `theme` 과 관련 `state` 를 생성해주는 것이다.

이후 해당 `theme state` 값에 따라서 `body` 에 클래스 이름을 다르게 하거나, 사용 할 컴포넌트들에 `theme state` 값을 이용한 스타일링 값들을 넣어주는 것일 것이다.

하지만 이 방법은 개인적으로 마음에 들지 않았다.

기술 블로그를 `NextJS` 를 이용해서 만들기로 마음먹은 가장 큰 이유는 `SSR,SSG` 방식이 정적인 정보 전달 목적의 블로그에 적합한 방식이라 생각했기 때문에

가장 상단에 존재하는 컴포넌트를 클라이언트 컴포넌트로 정의하는 방법은 올바르지 않다고 생각했다.

심지어 난 `{children}` 에 들어가는 `page.tsx` 들을 `SSG` 형태로 만들어둬 빠르게 로딩을 가능하게 만들었기 때문에 `Context` 를 이용한 방법은 더더욱 적절한 방법이 아니였다.

## 어떻게 할까 ? : 쿠키를 이용하자

그래서 나는 최대한 `SSR,SSG` 형태를 유지하기 위해 쿠키와 `css` 파일을 이용해주기로 하였다.

우선 테마와 관련된 것 중 몇 가지를 생각해보기로 했다.

- 테마 정보는 어디에 저장할 것인가 ?
  테마 정보는 클라이언트의 `local storage`에 저장
- 테마 정보는 어떻게 받을 것인가 ?
  클라이언트가 페이지를 요청 할 때 `cookie` 에 테마 정보를 담아 전송
- 테마 정보는 어디에서 변경 할 것인가 ?
  필연적으로 하나의 `client component` 는 필요하다. 테마 버튼을 통해 변경
- 바뀐 테마 정보는 어떻게 적용 할 것인가 ?
  직접적으로 `dom` 을 조작하여 변경

오케이 렛츠고
