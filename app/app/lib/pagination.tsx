import { PostInfo } from '@/types/post';

type PaginationInfo = {
  avaliablePage: Array<number>;
  totalPages: number;
};

export const getPageList = (
  currentPage: number,
  totalPosts: Array<PostInfo>,
): PaginationInfo => {
  const POSTS_PER_PAGES = Number(process.env.POSTS_PER_PAGES);
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGES);
  const MAX_NAV_PAGES = 5;

  const prevPages: Array<number> = [];
  const nextPages: Array<number> = [];
  const pages: Array<number> = [currentPage];
  for (
    let prevPage = currentPage - 1;
    prevPage > 0 && prevPage > currentPage - MAX_NAV_PAGES;
    prevPage--
  ) {
    prevPages.push(prevPage);
  }

  for (
    let nextPage = currentPage + 1;
    nextPage <= totalPages && nextPage < currentPage + MAX_NAV_PAGES;
    nextPage++
  ) {
    nextPages.push(nextPage);
  }

  while (
    pages.length < MAX_NAV_PAGES &&
    (prevPages.length || nextPages.length)
  ) {
    if (prevPages.length) {
      pages.unshift(prevPages.shift() as number);
    }
    if (nextPages.length) {
      pages.push(nextPages.shift() as number);
    }
  }

  return { avaliablePage: pages, totalPages: totalPages };
};
