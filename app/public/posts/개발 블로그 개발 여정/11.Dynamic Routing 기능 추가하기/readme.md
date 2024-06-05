---
title: '서버 컴포넌트에 Dynamic Routing 추가하기'
description: '라우팅 기능을 추가하여 숨을 불어넣어보자'
date: '2024-06-04'
tag: ['react', 'nextjs', 'mdx']
---

# 구현해야 하는 라우팅 기능 명세서 생각해보기

---

![alt text](image.png)

현재의 페이지는 `/` 경로에 대한 `UI` 만 존재하고 있다.

이제 블로그의 기능을 위해 라우팅 기능을 추가해주기로 하자

## `Dynamic Routing ?`

---

`NextJS` 에서 사용하는 서버 컴포넌트는 라우팅 되는 경로에 따라 서버에서 렌더링 되는 컴포넌트이다.

만약 라우팅 되는 경로가 정적으로 미리 정해져있다면 해당 컴포넌트는 서버에서 `build time` 에 렌더링 된 후 매 요청마다 미리 렌더링 된 값을 클라이언트에게 전송한다.

예를 들어 `app/introduce/page.tsx` 라는 파일이 존재한다면 `/introduce` 경로에선 매번 `build time` 에서 렌더링 된 `page.tsx` 컴포넌트가 반환될 것이다.

하지만 라우팅 되는 경로가 정적으로 정해져있는 것이 아니라 `runtime` 에 결정되는 경우엔 어떨까 ?

나의 `/` 경로 `UI` 에서 특정 태그 클릭하여 라우팅 된다거나 , 시리즈를 클릭하여 라우팅 된거나 , `pagination` 을 클릭해 라우팅 되는 경로와 같이 말이다.

이렇게 `runtime` 에 라우팅 될 경로가 결정되는 경우 , **동적으로 결정 될 라우팅 경로를 이용하는 행위를 `dynamic routing` 이라고 한다.**

## 어떻게 `Dynamic Routing` 을 할까 ?

---

`Dynamic Routing` 을 하기 위해선 두 가지 준비가 필요하다.

1. `Dynamic Routing` 될 경로에 맞는 파일 라우팅 시스템 준비하기

2. `Dynamic Routing` 될 경로에 맞는 `page.tsx` 준비하기

천천히 하나씩 `docs` 를 읽어가며 준비해보자

### `Dynamic Routing` 될 경로에 맞는 파일 라우팅 시스템 준비하기

---

`NextJS` 의 `App router` 방식에선 폴더 기반 라우팅으로 `app` 폴더를 기준으로 `/` 경로로 인식 한 후 하위 경로에 맞춰 세그먼트들을 정의한다.

마치 `app/introduce/page.tsx` 는 `/introduce` 경로의 `page` 로 인식하는 것 처럼 말이다.

위 예시에선 `introduce` 라는 폴더 명이 라우팅 경로의 `segment` 가 된다.

반대로 `runtime` 에 결정되는 세그먼트를 `Dynamic segment` 라고 한다. 이렇게 `Dynamic segment` 에 대한 폴더명은 폴더 이름에 `[]` 를 감싸 정의한다.

### `Dynamic Segment` 될 경로에 맞는 `page.tsx` 준비하기

---

```tsx
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <h1>My Page</h1>;
}
```

기본적으로 `page.tsx` 의 정의되는 컴포넌트는 `params , serachParams` 를 `props` 로 받는다.

이렇게 명쾌하고 사랑스러울 수가 없다.

서버 컴포넌트에선 단순히 `props` 로 들어오는 `Dynamic segment` 들을 이용해 렌더링 로직을 작성해주면 된다.

## `Dynamic Routing`이 무엇이 있을지 생각해보기

---

### `params`

---

#### `PostItem` 컴포넌트

![alt text](image-4.png)

해당 컴포넌트를 클릭하면 해당 컴포넌트의 `PostID` 로 이동 할 수 있도록 라우팅 해줘야겠다.

