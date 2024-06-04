import type { SearchParams } from '@/types/global';

export const getNewSearchParms = (
  prevParams: SearchParams,
  newParams: SearchParams,
): string => {
  const searchParams = new URLSearchParams(prevParams);

  Object.entries(newParams).forEach(([paramsKey, paramsValue]) => {
    searchParams.set(paramsKey, paramsValue);
  });

  return searchParams.toString();
};
