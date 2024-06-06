import type { SearchParams } from '@/types/global';
import type {
  Source,
  FilePaths,
  Directory,
  MDXSource,
  ImgSource,
  PostInfo,
  SeriesName,
} from '@/types/post';

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

const getValidThumbnail = (source: MDXSource): ImgSource | null => {
  const thumbnailPath = path.join(source, '../../thumbnail');
  const paths = ['jpg', 'png', 'gif', 'svg'].map(
    (extname) => `${thumbnailPath}.${extname}` as ImgSource,
  );
  const validThumbnail = paths.find((path) => fs.existsSync(path));

  if (validThumbnail) {
    const relativePath = path.relative(
      path.join(process.cwd(), 'public'),
      validThumbnail,
    );
    const publicPath = `/${relativePath.replace(/\\/g, '/')}`;
    return publicPath as ImgSource;
  }

  return null;
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
