# 목업 디자인 생성하기

---

`MDX` 가 어쩌구니 라우팅이 어쩌구니 하기 전 목업 데이터를 이용해 초석을 먼저 만들기로 하였다.

디자인을 먼저 해두고 기능을 추가하는 방식이 더 흥미로울 것 같았기 때문이다.

어차피 만들어야 할 페이지나 기능들 또한 많지 않기 때문에 디자인부터 하는 것이 좋을듯 싶다.

저번 `docs` 에서 보았듯 대부분의 기술 블로그들의 모습은 비슷하다.

1. `GNB` 가 존재한다.
2. 대부분의 컨텐츠들은 중앙에 정렬되어 있다. 양 옆에 마진이 크게 존재한다.
3. 선택적으로 좌우 여백에 게시글들 태그 별로 존재하거나 , 본문에선 인디게이터가 존재한다.

어차피 게시글은 `MDX` 라이브러리를 이용하여 렌더링 할 것이니 내가 신경 쓸 필요는 없고 내가 신경써야 하는 부분은 재사용 할 레이아웃들의 디자인이다.

모방은 창작의 뭐 어쩌구라했나 , 최대한 우아한 기술 블로그를 참고하여 디자인 작업을 만들어 가보자 :)

# 디자인 결과물

## ![alt text](<layout design.gif>)

우선 `/` 경로에 따른 `layout` 과 `Page`만 먼저 작성해주었다.

### `globalCSS` 설정

---

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: rgb(31 41 55);
  color: #f1f5ff;
}
```

우선 프로토타입 디자인이니 깜장에 하얀 글씨로 만들어주고 나는 `app router` 를 사용할 것이니

`app` 폴더에 존재하는 `layout , page` 컴포넌트를 조금 손대주었다.

### `app/layout.tsx`

---

```tsx
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
```

다음과 같이 `RootLayout` 에선 `GNB` 만 존재하도록 생성해주었다.

이후 `children` 에는 `/` 경로에 있는 `page.tsx` 컴포넌트가 렌더링 된다.

### `app/page.tsx`

```tsx
iimport Introduce from '@/components/Introduce';
import CategoryList from '@/components/Category';
import SideBar from '@/components/Sidebar';

const Page = () => {
  return (
    <section className='mx-0 sm:mx-auto w-full  lg:w-1/2'>
      <div className='hidden md:block'>
        <Introduce />
      </div>
      <CategoryList />
      {/* 게시글 리스트와 SideBar를 위치시키기 위함 */}
      <section className='w-full lg:w-[120%] flex gap-5 h-[150vh]'>
        {/* TODO page 생성 후 border 지우기 */}
        <section className='border bg-white w-full lg :w-8/12'>
          {/* TODO 게시글 리스트들 넣기 */}
        </section>
        <div className='hidden lg:block lg:flex-2 sticky top-0 w-4/12'>
          <SideBar />
        </div>
      </section>
    </section>
  );
};

export default Page;
```

`/` 경로의 `Page` 컴포넌트는 소개글과 카테고리 리스트를 상단에서 렌더링 한다.

이 때 `Introduce` 컴포넌트는 `tailwind` 의 미디어 쿼리를 이용하여 `md` 이상 일 때에만 렌더링 되도록 하였다. 그 이후가 되면 렌더링 되지 않는다.

`SideBar` 같은 경우에도 `lg` 이상 일 때에만 렌더링 되게 하고 그러히 않을 땐 `hidden` 으로
보이지 않게 해주었다.

> `tailwind` 최고 🤩 너무 편해 ~!~!~!~!~!~!

이제 위의 흰 블록에 들어갈 서버 컴포넌트들을 작성해줘야겠다.

흰 블록에 들어갈 서버 컴포넌트는 블로그 포스트에 존재하는 제목과 미리보기 글 , 날짜 , 썸네일 등이 담긴 컴포넌트들이 들어갈 예정이다.

그리고 그 컴포넌트를 클릭하면 해당 블로그 포스팅으로 라우팅 시킬 예정이다.

하단에 있는 내용들은 모두 `/` 경로를 렌더링 할 떄 사용한 컴포넌트들이다.

### `components/GlobalNav.tsx`

---

```tsx
// TODO Search , Theme , Github 컴포넌트 생성하기
const GlobalNav = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 px-12 lg:px-16 py-3 bg-gray-900'>
      <ul className='flex justify-between items-center shadow-md mx-0 sm:mx-auto w-full sm:w-3/4 lg:w-1/2'>
        <li>
          <h1 className='text-2xl font-bold'>yonglog</h1>
        </li>
        <ul className='flex gap-4'>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            Search
          </li>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            Theme
          </li>
          <li className='text-base hover:text-blue-500 cursor-pointer font-semibold'>
            Github
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default GlobalNav;
```

### `@/components/Introduce.tsx`

---

```tsx
// TODO 짱구린 색상 센스 어떻게 할지 생각해보기
const Emphasis = 'inline text-indigo-200';

