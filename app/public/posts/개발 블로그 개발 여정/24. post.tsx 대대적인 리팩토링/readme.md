---
title: Promise 패턴을 이용하여 대대적으로 리팩토링 해보자
description: 나중에 생성하기
thumb: public/posts/개발 블로그 개발 여정/21. 기술블로그 SEO 최적화 part2/image-1.png
tag:
  - react
  - nextjs
seriesHeader: "해당 포스트는 NextJS를 이용하여 개발 블로그를 만들며 작성한 포스트입니다.\r\n\r\n기술 블로그의 전체 코드는 [yonglog github](https://github.com/yonghyeun/yonglog) 에서 확인 하실 수 있습니다."
date: Sun Jun 30 2024
time: 1719733987094
postId: 874584
issueNumber: 292
---

# 현재 상황은 어떨까 ?

`@/lib/post.tsx` 라는 파일에는 `public/post` 경로에 존재하는 모든 `mdx` 파일들을 다루는 다음과 같은 메소드들이 존재한다.

1.  `parsePosts` 메소드는 모든 `mdx` 파일들을 파싱하여 메타 데이터에 `issueNumber` 가 존재하지 않으면 깃허브에 비동기적으로 `POST` 요청을 보내 댓글을 저장할 `issue` 를 생성한다.
2.  `parsePosts` 는 위의 동작이 모두 종료 되면 포스트들의 정보를 담은 `Post[]` 배열을 반환한다.
3.  `getAllPosts , selectPosts, getPostContent` 메소드 등은 모두 `parsePosts` 를 호출하여 모든 포스트 들을 반환하거나 특정 포스트를 반환하거나 특정 포스트의 내용들을 불러온다.

```tsx title="모든 mdx포스트를 파싱하는 parsePosts" showLineNumbers{169}
const parsePosts = async (source: Source): Promise<Array<PostInfo>> => {
  const Posts: Array<PostInfo> = [];

  const parseRecursively = async (source: Source) => {
    const allPath = getAllPath(source);

    for (const fileSource of allPath) {
      if (isDirectory(fileSource)) {
        await parseRecursively(fileSource);
      } else {
        if (isMDX(fileSource)) {
          const { data, content } = await getMDXData(fileSource);

          /* 추후 이미지 파일에 접근하기 위해 해당 포스트가 존재하는 폴더 명을 meta 데이터에 저장 */
          const directoryPath = path.join(fileSource, '..');
          const relatevePath = directoryPath.split('public')[1];

          Posts.push({
            meta: {
              ...data,
              series: getSeriesName(fileSource),
              validThumbnail: getValidThumbnail(fileSource, data),
              path: relatevePath,
            },
            content: content,
          });
        }
      }
    }
  };

  await parseRecursively(source);

  return Posts;
};
```

```tsx title="parsePosts 를 직접 혹은 간접적으로 호출하는 다른 메소드들" showLineNumbers{205}
/**
 * Posts 에서 Date 를 기준으로 정렬 후 전송
 */
export const getAllPosts = async (): Promise<Array<PostInfo>> => {
  const POST_PATH = path.join(process.cwd(), 'public/posts');
  const posts = await parsePosts(POST_PATH);

  return posts.toSorted((prev, cur) => {
    const prevTime = prev.meta.time;
    const curTime = cur.meta.time;

    return curTime - prevTime;
  });
};

/**
 * SearchParms 에 맞게 적절한 PostList 를 반환하는 메소드
 */
export const selectPosts = async (
  searchParams: URLSearchParams,
): Promise<Array<PostInfo>> => {
  const allPosts = await getAllPosts();
  const tag = searchParams.get('tag');
  const series = searchParams.get('series');

  if (!tag && !series) {
    return allPosts;
  }
  return allPosts.filter((post) => {
    const { meta } = post;
    return (
      (!tag || isPostHasTag(meta.tag, tag)) &&
      (!series || meta.series === series)
    );
  });
};

export const getPostContent = async (postId: string): Promise<PostInfo> => {
  const allPosts = await getAllPosts();
  const searchedPost = allPosts.find(
    (post) => post.meta.postId === Number(postId),
  );

  return searchedPost as PostInfo;
};

/**
 * 인수로 들어온 series 의 게시글들을 가져오는 메소드
 */
export const getSeriesArray = async (series: string) => {
  const allPosts = await getAllPosts();
  return allPosts.toReversed().filter(({ meta }) => {
    return meta.series === series;
  });
};
```

# 어떤 점에서 불편함을 느꼈을까 ?

`getAllPosts , selectPosts , getPostContent , getSeriesArray` 메소드 들은 다양한 컴포넌트들에서 서로 다른 타이밍에 호출된다.

위의 메소드들은 모두 직,간접적으로 `parsePosts` 를 호출하기 때문에 각 메소드들이 호출 될 때 마다 위에서 이야기 한 `mdx` 파일들을 모두 파싱해오고 , 파싱하는 동안 `GithubAPI` 에 `POST` 요청을 보내는 무거운 작업이 실행된다.

이는 두 가지 비효율성을 코드에서 만든다.

1. `parsePosts` 가 반환하는 값은 항상 같은데 불필요하게 호출 때 마다 `parsePosts` 를 호출하는 불편함이 있다.
2. `parsePosts` 가 호출 될 때 마다 `POST` 요청이 반복되는 `race condition` 문제를 해결하기 위해 억지로 `issueFlag` 나 동기적으로 값을 수정하는 로직들이 추가 되었다.

