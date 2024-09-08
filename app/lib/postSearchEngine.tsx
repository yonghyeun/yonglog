import { PostInfo, PostMeta } from '@/types/post';
import postParser, { PostParser } from './postParserModel';

class PostSearchEngine {
  posts: Promise<PostInfo[]>;

  constructor(postParser: PostParser) {
    this.posts = postParser.Posts;
  }

  async searchPosts(charToFind: string): Promise<PostMeta[]> {
    /* 인수를 global 하게 찾는 정규표현식 인스턴스 생성 
    flag = 전체를 찾고 대소문자 무시하기 */
    const regex = new RegExp(charToFind, 'gi');
    const posts = await this.posts;

    const searchedPosts: PostMeta[] = [];

    const machedMap = new Map();

    posts.forEach(({ meta, content }) => {
      const matches = content.match(regex);
      if (matches) {
        machedMap.set(meta.title, matches.length);
        searchedPosts.push(meta);
      }
    });

    return searchedPosts.toSorted((prev, cur) => {
      return machedMap.get(cur.title) - machedMap.get(prev.title);
    });
  }
}

const postSearchEngine = new PostSearchEngine(postParser);

export default postSearchEngine;
