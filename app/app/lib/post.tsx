import type {
  Source,
  FilePaths,
  Directory,
  MDXSource,
  ImgSource,
  PostInfo,
  SeriesName,
} from '@/types/post';
import { resolve } from 'path';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * source 가 특정 경로인지, 파일인지를 확인하는 메소드
 */
const isDirectory = (source: Source): source is Directory => {
  return fs.lstatSync(source).isDirectory();
};

/**
 * source 에 존재하는 file이 mdx 파일인지 확인하는 메소드
 * 이 때 반환값에 타입 가드를 설정해주도록 한다.
 */
const isMDX = (source: Source): source is MDXSource => {
  const fileName = path.basename(source);
  return path.extname(fileName) === '.mdx' || path.extname(fileName) == '.md';
};

/**
 * source를 public에 대한 상대 경로로 변경해주는 메소드
 */
const translatePath = (source: Source): Source => {
  const relativePath = path.relative(
    path.join(process.cwd(), 'public'),
    source,
  );

  return `/${relativePath.replace(/\\/g, '/')}`;
};

/**
 * 필수 전제 조건 :
 * 1. thumbnail 로 쓰고자 하는 이미지 파일이 해당 mdx 파일과 함께 존재해야함
 * 2. 시리즈 썸네일은 상위 경로에 무조건 존재해야 함
 */
const getValidThumbnail = (
  source: MDXSource,
  data: PostInfo['meta'],
): Source => {
  // 1. postThumbnail 이 있는지 확인
  const postThumbnail = data.thumb;
  if (postThumbnail) {
    if (fs.existsSync(postThumbnail)) {
      return translatePath(postThumbnail);
    } else {
      // 만약 fs.exsitsSync가 false 라면 thumb 을 설정 안했거나 , 상대경로로 작성되었을 가능성이 높음
      // TODO 해당 조건문은 작동이 안된다. 나중에 fix 하기
      const absolutePath = path.resolve(postThumbnail);
      if (fs.existsSync(absolutePath)) {
        return translatePath(absolutePath);
      }
    }
  }
  // 2. seriesThumbnail 이 있는지 확인
  const extnames = ['jpg', 'svg', 'png', 'gif'];
  const possibleThumbnailPath = extnames.map(
    (extname) => `${path.join(source, '../..', 'thumbnail')}.${extname}`,
  );

  const seriesThumbnail = possibleThumbnailPath.find((seriesThumbPath) => {
    return fs.existsSync(seriesThumbPath);
  });
  return translatePath(seriesThumbnail as ImgSource);
};

/**
 * Directory 인 source 하위에 존재하는 모든 폴더,파일들의 경로를 반환하는 메소드
 */
const getAllPath = (source: Source): FilePaths => {
  return fs
    .readdirSync(source)
    .map((fileName: string) => path.join(source, fileName));
};

const getSeriesName = (source: MDXSource): SeriesName => {
  const seriesPath = path.join(source, '../..');
  return path.basename(seriesPath);
};

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
            const updatedContent = matter.stringify(content, data);
            fs.writeFileSync(fileSource, updatedContent, 'utf-8');
          }

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
    });
  };

  parseRecursively(source);

  return Posts;
};
/**
 * Posts 에서 Date 를 기준으로 정렬 후 전송
 */
export const getAllPosts = (): Array<PostInfo> => {
  const POST_PATH = path.join(process.cwd(), 'public/posts');
  const posts = parsePosts(POST_PATH);

  return posts.toSorted((prev, cur) => {
    const prevTime = prev.meta.time;
    const curTime = cur.meta.time;

    return curTime - prevTime;
  });
};

const isPostHasTag = (
  postTag: PostInfo['meta']['tag'],
  searchParmsTag: string,
) => {
  // searchParamsTagArray
  const SPTArray = searchParmsTag.split('&');
  return SPTArray.every((spt) => postTag.includes(spt));
};

/**
 * SearchParms 에 맞게 적절한 PostList 를 반환하는 메소드
 */
export const selectPosts = (searchParams: URLSearchParams): Array<PostInfo> => {
  const allPosts = getAllPosts();
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

export const getPostContent = (postId: string): PostInfo => {
  const allPosts = getAllPosts();
  const searchedPost = allPosts.find(
    (post) => post.meta.postId === Number(postId),
  );

  return searchedPost as PostInfo;
};
