---
title: '[Post].tsx 생성하기'
description: 라우팅 기능을 추가하여 숨을 불어넣어보자
tag:
  - react
  - nextjs
  - routing
  - mdx
postId: 471720
date: Fri Jun 07 2024
time: 1717686655160
---

![alt text](<../11.Dynamic Routing 기능 추가하기/routing result.gif>)

이전 포스팅에선 `/` 경로의 `routing` 로직을 모두 처리해주었다.

이제 `/` 경로에서 `PostItem` 을 클릭하면 해당 `Post` 들을 렌더링 해주기 위한 `routing` 로직과 렌더링 로직을 생성해주자

# `Dynamic Routing` 과 `Dynamic rendering` 의 개념

---

`NextJS` 의 `App router` 방식에선 폴더 기반 `routing` 을 지원하기 때문에 `app` 폴더 하위에서 라우팅 경로에 따른 폴더의 이름과 내부 파일인 `page , layout` 파일들을 이용해 렌더링을 해줄 수 있다.

이 때 라우팅 경로와 대응되는 폴더 명을 `[]` 로 감싸주면 런타임 시 결정되는 라우팅 경로인 `dynamic routing` 경로와 1:1 대응이 가능하다.

예를 들어 `app/[postId]/page.tsx` 는 `/123` 이란 경로가 존재 할 때 `page.tsx` 서버 컴포넌트에게 `params` 를 `123` 으로 `props` 로 건내주고 렌더링 된다.

이렇게 `dynamic routing` 을 이용해 렌더링 하는 방식을 `dynamic rendering` 이라 한다.

해당 개념은 공식 문서를 참조하도록 하자

[NextJS - Dynamic Routing]('https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes')

# 라우팅을 위한 랜덤한 `PostId` 생성하기

---

각 포스트 별 `PostID` 를 `mdx` 파일에서 어떻게 생성 못하나 고민하던 와중 서버에서 실행하는 코드를 이용한다는 장점을 이용해

`file system` 에 직접적으로 접근 가능한 `fs` 모듈을 이용해 `PostId` 를 생성해주자

### `app/lib/post.tsx`

---

```tsx
const parsePosts = (source: Source): Array<PostInfo> => {
  const Posts: Array<PostInfo> = [];

  const parseRecursively = (source: Source): void => {
    getAllPath(source).forEach((fileSource: Source) => {
      if (isDirectory(fileSource)) {
        parseRecursively(fileSource);
      } else {
        if (isMDX(fileSource)) {
          const fileContent = fs.readFileSync(fileSource, 'utf8');
          const { data, content } = matter(fileContent);

          /* data.postId 가 존재하지 않으면 PostID 를 생성한 후 Post 저장*/
          if (!data.postId) {
            data.postId = Math.ceil(Math.random() * 9 * 100000);
            const updatedContent = matter.stringify(content, data);
            fs.writeFileSync(fileSource, updatedContent, 'utf-8');
          }
          /* data.date , time 이 존재하지 않으면 build 타임 기준으로 하여 생성 */
          if (!data.date) {
            data.date = new Date().toDateString();
            data.time = new Date().getTime();
          }

          Posts.push({
            meta: {
              ...data,
              series: getSeriesName(fileSource),
              seriesThumbnail: getValidThumbnail(fileSource),
            },
            content: content,
          });
        }
      }
    });
  };

  parseRecursively(source);

  return Posts;
};

/**
 * Posts 에서 Date 를 기준으로 정렬 후 전송
 */
export const getAllPosts = (): Array<PostInfo> => {
  const POST_PATH = '../app/public/posts';
  const posts = parsePosts(POST_PATH);

  return posts.toSorted((prev, cur) => {
    const prevTime = prev.meta.time;
    const curTime = cur.meta.time;

    return curTime - prevTime;
  });
};
```

```dotnetcli
/* public 내부의 readme.mdx 의 예시 */
---
title: '[Post].tsx 생성하기'
description: 라우팅 기능을 추가하여 숨을 불어넣어보자
tag:
  - react
  - nextjs
  - routing
  - mdx
postId: 471720
date: Fri Jun 07 2024
time: 1717686655160
---
```

동기적으로 파일을 다시 저장 할 수 있는 메소드를 이용해 `pstId` 가 존재하지 않는 `md,mdx` 파일들에 `PostId` 를 추가해주었다.

