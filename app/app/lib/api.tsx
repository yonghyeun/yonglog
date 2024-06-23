import GithubAPI from './GithubModel';

import type { PostInfo } from '@/types/post';
import type { Issue } from '@/types/api';

/**
 * yonglog 레파지토리에 존재하는 이슈에 대한 정보를 GET 요청하여 가져오는 메소드
 * @param {number} page - 전체 이슈 리스트를 30개씩 가져 올 때 가져와야 할 페이지
 * 전체 포스트의 개수에 따라 달라질 수 있다.
 */
export const GET_issueList = async (
  page: number = 1,
  perPage: string = '30',
) => {
  const endPoint = '/repos/yonghyeun/yonglog/issues';

  const queryParameter = {
    per_page: perPage,
    labels: 'comment',
    page: String(page),
  };

  const issueList = await GithubAPI.GET<Issue[]>(endPoint, {
    queryParameter,
  });
  return issueList;
};

/**
 * 특정 게시글의 meta 데이터를 이용해 이슈 게시글을 생성하는 메소드
 * @param {PostInfo['meta']} 특정 게시글의 메타데이터
 */
export const POST_issuePost = async (meta: PostInfo['meta']) => {
  const { title, postId } = meta;
  const endPoint = '/repos/yonghyeun/yonglog/issues';
  const additionalHeader = {
    Accept: 'application/json',
  };
  const body = {
    title,
    body: `<a href = 'https://abonglog.me/post/${postId}'>해당 게시글</a>의 댓글을 저장하는 저장소입니다.`,
    labels: ['comment'],
    assignees: ['yonghyeun'],
  };
  const response = await GithubAPI.POST<Issue>(endPoint, {
    body,
    additionalHeader,
  });
  return response;
};