```tsx title="parsePosts 내부에서 호출되는 getMDXData 메소드의 내부" {16-54}
/**
 * 해당 메소드는 MDXXSource에 대해 mdx 파일을 {data , content} 영역으로 나눠 파싱해오고
 * 메타 데이터에 해당하는 data를 살펴보며 postId,data,time,issueNumber 등을 추가하고
 * 동기적으로 fileSource 위치에 수정된 mdx 파일을 write
 *
 * 각 조건문마다 동기적으로 fs.writeFileSync 를 호출하여 메인스레드를 막아버리는 비효율성이 존재하지만
 * 해당 메소드를 호출하는 parsePost 메소드가 렌더링 시 여러번 호출되어 race condition을 막기 위한 어쩔 수 없는 선택
 * ! 해당 방법은 Best Practice 가 아니며 추후 리팩토링이 필요함
 */
const getMDXData = async (fileSource: MDXSource) => {
  const fileContent = fs.readFileSync(fileSource, 'utf8');
  const seriesHeader = getSeriesHeader(fileSource);

  const { data, content } = matter(filterContent(fileContent));

  if (!data.seriesHeader && seriesHeader) {
    data.seriesHeader = seriesHeader;
    const updatedContent = matter.stringify(content, data);
    fs.writeFileSync(fileSource, updatedContent, 'utf-8');
  }

  if (!data.postId) {
    data.postId = Math.ceil(Math.random() * 9 * 100000);
    const updatedContent = matter.stringify(content, data);
    fs.writeFileSync(fileSource, updatedContent, 'utf-8');
  }

  if (!data.date) {
    data.date = new Date().toDateString();
    data.time = new Date().getTime();
    const updatedContent = matter.stringify(content, data);
    fs.writeFileSync(fileSource, updatedContent, 'utf-8');
  }

  if (!data.issueNumber && !data.issueFlag) {
    // 깃허브 API를 이용해 새로운 이슈를 생성하고 이슈 넘버를 메타데이터에 저장
    try {
      /* 비동기처리들의 race condition 을 막기 위한 동기적 플래그 설정*/
      data.issueFlag = true;
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(fileSource, updatedContent, 'utf-8');

      const newIssue = await POST_createIssue(data);
      const { number: issueNumber } = newIssue;
      data.issueNumber = issueNumber;
    } catch (e) {
      console.error(`${data.title}의 이슈를 생성하지 못했습니다.`);
      data.issueFlag = false;
      data.issueNumber = undefined;
    } finally {
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(fileSource, updatedContent, 'utf-8');
    }
  }

  return { data, content };
};
```

사실 이런 불편함은 _아 ~ 그래 build time 때 시간이 좀 걸리긴 해도 빌드 이후에는 상관 없으니 괜찮아 ~_ 이러고 넘어갔었는데

이제 검색 기능을 추가하려고 하다 보니 전역적으로 모든 `Post` 들의 값을 저장하고 있는 전역 객체를 생성해야 했다.

그래서 `parsePost` 메소드를 수정해줘야 했는데 수정하는 김에 위에서 말한 불편함들을 수정하기 위한 대대적인 리팩토링을 시행해야겠다고 생각했다.

# 사용하고자 하는 디자인 패턴 : 프로미스 패턴

프로미스 패턴은 비동기적으로 resolve 되는 객체 A가 존재 할 때

해당 객체 A를 참조하는 메소드 등이 A 객체가 resolve 된 이후 실행 되는 것을 보장하는 형태이다.

이는 프로미스 객체의 특성을 이용한 것으로 예시를 들어보자면 다음과 같다.

```tsx title="프로미스 패턴을 이용한 객체 접근의 예시" {1,3-4 , 14-15 , 20-21 , 26-27 }
let resolveA;
const objectAPromise = new Promise((resolve, reject) => {
  resolveA =
    resolve; /* resolveA를 어떤 값을 resolve 할 수 있는 콜백 함수로 지정 */
});

function initializeObjectA() {
  setTimeout(() => {
    const objectA = { value: 'A is resolved' };
    resolveA(objectA); /* resolveA 객체는 objectA를 resolve 한다. */
  }, 2000);
}

function methodB() {
  objectAPromise.then((objectA) => {
    console.log('Method B executed with', objectA);
  });
}

function methodC() {
  objectAPromise.then((objectA) => {
    console.log('Method C executed with', objectA);
  });
}

function methodD() {
  objectAPromise.then((objectA) => {
    console.log('Method D executed with', objectA);
  });
}

initializeObjectA();
methodB();
methodC();
methodD();
```

```dotnetcli title="methodB,C,D 의 출력 결과, 모든 메소드 들은 resolveA 가 resolve 된 이후 실행된다."
Method B executed with { value: 'A is resolved' }
Method C executed with { value: 'A is resolved' }
Method D executed with { value: 'A is resolved' }
```

해당 패턴은 내가 원하는 그대로를 모두 지원한다. 하나씩 리팩토링 해보자

> 사실 리팩토링이라기 보단 거의 대대적인 재개발이라고 볼 수 있다.
>
> 모두 뜯어 고칠 것이기 때문이다.
