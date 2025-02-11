import { PostInfo } from "@/types/post";
import postParser, { PostParser } from "./postParserModel";
import PostUtilsModel from "./postUtilsModel";

import type { CountObject, CountArray, SearchParams } from "@/types/global";

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

  async selectPost(tag?: string, series?: string): Promise<PostInfo[]> {
    const allPosts = await this.posts;

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

  async getPostContent(postId: string): Promise<PostInfo> {
    const allPosts = await this.posts;
    const searchedPost = allPosts.find(
      (post) => post.meta.postId === Number(postId)
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
