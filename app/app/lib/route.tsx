import type { SearchParams } from '@/types/global';

const areTagsActive = (exsitTags: string, newTag: string): boolean => {
  return exsitTags.split('&').some((tag) => tag === newTag);
};

export const checkIsActive = (
  searchParams: URLSearchParams,
  newParams: SearchParams,
): boolean => {
  return Object.entries(newParams).every(([key, value]) => {
    const currentParams = searchParams.get(key);

    if (key === 'tag') {
      return currentParams ? areTagsActive(currentParams, value) : false;
    } else {
      return currentParams === value;
    }
  });
};

const addTagParams = (searchParams: URLSearchParams, newTag: string) => {
  const currentTag = searchParams.get('tag');

  if (!currentTag) {
    return newTag;
  }
  return `${currentTag}&${newTag}`;
};

const removeTagParams = (
  searchParams: URLSearchParams,
  targetTag: string,
): string => {
  const currentTag = searchParams.get('tag') as string;

  return currentTag
    .split('&')
    .filter((tag) => tag !== targetTag)
    .join('&');
};

export const getNewSearchParms = (
  searchParams: URLSearchParams,
  newParams: SearchParams,
  isActive?: boolean,
): string => {
  Object.entries(newParams).forEach(([key, value]) => {
    if (key === 'tag') {
      searchParams.set(
        key,
        isActive
          ? removeTagParams(searchParams, value)
          : addTagParams(searchParams, value),
      );

      /* 만약 searchParams 에 tag 가 '' 인 경우를 대비하여 제거 */
      if (!searchParams.get('tag')) {
        searchParams.delete('tag');
      }
    } else if (key === 'series') {
      isActive ? searchParams.delete(key) : searchParams.set(key, value);
    } else {
      /* key === page 일 때엔 Active 여부가 영향을 주지 않는다. */
      searchParams.set(key, value);
    }
  });
  return `?${searchParams.toString()}`;
};