이후 라우팅 된 경로에서 해당 `Post` 의 `mdx` 파일을 렌더링 하여 보여주면 된다.

### `searchParams`

---

#### `Category` 컴포넌트

![alt text](image-1.png)

#### `Sidebar` 컴포넌트

![alt text](image-2.png)

#### `Pagination` 컴포넌트

![alt text](image-3.png)

우선 `/` 경로에서 `PostList` 들을 보여줄 때 조건에 따라 보여주게 하기 위한 `Dynamic Segment` 들이 존재한다.

세 부분은 조건부적으로 같이 존재 할 수 있기 때문에 분절되어 있는 `segment` 가 아니라 같이 사용 가능한 `searchParams` 로 정의해주도록 하자

예를 들어 `/?tag=react&series=개발 블로그 개발 여정*page=1` 이런식으로 말이다.

`searchParams` 로 정의해줌으로 인해 세 `searchParams` 가 같이 존재 할 수도 , 부분적으로 존재 할 수도 , 아예 존재하지 않게도 할 수 있다.

# `searchParams` 라우팅 로직 구현하기

---

`postId` 별 렌더링 될 로직을 구현하기 위해선 `getAllPost` 메소드 내부의 `meta` 데이터를 만져줘야 하기 때문에 해당 부분은 나중에 구현하기로 하고

`searchParams` 값에 따라 `PostList` 들을 다르게 렌더링 하는 로직을 먼져 구현해주자

```tsx
// types/global.d.ts
...
export type SarchParams = {
  tag?: string;
  page?: string;
  series: string;
};
```

### `getNewSearchParams`

---

```tsx
import type { SearchParams } from '@/types/global';

export const getNewSearchParms = (
  prevParams: SearchParams,
  newParams: SearchParams,
): string => {
  const searchParams = new URLSearchParams(prevParams);

  Object.entries(newParams).forEach(([paramsKey, paramsValue]) => {
    searchParams.set(paramsKey, paramsValue);
  });

  return `?${searchParams.toString()}`;
};
```

기존의 `serchParams` 를 받아 새로운 `searchParams` 를 가져오는 메소드를 정의해주었다.

만약 `?tag=react` 인 경우 `Pagination` 에서 `?page=2` 로 변경되는 경우엔 기존 `searchParams` 인 `tag` 를 유지한 채로 새로운 `searchParams` 를 추가해줘야 하기 때문이다.

### `/` 경로 라우팅 로직 추가

```tsx
import CategoryList from '@/components/Category';
import SideBar from '@/components/Sidebar';
import Introduce from '@/components/Introduce';
import Pagination from '@/components/Pagination';
import { PostList } from '@/components/PostList';
import { getAllPosts } from './lib/post';

import type { SearchParams } from '@/types/global.d.ts';

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  const allPosts = getAllPosts();
  return (
    <section className='mx-0 sm:mx-auto w-full lg:w-1/2'>
      <div className='hidden md:block'>
        <Introduce />
      </div>
      <CategoryList searchParams={searchParams} />
      {/* 게시글 리스트와 SideBar를 위치시키기 위함 */}
      <section className='w-full lg:w-[120%] flex gap-5'>
        {/* TODO page 생성 후 border 지우기 */}
        <section className=' bg-black-200 w-full lg:w-8/12 px-4'>
          <PostList postList={allPosts} />
          <Pagination searchParams={searchParams} />
        </section>
        <div className='hidden lg:block lg:flex-2 sticky top-0 w-4/12'>
          <SideBar searchParams={searchParams} />
        </div>
      </section>
    </section>
  );
};

export default Page;
```

이후 `/` 경로의 `page.tsx` 에서 `searchParams` 를 `props` 로 받은 후
라우팅을 해야 할 `CategoryList ,  Pagination , SideBar` 에게 `drilling` 시켜준다.
