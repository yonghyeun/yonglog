import PostUtilsModel from './postUtilsModel';
import { POST_createIssue } from './api';

import type {
  Source,
  FilePaths,
  MDXSource,
  ImgSource,
  PostInfo,
  PostMeta,
  SeriesName,
} from '@/types/post';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

export class PostParser extends PostUtilsModel {
  source: Source;
  Posts: Promise<PostInfo[]>;
  resolvePosts: (value: PostInfo[] | PromiseLike<PostInfo[]>) => void;

  constructor(source: Source) {
    super();
    this.source = source;
    this.resolvePosts = () => {};
    this.Posts = new Promise<PostInfo[]>((resolve) => {
      this.resolvePosts = resolve;
    });
    this.parsePosts();
  }

  getAllPath(source: Source): FilePaths {
    return fs
      .readdirSync(source)
      .map((fileName: string) => path.join(source, fileName));
  }

  getSeriesName(source: MDXSource): SeriesName {
    const seriesPath = path.join(source, '../..');
    return path.basename(seriesPath);
  }

  getSeriesHeader(source: MDXSource): string | null {
    const fileHeaderSource = path.join(source, '../../header.txt');
    const isHeaderExist = fs.existsSync(fileHeaderSource);
    return isHeaderExist ? fs.readFileSync(fileHeaderSource, 'utf-8') : null;
  }

  getValidThumbnail(source: MDXSource, data: PostMeta): Source {
    if (data.thumb) {
      const postThumb = path
        .join(source, '..', path.basename(data.thumb))
        .replace(/\\/g, '/');

      if (fs.existsSync(postThumb)) {
        return this.translatePath(postThumb);
      }
    }
    const extnames = ['jpg', 'svg', 'png', 'gif'];
    const possibleThumbnailPath = extnames.map(
      (extname) => `${path.join(source, '../..', 'thumbnail')}.${extname}`,
    );

    const seriesThumbnail = possibleThumbnailPath.find((seriesThumbPath) => {
      return fs.existsSync(seriesThumbPath);
    });
    return this.translatePath(seriesThumbnail as ImgSource);
  }

  generateRandomPostId(): PostMeta['postId'] {
    return Math.ceil(Math.random() * 9 * 100000);
  }

  generateCurrentDate() {
    return { date: new Date().toDateString(), time: new Date().getTime() };
  }

  async updateData(data: PostMeta, fileSource: MDXSource): Promise<PostMeta> {
    const updatedData = { ...data };

    if (!updatedData.seriesHeader) {
      const publicSeriesHeader = this.getSeriesHeader(fileSource);
      if (publicSeriesHeader) {
        updatedData.seriesHeader = publicSeriesHeader;
      }
    }

    if (!updatedData.postId) {
      updatedData.postId = this.generateRandomPostId();
    }

    if (!updatedData.date || !updatedData.time) {
      const { date, time } = this.generateCurrentDate();
      updatedData.date = date;
      updatedData.time = time;
    }

    if (!updatedData.issueNumber) {
      try {
        const newIssue = await POST_createIssue(updatedData);
        updatedData.issueNumber = newIssue.number;
      } catch (error) {
        console.error(error);
      }
    }

    return updatedData;
  }

  isNeedWrite(data: PostMeta, updatedData: PostMeta): boolean {
    const isDevMode = process.env.NODE_ENV === 'development';

    const beforeUpdate = this.deepStringtify(data);
    const afterUpdate = this.deepStringtify(updatedData);
    return isDevMode && beforeUpdate !== afterUpdate;
  }

  filterContent(content: PostInfo['content']) {
    const splitedContent = content.split('\r\n');

    return splitedContent
      .map((text) => {
        return text.startsWith('#')
          ? text.replace(/`/g, '').replace(/떄/g, '때')
          : text.replace(/떄/g, '때');
      })
      .join('\r\n');
  }

  async getMDXData(fileSource: MDXSource) {
    const fileContent = fs.readFileSync(fileSource, 'utf8');
    const { data, content } = matter(this.filterContent(fileContent));
    const updatedData = await this.updateData(data, fileSource);

    if (this.isNeedWrite(data, updatedData)) {
      const updatedContent = matter.stringify(content, updatedData);
      fs.writeFileSync(fileSource, updatedContent, 'utf-8');
    }

    return { data: updatedData, content };
  }

  async parsePosts() {
    const Posts: PostInfo[] = [];

    const parseRecursively = async (source: Source) => {
      const allPath = this.getAllPath(source);
      for (const fileSource of allPath) {
        if (this.isDirectory(fileSource)) {
          await parseRecursively(fileSource);
        } else {
          if (this.isMDX(fileSource)) {
            const { data, content } = await this.getMDXData(fileSource);

            const directoryPath = path.join(fileSource, '..');
            const relatevePath = directoryPath.split('public')[1];

            Posts.push({
              meta: {
                ...data,
                series: this.getSeriesName(fileSource),
                validThumbnail: this.getValidThumbnail(fileSource, data),
                path: relatevePath,
              },
              content: content,
            });
          }
        }
      }
    };

    await parseRecursively(this.source);

    const sortedPosts = Posts.toSorted((prev, cur) => {
      const prevTime = prev.meta.time;
      const curTime = cur.meta.time;
      return curTime - prevTime;
    });

    this.resolvePosts(sortedPosts);
  }
}

const PostPath = path.join(process.cwd(), 'public/posts');
const postParser = new PostParser(PostPath);

export default postParser;
