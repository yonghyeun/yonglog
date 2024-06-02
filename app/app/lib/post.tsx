const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// type Source = string;
// type FilePaths = Array<Source>;
// type Directory = Source & { __directory: true };
// type MDXSource = Source & { __mdx: true };
// type PostInfo = {
//   path: string;
//   content: string;
//   meta: {
//     title: string;
//     description: string;
//     date: string;
//     series: string;
//     postId: number;
//     tag?: Array<string>;
//   };
// };
// type SerieName = string;

import type {
  Source,
  FilePaths,
  Directory,
  MDXSource,
  PostInfo,
  SeriesName,
} from '@/types/post';

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

const getPostId = (source: MDXSource): number => {
  const postPath = path.join(source, '..');
  const directoryName = path.basename(postPath);
  return parseInt(directoryName.split('.')[0], 10);
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

          Posts.push({
            meta: {
              ...data,
              series: getSeriesName(fileSource),
              postId: getPostId(fileSource),
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
const getAllPosts = (): Array<PostInfo> => {
  const POST_PATH = '../app/posts';
  const posts = parsePosts(POST_PATH);

  return posts.toSorted((prev, cur) => {
    const prevDate = new Date(prev.meta.date);
    const curDate = new Date(cur.meta.date);

    if (prevDate.getTime() === curDate.getTime()) {
      const prevPostId = prev.meta.postId;
      const curPostId = cur.meta.postId;
      return curPostId - prevPostId;
    }

    return curDate.getTime() - prevDate.getTime();
  });
};

export { getAllPosts };
