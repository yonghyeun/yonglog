---
title: Loading Suspense 구현하기
description: 게시글에 접근 전 로딩 상태를 넣어줘 UX를 높혀보자
tag:
  - react
  - nextjs
postId: 762673
date: Tue Jun 11 2024
time: 1718072963201
---

# Loading Suspense 가 필요한 이유

```tsx title="app/[postId]/page.tsx" {11,17,20-36}
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import PostTitle from '@/components/PostTitle';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { useMDXComponents } from '../lib/mdxComponents';
import { getPostContent } from '../lib/post';

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { meta, content } = getPostContent(params.postId);
  const components = useMDXComponents({}, meta.path);

  return (
    <>
      <header className='pt-14 mb-12'>
        <PostTitle meta={meta} />
      </header>
      <main className='px-14'>
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: 'material-theme-palenight',
                  },
                ],
              ],
            },
          }}
        />
      </main>
    </>
  );
};

export default PostPage;
```

현재 포스트 리스트들을 보여주는 `[page]/page.tsx` 서버 컴포넌트는 무거운 작업들을 하고 있다.

우선 `getPostContent` 메소드에서 파일 시스템에 접근해 해당 `postId` 에 해당하는 `mdx` 파일을 읽어오고

`MDXRemote` 컴포넌트에선 `mdx` 파일들을 적절한 `jsx` 태그로 변환하는 작업들을 수행한다.

이로 인해 어떤 `postId` 경로로 이동 할 때 **서버 렌더링이 완료되기 전까지 라우팅이 지연** 되는 모습을 볼 수 있다.

![loading suspense 가 필요한 이유](weneedloading.gif)

물론 현재는 포스트의 내용이 적기 때문에 지연 시간이 오래 걸리지 않지만 만약 포스트 내용이 많거나, 내부에서 불러와야 하는 이미지들이 많은 경우에는 지연 시간이 더욱 오래 걸릴 것이다.

### NextJS 에선 Streaming UI 를 사용 할 것을 공식적으로 추천한다.

