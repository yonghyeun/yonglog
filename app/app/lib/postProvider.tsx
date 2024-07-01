import { PostInfo } from '@/types/post';
import postParser, { PostParser } from './postParserModel';
import PostUtilsModel from './postUtilsModel';

import type { CountObject, CountArray, SearchParams } from '@/types/global';

class PostProvder extends PostUtilsModel {
  posts: Promise<PostInfo[]>;

  constructor(postParser: PostParser) {
    super();
    this.posts = postParser.Posts;
  }

  async getAllPosts(): Promise<PostInfo[]> {
    const allPosts = await this.posts;
    return allPosts;
  }

  /* 다른 메소드로 교체 될 예정인 메소드 */
  async selectPost(searchParams: URLSearchParams): Promise<PostInfo[]> {
    const allPosts = await this.posts;

    const tag = searchParams.get('tag');
    const series = searchParams.get('series');

    if (!tag && !series) {
      return allPosts;
    }
    return allPosts.filter((post) => {
      const { meta } = post;
      return (
        (!tag || this.isPostHasTag(meta.tag, tag)) &&
        (!series || meta.series === series)
      );
    });
  }

  /* /post 경로에서 searchParams에 따라 동적으로 적절한 포스트 리스트를 가져오는 메소드 */
  async searchPosts({
    searchParams,
  }: {
    searchParams: SearchParams;
  }): Promise<PostInfo[]> {
    const allPosts = await this.posts;

    const { tag, series, page, searchText } = searchParams;

    return allPosts;
  }

  async getPostcontent(postId: string): Promise<PostInfo> {
    const allPosts = await this.posts;
    const searchedPost = allPosts.find(
      (post) => post.meta.postId === Number(postId),
    );

    return searchedPost as PostInfo;
  }

  async getSeriesArray(series: string) {
    const allPosts = await this.posts;
    return allPosts.toReversed().filter(({ meta }) => {
      return meta.series === series;
    });
  }

  async getAllTags(): Promise<CountArray> {
    const allPosts = await this.posts;
    const TagInfo: CountObject = {};

    allPosts.forEach(({ meta: { tag } }) => {
      tag?.forEach((tagName) => this.incrementCount(TagInfo, tagName));
    });

    return Object.entries(TagInfo).toSorted((prev, cur) => cur[1] - prev[1]);
  }

  async getAllSeresList(): Promise<CountArray> {
    const allPosts = await this.posts;
    const SeriesInfo: CountObject = {};
    allPosts.forEach(({ meta: { series } }) => {
      this.incrementCount(SeriesInfo, series);
    });

    return Object.entries(SeriesInfo).toSorted((prev, cur) => cur[1] - prev[1]);
  }
}

const postProvider = new PostProvder(postParser);

export default postProvider;
