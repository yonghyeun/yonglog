import type { PostInfo } from '@/types/post';
import type { Issue } from '@/types/api';
import GithubAPIModel from './GithubAPIModel';

/**
 * 나의 Personal Access Token을 이용해 /yonghyeun/yonglog 에 이슈를 생성하는 POST 요청
 */
export const POST_createIssue = async (meta: PostInfo['meta']) => {
  const PERSONAL_TOKEN = process.env.PERSONAL_ACCESS_TOKEN as string;
  const ServerAPIModel = new GithubAPIModel(PERSONAL_TOKEN);

  const { title, postId } = meta;
  const endPoint = '/repos/yonghyeun/yonglog/issues';
  const body = JSON.stringify({
    title,
    body: `<a href = 'https://abonglog.me/post/${postId}'>해당 게시글</a>의 댓글을 저장하는 저장소입니다.`,
    labels: ['comment'],
    assignees: ['yonghyeun'],
  });

  const newIssue = await ServerAPIModel.POST<Issue>(endPoint, { body });
  return newIssue;
};