> 추가로 하는 김에 `date , time` 도 매번 입력하기 귀찮아서 관련 로직을 추가해주었다.
> `build time` 시 생성되는 `new Date().getTime()` 으로 인해 포스트 들을 최신 순으로 정렬하기도 편해졌다. :)

# `PostItem` 에 라우팅 기능 추가하기

---

### `components/postList.tsx`

---

```tsx
import Link from 'next/link';
/* 동일 코드 생략 */

export const PostItem = ({ meta }: { meta: PostInfo['meta'] }) => (
  <Link // 라우팅 기능 추가
    href={{ pathname: String(meta.postId) }}
    className='my-4 px-4 pb-8 border-b-[1px] border-[#c1c8cf] flex justify-between '
  >
    <div className='w-5/6'>
      <p className='text-gray-500 mb-2 text-sm'>
        <span className='mr-2'>{meta.date}</span>
        <span className='mr-2'>{meta?.series}</span>
      </p>
      <h1 className='text-3xl font-bold leading-10 mb-2 break-words whitespace-normal'>
        {meta.title}
      </h1>
      <p>{meta.description}</p>
    </div>
    <div className='flex justify-center items-center'>
      {meta.seriesThumbnail && (
        <Image
          src={meta.seriesThumbnail}
          alt='series-thumbnail'
          width={60}
          height={60}
        />
      )}
    </div>
  </Link>
);

/* 동일 코드 생략 */
```

이후 렌더링 되는 `PostItem` 에 `Link` 컴포넌트를 이용해 라우팅 기능을 추가해주었다.

![alt text](image.png)

이를 통해 특정 포스트를 클릭하면 해당 `PostId` 에 대한 경로로 라우팅 되도록 만들었다.

# `Dynamic rendering` 을 위한 컴포넌트 생성

---

이제 위에서 말했듯 `Dynamic Rendering` 을 위해 `app/[postId]/page.tsx` 를 생성해주자

```dotnetcli
📦app
 ┣ 📂lib
 /* 중복 생략 */
 ┣ 📂[postId]
 ┃ ┗ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 /* 중복 생략 */
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┗ 📜page.tsx
```

### `app/lib/post.tsx`

---

```tsx
/* 중복 생략 */
export const getPostContent = (postId: string): PostInfo => {
  const allPosts = getAllPosts();
  const searchedPost = allPosts.find(
    (post) => post.meta.postId === Number(postId),
  );

  return searchedPost as PostInfo;
};
```

### `app/[postId]/layout.tsx`

---

```tsx
const PostLayout = ({
  params,
  children,
}: {
  params: { postId: string };
  children: React.ReactNode;
}) => {
  return (
    <article className='mt-20 mx-auto max-w-screen-lg px-4 border border-black'>
      {children}
    </article>
  );
};

export default PostLayout;
```

### `app/[postId]/page.tsx`

```tsx
import { getPostContent } from '../lib/post';
import { MDXRemote } from 'next-mdx-remote/rsc';

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { meta, content } = getPostContent(params.postId);
  return (
    <>
      <section>
        {Object.entries(meta).map(([key, value], id) => {
          return (
            <h1 key={id}>
              {key} : {value}
            </h1>
          );
        })}
      </section>
      <section>
        <MDXRemote source={content} />
      </section>
    </>
  );
};

export default PostPage;
```

다음과 같이 `[postId]` 경로에서 렌더링 될 `PostPage` 컴포넌트에서 `getPostContent` 를 이용해 `postId` 에 맞는 `Post` 를 가져오고 `MDXRemote` 를 이용해 페이지를 렌더링 해주도록 하자

![alt text](image-1.png)

ㅋㅋ 아 굿 ~~ `MDXRemote` 를 이용해 단순 `text` 형태인 글들을 적절한 `html` 파일로 `Bable loader` 가 변환 한 후 컴포넌트로 변환해 렌더링 되고 있는 모습을 볼 수 있다.

이제 하나씩 문제점을 손대면서 완성해보자 :)

# 커스텀 컴포넌트 만들기

---

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';

<MDXRemote source={content} />;
```

![alt text](image-2.png)
현재 해당 부분에서 `content` 를 `jsx` 로 변환 될 때엔 특별한 스타일링이 존재하지 않는 `jsx` 로 변한된다.

그렇기 때문에 렌더링 되는 `contnet` 가 매우 심심해보인다.

스타일링 할 커스텀 컴포넌트로 정의하고 `props` 로 넘겨주자 :)