const Profile = () => (
  <section className='flex flex-col justify-center items-center space-y-4 ml-12'>
    <div
      style={{
        backgroundImage: `url('/asset/profile.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='w-32 h-32 rounded-full bg-no-repeat bg-center'
    ></div>
  </section>
);

const Title = () => (
  <section className='py-4'>
    <span className='text-xl'>
      <span className='block mb-2 font-semibold'>
        열심히 <p className={Emphasis}>공부</p>한 내용을{' '}
        <p className={Emphasis}>기록</p>하고 <p className={Emphasis}>공유</p>
        하여
      </span>
      <span className='block mb-2 font-semibold'>
        함께 <p className={Emphasis}>성장</p> 하고싶어 만든{' '}
      </span>
      <span className='block  mb-2  font-semibold'>
        <p className={Emphasis}>기술 블로그</p>입니다.
      </span>
    </span>
  </section>
);

const Introduce = () => {
  return (
    <section className='flex justify-around mt-24 mx-0 sm:mx-auto w-full sm:w-3/4 lg:w-full'>
      <Title />
      <Profile />
    </section>
  );
};

export default Introduce;
```

### `@components/Cateogory.tsx`

---

```tsx
// TODO Route 하는 Link 컴포넌트로 구성하기
// TODO Active 한 상태에 따라 뭐 어쩌구 저쩌구 하기
const Category = ({ name, to }: { name: string; to?: string }) => {
  return (
    <button className='border rounded-l-lg rounded-r-lg text-center px-2 py-2 focus:outline-none font-light text-sm'>
      {name}
    </button>
  );
};

// TODO MDX 의 태그 리스트를 가져와서 렌더링 하기
const tagList = [
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
  'React',
  'NextJS',
  'TypeScript',
  '알고리즘',
];

// TODO 태그 별 라우팅 하는 로직 추가하기
const CategoryList = () => {
  return (
    <section className='px-4 sm:px-8 md:px-16 lg:px-32 mt-24 sm:mt-24 md:mt-24 lg:mt-24 mb-12 sm:mb-12 md:mb-6 lg:mb-24'>
      <ul className='flex flex-wrap gap-2.5'>
        {tagList.map((tag, id) => (
          <li key={id}>
            <Category name={tag} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
```

### `@components/SideBar.tsx`

---

```tsx
// TODO MDX 의 시리즈 이름 가져와서 하기
const serieseList = [
  '리액트 공식문서 톺아보기 (12)',
  'NextJS 공식문서 톺아보기 (14)',
  '상태관리 (15)',
  '자료구조 및 알고리즘 (16)',
  '네트워크 (24)',
  '운영체제 (10)',
];

// TODO 라우팅 기능 넣기
// TODO 경로에 따라 활성 비활성화 상태 넣기
const Seriese = ({ title }: { title: string }) => (
  <li className='mb-2'>{title}</li>
);

const SideBar = () => {
  return (
    <section className='sticky flex-2 top-[5rem] right-0'>
      <h2 className='text-indigo-200 font-bold text-xl mb-2'>시리즈</h2>
      <ul>
        {serieseList.map((title, id) => (
          <Seriese title={title} key={id} />
        ))}
      </ul>
    </section>
  );
};

export default SideBar;
```