[NextJS 공식 문서 - Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

공식문서를 살펴보면 `NextJS` 의 내부엔 `React.Suspense` 컴포넌트를 이용한 `Streaming UI` 를 지원한다고 한다.

```tsx title="React.Suspense 사용 예시" {2-3}
/* 로딩 시엔 fallback의 컴포넌트를 렌더링 */
<Suspense fallback={<Loading />}>
  <SomeComponent /> /* 렌더링 할 준비가 완료 되면 해당 컴포넌트를 렌더링 */
</Suspense>
```

![Streaming UI의 사용 예시](image.png)

`Streaming UI` 란 어떤 컴포넌트의 작업이 오래 걸릴 경우 로딩중에 보여줄 컴포넌트를 우선적으로 렌더링 하고, 작업이 완료되면 작업물을 렌더링 하는 방식이다.

`NextJS` 에선 간단하게 `Streaming UI` 를 구현해줄 수 있는데 렌더링 까지의 시간이 오래 걸리는 컴포넌트 `Suspense` 로 감싸주거나 로딩 페이지를 생성해주면 된다.

```tsx title="app/[postId]/layout.tsx" {4}
const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className='break-words  mx-auto max-w-screen-lg px-4'>
      {children} {/* app/[postId]/page.tsx 가 렌더링 될 위치 */}
    </article>
  );
};

export default PostLayout;
```

나는 `page.tsx` 자체의 렌더링이 오래 걸리기 때문에 해당 페이지가 렌더링 되기 전 `inital loading state` 를 표현해줄 `loading.tsx` 파일을 생성해주었다.

```tsx title="NextJS 에서 page.tsx에 Suspense를 이용하는 잘못된 예시" {4}
const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className='break-words  mx-auto max-w-screen-lg px-4'>
      <Suspense fallback={{...}}>{children}</Suspense>
    </article>
  );
};

export default PostLayout;
```

이런식으로 해도 작동하지만 `NextJS` 에선 해당 라우팅 경로의 `page.tsx` 파일을 이미 `Suspense` 로 감싸둔 형태이기 때문에 단순히 `loading.tsx` 페이지만 생성해주면 된다.

```tsx title="NextJS의 앱라우팅 시 Suspense는 기본으로 설정되어 있다." {4-6}
const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className='break-words  mx-auto max-w-screen-lg px-4'>
      <Suspense fallback = {loading.tsx 파일}>
        {page.tsx 파일}
      </Suspense>
    </article>
  );
};

export default PostLayout;
```

# loading.tsx 파일을 생성해주자

```tsx title="app/[postId].loading.tsx" {6,9}
import { LoadingTitle, LoadingContnet } from '@/components/Loading';

const PostLoading = () => (
  <>
    <header className='pt-14 mb-12'>
      <LoadingTitle />
    </header>
    <main className='px-14'>
      <LoadingContnet />
    </main>
  </>
);

export default PostLoading;
```

로딩 시 사용할 페이지를 `LoadingTitle , LoadingContent` 컴포넌트를 이용해 작성해주었다.

두 컴포넌트는 `page.tsx` 에서 사용 할 `h1 , h2 , h3 , img` 태그들과 동일한 크기를 가진 태그들을 이용해 생성되었으며 `tailwind` 에서 기본적으로 제공하는 `animation-pulse` 애니메이션이 적용되어 있다.

```tsx title="components/Loading.tsx"
export const LoadingTitle = () => (
  <>
    <section className='animation-pulse mb-4 py-4 border-b-[2px]  border-gray-300 '>
      <h1 className='animation-pulse  text-5xl py-4 font-semibold bg-gray-300 text-gray-300'>
        로딩중인 제목입니다. 배경색과 같아요.
      </h1>
      <p className='animation-pulse  text-gray-300 bg-gray-300 flex justify-end'>
        로딩중인 시리즈
      </p>
    </section>
    <section className='animation-pulse flex justify-between'>
      <p>
        <span className='animation-pulse mr-2 border px-2 py-1 bg-gray-300 text-gray-300 rounded-lg '>
          로딩시리즈
        </span>
        <span className='animation-pulse mr-2 border px-2 py-1 bg-gray-300 text-gray-300 rounded-lg '>
          로딩시리즈
        </span>
        <span className='animation-pulse mr-2 border px-2 py-1 bg-gray-300 text-gray-300 rounded-lg '>
          로딩시리즈
        </span>
      </p>
      <p className='animation-pulse bg-gray-300 text-gray-300'>
        Aaa Aaa 11 2023
      </p>
    </section>
  </>
);

export const LoadingContnet = () => (
  <>
    <h1 className='animation-pulse text-3xl border-b-[2px]  pt-4 pb-2 mb-8 border-gray-300 font-semibold  bg-gray-300 text-gray-300'>
      포스트와 같은 크기의 헤드입니다.
    </h1>
    <div className='animation-pulse max-w-screen-lg xl:max-w-[960px] h-[200px] bg-gray-300 text-gray-300'>
      이미지 크기 역할을 할 로딩 Content 입니다.
    </div>
    <p className='animation-pulse my-2 py-1 text-[16px] mb-2rem indent-[1px] bg-gray-300 text-gray-300'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
    </p>
    <h2 className='animation-pulse text-2xl border-b-[2px]  pt-4 pb-2 mb-8 border-gray-300 font-semibold  bg-gray-300 text-gray-300'>
      포스트와 같은 크기의 헤드입니다.
    </h2>
    <p className='animation-pulse my-2 py-1 text-[16px] indent-[1px] bg-gray-300 text-gray-300'>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, qui
      illum. Quod repellat facilis, repudiandae eos et unde, quidem, dicta cum
      maiores consequatur possimus quae vel recusandae molestias earum labore!
    </p>
    <p className='animation-pulse my-2 py-1 text-[16px] indent-[1px] bg-gray-300 text-gray-300'>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam mollitia
    </p>
  </>
);
```

![loading.tsx가 적용된 결과 ](<loading result.gif>)

ㅋㅋㅋ 아 굿 ~~~
